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
    })

    it('10.1 - Click on stories grid view', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('CYPRESS_DIALECT')}`)
      cy.contains('Learn').click()
      cy.contains('Stories').click()
      cy.get('ul li', { timeout: 10000 }).first().click()
      cy.contains('Go to Story', { timeout: 12000 })
      cy.get('#CloseDrawerBtn').click()
      cy.contains('Go to Story').should('not.exist')
    })

    it('10.2 - Check list view stories', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('CYPRESS_DIALECT')}`)
      cy.contains('Learn').click()
      cy.contains('Stories').click()
      cy.contains('Use list view').click()
      cy.get('[data-testid="SongAndStoriesListRow"]', { timeout: 10000 })
        .first()
        .each((_song) => {
          cy.wrap(_song).should('be.enabled')
          cy.wrap(_song).click()
          cy.contains('Loading').should('not.exist')
          cy.contains('Go to Story').scrollIntoView()
          cy.contains('Go to Story').should('be.visible')
          cy.get('#CloseDrawerBtn').click()
        })
    })
  },
) // end of describe
