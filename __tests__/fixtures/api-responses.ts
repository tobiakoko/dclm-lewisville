// Mock API response fixtures

export const successResponse = {
  status: 200,
  ok: true,
  json: async () => ({ message: 'Success' }),
}

export const errorResponse = {
  status: 500,
  ok: false,
  json: async () => ({ error: 'Internal server error' }),
}

export const notFoundResponse = {
  status: 404,
  ok: false,
  json: async () => ({ error: 'Not found' }),
}

export const validationErrorResponse = {
  status: 400,
  ok: false,
  json: async () => ({ error: 'Validation failed', details: [] }),
}

export const unauthorizedResponse = {
  status: 401,
  ok: false,
  json: async () => ({ error: 'Unauthorized' }),
}

export const newsletterSuccessResponse = {
  status: 200,
  ok: true,
  json: async () => ({ message: 'Successfully subscribed to newsletter' }),
}

export const contactSuccessResponse = {
  status: 200,
  ok: true,
  json: async () => ({ message: 'Email sent successfully' }),
}

export const rateLimitResponse = {
  status: 429,
  ok: false,
  json: async () => ({ error: 'Too many requests' }),
}
