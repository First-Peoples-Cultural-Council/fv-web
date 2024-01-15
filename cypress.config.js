const { defineConfig } = require('cypress')

module.exports = defineConfig({
  defaultCommandTimeout: 8000,
  e2e: {
    experimentalOriginDependencies: true,
  },
})
