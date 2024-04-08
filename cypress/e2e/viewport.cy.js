describe(
  'Browser Sizes',
  {
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
  () => {
    beforeEach(() => {})

    it('rotate between view ports ', () => {
      cy.on('uncaught:exception', () => false)

      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)

      cy.viewport('macbook-15')

      cy.viewport('macbook-13')

      cy.viewport('macbook-11')

      cy.viewport('ipad-2')

      cy.viewport('ipad-mini')

      cy.viewport('iphone-6+')

      cy.viewport('iphone-6')

      cy.viewport('iphone-5')

      cy.viewport('iphone-4')

      cy.viewport('iphone-3')

      // cy.viewport() accepts an orientation for all presets
      // the default orientation is 'portrait'
      cy.viewport('ipad-2', 'portrait')

      cy.viewport('iphone-4', 'landscape')
    })
  },
) // end of describe
