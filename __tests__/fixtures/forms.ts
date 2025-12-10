// Form submission test fixtures

export const validContactForm = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '214-555-0123',
  message: 'I would like to learn more about your church.',
}

export const validContactFormMinimal = {
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  message: 'Looking forward to visiting!',
}

export const invalidContactFormMissingName = {
  email: 'test@example.com',
  message: 'This should fail',
}

export const invalidContactFormMissingEmail = {
  name: 'Test User',
  message: 'This should fail',
}

export const invalidContactFormBadEmail = {
  name: 'Test User',
  email: 'not-an-email',
  message: 'This should fail',
}

export const validNewsletterForm = {
  email: 'subscriber@example.com',
}

export const invalidNewsletterFormBadEmail = {
  email: 'invalid-email',
}

export const longFormData = {
  name: 'A'.repeat(100),
  email: 'test@example.com',
  message: 'M'.repeat(1000),
}

export const specialCharactersFormData = {
  name: "O'Brien & Sons <script>",
  email: 'test+tag@example.com',
  message: 'Testing special chars: <>&"\' ',
}
