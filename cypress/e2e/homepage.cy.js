describe(
  'V2 Search Homepage',
  {
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
  () => {
    beforeEach(() => {
      cy.viewport(1920, 1080)
    })

    it('V2 Homepage load', () => {
      // i moved the visit from outside of beforeEach so i don't have to get it to log in on every it test
      cy.on('uncaught:exception', () => false)
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('CYPRESS_DIALECT')}`)
      cy.contains('404').should('not.exist')
      cy.contains('Líl̓wat')
    })

    it('Test contact form', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('CYPRESS_DIALECT')}`)
      cy.contains('404').should('not.exist')
      cy.contains('Please sign in to use the contact us form').should('exist')
    })

    it('check icons on alphabet widget', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('CYPRESS_DIALECT')}`)
      cy.contains('404').should('not.exist')
      cy.get(
        '[data-testid="AlphabetPresentationSelected__header"] > button',
      ).should('have.length', 2)
    })

    it('Check word of the day', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('CYPRESS_DIALECT')}`)
      cy.contains('404').should('not.exist')

      cy.get('.mt-2 > a').click()
    })

    it('check image logo', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('CYPRESS_DIALECT')}`)
      cy.get('[data-testid="SiteLogoPresentation"] img').should('be.visible')
    })

    it('check banner', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('CYPRESS_DIALECT')}`)
      cy.get('#BannerWithImage').should('be.visible')
    })
  },
) // end of describe
