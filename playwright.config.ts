import {defineConfig, devices} from '@playwright/test';

require('dotenv').config();

export default defineConfig({
  globalTimeout: 0,
  timeout: 0,
  testDir: './tests',
  retries: 0,
  workers: 5,
  reporter: [
    ['html'],
    ['list']
  ],
  use: {
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 15000,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chromium'],
        launchOptions: {
          args: ["--start-maximized"]
        }
      },
    }
  ]
});
