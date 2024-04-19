describe(
  'navigation',
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
    it.only('4.0 - site nav - dictionary', () => {
      cy.visit(`https://localhost:3000/${Cypress.env('DIALECT')}`)
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
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
      cy.contains('ALPHABET').should('exist')
      cy.get(
        '[data-testid="AlphabetPresentationSelected__header"] button',
      ).should('have.length', 2)
    })

    it('explore languages - search', () => {
      cy.visit(`${Cypress.env('baseUrl')}languages`)
      cy.get('[id="LanguagesPresentation"] a').should('have.length.above', 1)
      cy.get('[id="LanguagesPresentation"] a').each((_site) => {
        let _text = _site.text()
        _text = _text.replaceAll('  ', ' ')
        cy.get('[data-testid="SearchInput"]').type(`${_text}{enter}`)
        cy.contains(_text).should('be.visible')
        cy.contains(_text).invoke('css', 'background-color', 'blue')
        cy.contains('Clear Search').click()
      })
    })
  },
) // end of describe
