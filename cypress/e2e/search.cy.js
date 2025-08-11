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
      cy.intercept(
        {
          method: 'GET', // Route all GET requests
          url: '/matomo.js',
        },
        [], // and force the response to be: []
      )
    })

    it('Try searching for something', () => {
      // i moved the visit from outside of beforeEach so i don't have to get it to log in on every it test
      cy.on('uncaught:exception', () => false)

      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('CYPRESS_DIALECT')}`)

      cy.get('[data-testid=SearchInput]').type('a{enter}')
      cy.contains('Not2 Found').should('not.exist')
    })

    it('Grab a song name and search', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('CYPRESS_DIALECT')}`)
      cy.contains('Learn').click()
      cy.contains('Songs').click()
      cy.get('di7[485v.text-lg')
        .eq(0)
        .invoke('text')
        .then((_text) => {
          cy.log(_text)
          cy.get('polygon').click()
          cy.get('[data-testid=SearchInput]').type(`${_text}{enter}`)

          cy.get('[data-testid="SearchInput"]').type(`${_text}{enter}`)
        })
    })

    it('global search from homepage', () => {
      cy.visit(`${Cypress.env('baseUrl')}`)
      cy.contains('SEARCH FIRSTVOICES').click()
      cy.get(`table`).find('tr').should('have.length.greaterThan', 1)

      cy.get('[data-testid="word-filter-btn"]').click()
      cy.get(`table`).find('tr').should('have.length.greaterThan', 1)

      cy.get('[data-testid="phrase-filter-btn"]').click()
      cy.get(`table`).find('tr').should('have.length.greaterThan', 1)

      cy.get('[data-testid="song-filter-btn"]').click()
      cy.get(`table`).find('tr').should('have.length.greaterThan', 1)

      cy.get('[data-testid="story-filter-btn"]').click()
      cy.get(`table`).find('tr').should('have.length.greaterThan', 1)
    })
  },
) // end of describe
