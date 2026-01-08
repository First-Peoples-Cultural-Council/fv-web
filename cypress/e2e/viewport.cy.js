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

    const checkMenu = (_vp, _viewSize) => {
      cy.viewport(_vp)
      if (_viewSize === 2) {
        cy.get('#NavUser').should('be.visible')
      } else {
        cy.get('[data-testid="MobileMenu-button"]').should('be.visible')
      }
    }

    it('rotate between view ports ', () => {
      cy.on('uncaught:exception', () => false)

      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('CYPRESS_DIALECT')}`)

      checkMenu('macbook-15', 2)

      checkMenu('macbook-13', 2)

      checkMenu('macbook-11', 2)

      checkMenu('ipad-2', 1)

      checkMenu('ipad-mini', 1)

      checkMenu('iphone-6+', 1)

      checkMenu('iphone-6', 1)

      checkMenu('iphone-5', 1)

      checkMenu('iphone-4', 1)

      checkMenu('iphone-3', 1)
    })
  },
) // end of describe
