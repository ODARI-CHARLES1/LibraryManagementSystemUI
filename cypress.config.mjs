import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'cztose',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      // Add custom task or plugin setup here
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
        table(message) {
          console.table(message);
          return null;
        }
      });
    },
    baseUrl: "http://localhost:5173",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/e2e.ts",
    chromeWebSecurity: false,
    defaultCommandTimeout: 10000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    retries: {
      runMode: 2,
      openMode: 1
    },
    screenshotOnRunFailure: true,
    video: true,
    videoCompression: 32,
    viewportWidth: 1280,
    viewportHeight: 720,
    env: {
      apiUrl: "http://localhost:5173/api",
      testUser: {
        email: "example555@gmail.com",
        password: "odary"
      },
      adminUser: {
        email: "admin@example.com",
        password: "admin123"
      }
    },
    experimentalStudio: true,
    experimentalInteractiveRunEvents: true,
    experimentalSourceRewriting: true
  },
  component: {
    devServer: {
      framework: "react",
      bundler: "vite",
    },
  },
});
