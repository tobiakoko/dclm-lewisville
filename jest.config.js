// Jest configs are CommonJS, so require() is required here.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Handle CSS imports (with CSS modules)
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '^.+\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    // Handle image imports
    '^.+\\.(png|jpg|jpeg|gif|webp|avif|ico|bmp|svg)$/i': '<rootDir>/__mocks__/fileMock.js',

    // Handle module aliases
    '^@/(.*)$': '<rootDir>/$1',
  },
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!**/jest.config.js',
  ],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)',
  ],
  moduleDirectories: ['node_modules', '<rootDir>/'],
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/e2e/',
    '<rootDir>/__tests__/utils/',
    '<rootDir>/__tests__/fixtures/',
  ],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
const configPromise = createJestConfig(customJestConfig)

// next/jest overrides transformIgnorePatterns with its own allowlist, which
// excludes ESM packages that msw depends on (undici, until-async, ...).
// Rebuild the allowlist to include them while keeping next/jest's entries.
module.exports = async (...args) => {
  const config = await configPromise(...args)
  const nextAllow = '(geist|next/dist/client|next/dist/shared/lib|next/src/client|next/src/shared/lib)'
  const mswAllow = '(@mswjs|undici|until-async|iconv-lite)'
  config.transformIgnorePatterns = [
    `/node_modules/(?!.pnpm)(?!${nextAllow}|${mswAllow}/)`,
    ...config.transformIgnorePatterns.filter((p) => p.includes('.pnpm[')),
  ]
  return config
}
