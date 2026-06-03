import { defineConfig, mergeConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      projects: [
        {
          extends: true,
          test: {
            name: 'unit',
            environment: 'jsdom',
            globals: false,
            setupFiles: ['./setupTests.ts'],
            css: true,
            include: ['__tests__/**/*.test.{ts,tsx}', 'src/**/*.test.{ts,tsx}'],
            exclude: ['__tests__/visual/**'],
            testTimeout: 10000,
            hookTimeout: 10000
          }
        },
        {
          extends: true,
          test: {
            name: 'visual',
            include: ['__tests__/visual/**/*.visual.test.{ts,tsx}'],
            setupFiles: ['./__tests__/visual/setup.ts'],
            css: true,
            testTimeout: 30000,
            hookTimeout: 30000,
            // Force Base UI's subpath modules to share the same React copy
            // as the test renderer; otherwise React.useId is null when Base
            // UI components mount in browser mode.
            server: {
              deps: {
                inline: [/@base-ui\/react/, /@base-ui\/utils/]
              }
            },
            browser: {
              enabled: true,
              provider: playwright(),
              headless: true,
              instances: [{ browser: 'chromium' }],
              viewport: { width: 1280, height: 720 },
              expect: {
                toMatchScreenshot: {
                  comparatorName: 'pixelmatch',
                  comparatorOptions: {
                    threshold: 0.2,
                    allowedMismatchedPixelRatio: 0.01
                  }
                }
              }
            }
          }
        }
      ]
    }
  })
)
