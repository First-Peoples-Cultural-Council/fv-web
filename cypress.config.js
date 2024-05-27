const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 8000,
  env: {
    baseUrl: 'https://localhost:3000/',
    DIALECT: 'lilwat',
    CYPRESS_FV_USERNAME: process.env.CYPRESS_FV_USERNAME,
    CYPRESS_FV_PASSWORD: process.env.CYPRESS_FV_PASSWORD,
    CYPRESS_FV_INITIALS: process.env.CYPRESS_FV_INITIALS,
    RECORD_KEY: process.env.CYPRESS_RECORD_KEY,
    PROJECT_ID: process.env.CYPRESS_PROJECT_ID,
  },
  e2e: {
    experimentalOriginDependencies: true,
  },
})
