import { render, screen, userEvent } from '@/__tests__/utils/test-utils'
import { ContactSection } from '@/components/ContactSection'
import { SegmentedControl } from '@/components/ui/segmented-control'
import { SITE_CONFIG } from '@/lib/constants'

jest.mock('@/lib/analytics', () => ({ trackContactFormSubmit: jest.fn(), trackContactFormError: jest.fn() }))

const props = { phone: SITE_CONFIG.phone, email: SITE_CONFIG.email, prayerHubUrl: SITE_CONFIG.dclm.prayerRequestHub }

describe('SegmentedControl', () => {
  it('is a named radio group whose arrow keys move the selection', async () => {
    const user = userEvent.setup()
    const onChange = jest.fn()
    render(
      <SegmentedControl
        label="Kind"
        options={[
          { value: 'a', label: 'First' },
          { value: 'b', label: 'Second' },
        ]}
        value="a"
        onChange={onChange}
      />
    )
    expect(screen.getByRole('group', { name: 'Kind' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'First' })).toBeChecked()
    await user.click(screen.getByRole('radio', { name: 'First' }))
    await user.keyboard('{ArrowRight}')
    expect(onChange).toHaveBeenCalledWith('b')
  })
})

describe('ContactSection', () => {
  it('starts on a general message', () => {
    render(<ContactSection {...props} initialTopic="contact" />)
    expect(screen.getByRole('radio', { name: 'General message' })).toBeChecked()
    expect(screen.getByLabelText(/^Message/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send message' })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: 'DCLM Prayer Request Hub' })).not.toBeInTheDocument()
  })

  it('switches to a prayer request: label, button, pastor line and the Prayer Request Hub', async () => {
    const user = userEvent.setup()
    render(<ContactSection {...props} initialTopic="contact" />)
    await user.click(screen.getByRole('radio', { name: 'Prayer request' }))
    expect(screen.getByRole('textbox', { name: /^Prayer request/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send prayer request' })).toBeInTheDocument()
    expect(screen.getByText(/Prayer requests are read by our pastor\./)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'DCLM Prayer Request Hub' })).toHaveAttribute('href', SITE_CONFIG.dclm.prayerRequestHub)
  })

  it('opens on a prayer request when the page asks for one', () => {
    render(<ContactSection {...props} initialTopic="prayer" />)
    expect(screen.getByRole('radio', { name: 'Prayer request' })).toBeChecked()
  })

  it('keeps a ministry chosen from the Ministries page on a general message', () => {
    render(<ContactSection {...props} initialTopic="contact" ministry="Youth Ministry" />)
    expect(screen.getByText('Youth Ministry')).toBeInTheDocument()
  })
})
