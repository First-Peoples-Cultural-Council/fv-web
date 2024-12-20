describe(
  'Test songs',
  {
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
  () => {
    beforeEach(() => {
      cy.viewport(1024, 768)
    })

    it('10.3 - Click on songs grid view', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
      cy.contains('p', 'Learn').should('be.visible')
      cy.get('[data-testid="navigation-learn-btn"]').click()
      cy.get('[data-testid="navigation-songs-link"]').click()
      cy.location('pathname').should(
        'match',
        `/${Cypress.env('DIALECT')}/songs`,
      )
      cy.get('[data-testid="song-story-grid-tile"]', { timeout: 10000 }).each(
        (_song) => {
          cy.wrap(_song).scrollIntoView()
          cy.wrap(_song).click()
          cy.contains('Loading').should('not.exist')
          cy.get('[data-testid="song-link"]').scrollIntoView()
          cy.get('[data-testid="song-link"]').should('be.visible')
          cy.get('#CloseDrawerBtn').click()
          cy.get('[data-testid="song-link"]').should('not.exist')
        },
      )
    })

    it('10.4 - Check list view songs', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
      cy.contains('p', 'Learn').should('be.visible')
      cy.get('[data-testid="navigation-learn-btn"]').click()
      cy.get('[data-testid="navigation-songs-link"]').click()
      cy.location('pathname').should(
        'match',
        `/${Cypress.env('DIALECT')}/songs`,
      )
      cy.get('[data-testid="grid-off-btn"]').click()
      cy.get('[data-testid="song-story-list-row"]', { timeout: 10000 }).each(
        (_song) => {
          cy.wrap(_song).scrollIntoView()
          cy.wrap(_song).should('be.enabled')
          cy.wrap(_song).click()
          cy.get('[data-testid="song-link"]').scrollIntoView()
          cy.get('[data-testid="song-link"]').should('be.visible')
          cy.get('#CloseDrawerBtn').click()
        },
      )
    })
  },
) // end of describe
