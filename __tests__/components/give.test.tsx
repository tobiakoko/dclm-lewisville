import { render, screen, userEvent } from '@/__tests__/utils/test-utils'
import { CopyButton } from '@/components/ui/copy-button'
import { GIVE_PLACEHOLDER } from '@/lib/content/extra'

let mockWays: { title: string; detail: string }[] = []
jest.mock('@/lib/data', () => {
  const constants = jest.requireActual('@/lib/constants')
  return {
    getSiteData: async () => ({ config: constants.SITE_CONFIG }),
    getGiveContent: async () => {
      const { GIVE } = jest.requireActual('@/lib/content/interface')
      return { header: GIVE, ways: mockWays }
    },
  }
})

async function renderGive() {
  const { default: GivePage } = await import('@/app/(site)/give/page')
  render(await GivePage())
}

describe('Give page', () => {
  it('shows the approved scripture card and no action for ways still waiting for details', async () => {
    mockWays = [{ title: 'Zelle', detail: GIVE_PLACEHOLDER }]
    await renderGive()
    expect(screen.getByText(/God loveth a cheerful giver/)).toBeInTheDocument()
    expect(screen.getByText('2 Corinthians 9:7 (KJV)')).toBeInTheDocument()
    expect(screen.getByText(GIVE_PLACEHOLDER)).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Copy details' })).not.toBeInTheDocument()
  })

  it('offers Copy details once a way has real details', async () => {
    mockWays = [{ title: 'Zelle', detail: 'giving@example.org' }]
    await renderGive()
    expect(screen.getByRole('button', { name: 'Copy details' })).toBeInTheDocument()
  })
})

describe('CopyButton', () => {
  it('copies the text and confirms politely', async () => {
    const user = userEvent.setup()
    const writeText = jest.spyOn(navigator.clipboard, 'writeText').mockResolvedValue()
    render(<CopyButton text="giving@example.org" label="Copy details" />)
    await user.click(screen.getByRole('button', { name: 'Copy details' }))
    expect(writeText).toHaveBeenCalledWith('giving@example.org')
    expect(screen.getByRole('status')).toHaveTextContent('Copied.')
  })

  it('says so when copying fails', async () => {
    const user = userEvent.setup()
    jest.spyOn(navigator.clipboard, 'writeText').mockRejectedValue(new Error('denied'))
    render(<CopyButton text="x" label="Copy details" />)
    await user.click(screen.getByRole('button', { name: 'Copy details' }))
    expect(screen.getByRole('status')).toHaveTextContent('Couldn’t copy.')
  })
})
