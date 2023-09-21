import {defineConfig, devices} from '@playwright/test';

require('dotenv').config();

export default defineConfig({
  globalTimeout: 0,
  timeout: 0,
  testDir: './tests',
  // testMatch: '**/*example*',
  testMatch: '**/*linkedin*',
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
      name: 'Desktop Chromium',
      use: {
        ...devices['Desktop Chromium'],
        viewport: {width: 1920, height: 1080},
      },
    },
    {
      name: 'Desktop Firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: {width: 1920, height: 1080},
      },
    },
  ],
});
