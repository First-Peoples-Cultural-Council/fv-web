const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 8000,
  env: {
    experimentalOriginDependencies: true,
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
    experimentalModifyObstructiveThirdPartyCode: true,
    baseUrl: 'https://localhost:3000/',
    DIALECT: 'lilwat',
    CYPRESS_ORIGIN: 'https://fpcc-dev.auth.ca-central-1.amazoncognito.com',
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
