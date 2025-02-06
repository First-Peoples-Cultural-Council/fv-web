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
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('CYPRESS_DIALECT')}`)
      cy.contains('Learn').click()
      cy.contains('Songs').click()
      cy.get('ul li')
        .first()
        .each((_song) => {
          cy.wrap(_song).click()
          cy.contains('Loading').should('not.exist')

          cy.contains('Go to Song', { timeout: 12000 })
          cy.get('#CloseDrawerBtn').click()
        })
    })

    it('10.4 - Check list view songs', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('CYPRESS_DIALECT')}`)
      cy.contains('Learn').click()
      cy.contains('Songs').click()
      cy.contains('Use list view').click()
      cy.get('[data-testid="SongAndStoriesListRow"]')
        .first()
        .each((_song) => {
          cy.wrap(_song).scrollIntoView()
          cy.wrap(_song).should('be.enabled')
          cy.wrap(_song).click()
          cy.contains('Go to Song').scrollIntoView()
          cy.contains('Go to Song')
          cy.get('#CloseDrawerBtn').click()
        })
    })
  },
) // end of describe
