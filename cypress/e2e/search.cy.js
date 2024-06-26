describe(
  'V2 Search Home Page',
  {
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
  () => {
    beforeEach(() => {
      cy.viewport(1200, 1200)
    })

    it('Try searching for something', () => {
      // i moved the visit from outside of beforeEach so i don't have to get it to log in on every it test
      cy.on('uncaught:exception', () => false)

      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)

      cy.get('[data-testid=SearchInput]').type('a{enter}')
      cy.contains('Not Found').should('not.exist')
    })

    it('Grab a song name and search', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
      cy.contains('Learn').click()
      cy.contains('Songs').click()
      cy.get('.bg-center > .group-hover:opacity-75 > .text-lg')
        .invoke('text')
        .then((_text) => {
          cy.log(_text)
          cy.get('polygon').click()
          cy.get('[data-testid=SearchInput]').type(`${_text}{enter}`)
          cy.contains('Resources').click()

          cy.get('[data-testid="SearchInput"]').type(`${_text}{enter}`)
        })
    })
  },
) // end of describe
