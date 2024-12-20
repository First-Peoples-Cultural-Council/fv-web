describe(
  'Test stories',
  {
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
  () => {
    beforeEach(() => {
      cy.viewport(1024, 768)
      cy.on('uncaught:exception', () => false)
    })

    it('10.1 - Click on stories grid view', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
      cy.contains('p', 'Learn').should('be.visible')
      cy.get('[data-testid="navigation-learn-btn"]').click()
      cy.get('[data-testid="navigation-stories-link"]').click()
      cy.location('pathname').should('eq', `/${Cypress.env('DIALECT')}/stories`)
      cy.get('[data-testid="song-story-grid-tile"]', { timeout: 10000 }).each(
        (_story) => {
          cy.wrap(_story).scrollIntoView()
          cy.wrap(_story).click()

          cy.get('[data-testid="story-link"]').scrollIntoView()
          cy.get('[data-testid="story-link"]').should('be.visible')
          cy.get('#CloseDrawerBtn').click()
          cy.get('[data-testid="story-link"]').should('not.exist')
        },
      )
    })

    it('10.2 - Check list view stories', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
      cy.contains('p', 'Learn').should('be.visible')
      cy.get('[data-testid="navigation-learn-btn"]').click()
      cy.get('[data-testid="navigation-stories-link"]').click()
      cy.location('pathname').should('eq', `/${Cypress.env('DIALECT')}/stories`)
      cy.get('[data-testid="grid-off-btn"]').click()
      cy.get('[data-testid="song-story-list-row"]', { timeout: 10000 }).each(
        (_story) => {
          cy.wrap(_story).scrollIntoView()
          cy.wrap(_story).should('be.enabled')
          cy.wrap(_story).click()

          cy.get('[data-testid="story-link"]').scrollIntoView()
          cy.get('[data-testid="story-link"]').should('be.visible')
          cy.get('#CloseDrawerBtn').click()
        },
      )
    })
  },
) // end of describe
