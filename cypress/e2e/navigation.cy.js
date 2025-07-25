describe(
  'User side - navigation',
  {
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
  () => {
    beforeEach(() => {
      cy.viewport(1200, 1200)
      cy.intercept(
        {
          method: 'GET', // Route all GET requests
          url: '/matomo.js',
        },
        [], // and force the response to be: []
      )
    })
    it('4.0 - site nav - dictionary', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('CYPRESS_DIALECT')}`)
      cy.contains('Dictionary').click()
      cy.contains('Words').click()
      cy.contains('WORDS').should('exist')

      cy.contains('Dictionary').click()
      cy.contains('Phrases').click()
      cy.contains('PHRASES').should('exist')
      cy.contains('Dictionary').click()
      cy.contains('Categories').click()
      cy.contains('CATEGORIES').should('exist')

      cy.contains('Dictionary').click()
      cy.contains('Alphabet').click()
      cy.contains('ALPHABET').should('exist')
    })

    it('12.1 - alphabet', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('CYPRESS_DIALECT')}`)
      cy.contains('ALPHABET').should('exist')
      cy.get(
        '[data-testid="AlphabetPresentationSelected__header"] button',
      ).should('have.length', 2)
    })

    it('explore languages - search', () => {
      cy.visit(`${Cypress.env('baseUrl')}languages`)
      cy.get('[id="LanguagesPresentation"] a').should('have.length.above', 1)
      cy.get('[id="LanguagesPresentation"] a').each((_site) => {
        const _href = _site.prop('href')
        cy.request(_href).then((resp) => {
          expect(resp.status).to.eq(200)
        })
      })
    })
  },
) // end of describe
