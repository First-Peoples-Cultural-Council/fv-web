describe(
  'Kids Section',
  {
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
  () => {
    beforeEach(() => {
      cy.viewport(1024, 768)
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
      cy.contains('Kids').click()
    })

    it('14.1 - Visit kids dictionary', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
      cy.contains('Kids').click()
      cy.contains('Dictionary').click()
      cy.contains('404').should('not.exist')
    })

    it('14.2 - visit kids alphabet', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
      cy.contains('Kids').click()
      cy.contains('Alphabet').click()
      cy.contains(' 404').should('not.exist')
      cy.contains('See all words').click()
      cy.contains(' 404').should('not.exist')
      cy.get('a[data-testid^="SearchFilter"]').each((letter) => {
        cy.get(letter).click()
        cy.contains(' 404').should('not.exist')
        cy.contains('Loading...').should('not.exist')
      })
    })

    it('14.3 - visit kids categories', () => {
      cy.contains('Categories').click()
      cy.contains(' 404').should('not.exist')
    })

    it('14.4 - visit kids games', () => {
      cy.contains('Games').click()
      cy.contains(' 404').should('not.exist')
    })

    it('14.5 - visit kids songs', () => {
      cy.contains('Songs').click()
      cy.contains(' 404').should('not.exist')
    })

    it('14.6 - visit kids stories', () => {
      cy.contains('Stories').click()
      cy.contains(' 404').should('not.exist')
    })

    it('14.7 kids search', () => {
      cy.contains('Dictionary').click()
      cy.get(
        ':nth-child(2) > [data-testid="DictionaryGridTilePresentationKids"] > .grid > #EntryDetails > .w-full > .inline-flex > a',
      )
        .invoke('text')
        .then((_text) => {
          cy.get('[data-testid="SearchSubmit"]').click()
          cy.contains(_text).should('exist')
        })
      cy.log('crashes until word is found')
    })
  },
) // end of describe
