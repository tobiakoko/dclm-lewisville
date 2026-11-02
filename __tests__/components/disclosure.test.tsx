import { render, screen, userEvent } from '@/__tests__/utils/test-utils'
import { Disclosure } from '@/components/ui/disclosure'
import CoreBeliefs from '@/components/site/DoctrineCards'
import { DOCTRINES } from '@/lib/content/doctrines'

describe('Disclosure', () => {
  it('starts closed, with the panel hidden from the tab order', () => {
    render(
      <Disclosure summary="The Holy Bible">
        <a href="/x">inside</a>
      </Disclosure>
    )
    const button = screen.getByRole('button', { name: 'The Holy Bible' })
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('link', { name: 'inside' })).not.toBeInTheDocument()
    expect(document.getElementById(button.getAttribute('aria-controls')!)).not.toBeVisible()
  })

  it('opens and closes with Enter and Space', async () => {
    const user = userEvent.setup()
    render(<Disclosure summary="Toggle">Panel text</Disclosure>)
    const button = screen.getByRole('button', { name: 'Toggle' })

    await user.tab()
    expect(button).toHaveFocus()
    await user.keyboard('{Enter}')
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('Panel text')).toBeVisible()
    await user.keyboard(' ')
    expect(button).toHaveAttribute('aria-expanded', 'false')
  })
})

describe('CoreBeliefs', () => {
  it('shows 22 doctrine titles and reveals the full verbatim text on demand', async () => {
    const user = userEvent.setup()
    render(<CoreBeliefs />)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(22)
    expect(buttons[0]).toHaveTextContent(DOCTRINES[0].title)

    const godhead = DOCTRINES.find((d) => d.title === 'The Godhead')!
    expect(screen.getByText(godhead.body)).not.toBeVisible()
    await user.click(screen.getByRole('button', { name: 'The Godhead' }))
    expect(screen.getByText(godhead.body)).toBeVisible()
    expect(screen.getByText(godhead.references)).toBeVisible()
  })
})
