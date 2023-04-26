const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://v2.preprod.firstvoices.com',
  },
})
