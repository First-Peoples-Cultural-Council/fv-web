const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 8000,
  env: {
    baseUrl: 'https://localhost:3000/',
    DIALECT: 'lilwat',
  },
  e2e: {
    experimentalOriginDependencies: true,
  },
})
