const { defineConfig } = require("cypress");
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    setupNodeEvents(on, config) {
      config.env.MAILSLURP_API_KEY = process.env.MAILSLURP_API_KEY;
      return config;
      // implement node event listeners here
    },
  },
});
