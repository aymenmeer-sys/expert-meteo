import { defineConfig, devices } from '@playwright/test'

const isCI = Boolean(process.env.CI)

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  reporter: 'list',
  use: { baseURL: 'http://localhost:3000', trace: 'on-first-retry' },
  webServer: isCI ? { command: 'pnpm dev', url: 'http://localhost:3000', reuseExistingServer: true } : undefined,
  projects: isCI
    ? [
        {
          name: 'chromium',
          use: {
            ...devices['Desktop Chrome'],
            launchOptions: { args: ['--use-gl=swiftshader', '--enable-webgl', '--disable-gpu-sandbox'] },
          },
        },
      ]
    : [{ name: 'local-list', use: { ...devices['Desktop Chrome'] } }],
})
