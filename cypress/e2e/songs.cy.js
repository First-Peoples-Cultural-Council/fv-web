describe('Test songs', () => {
  beforeEach(() => {
    cy.viewport(1024, 768)
  })

  it('10.3 - Click on songs grid view', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.contains('Learn').click()
    cy.contains('Songs').click()
    cy.get('ul li').each((_song) => {
      cy.wrap(_song).click()

      cy.contains('Go to Song', { timeout: 12000 })
      cy.get('#CloseDrawerBtn').click()
    })
  })

  it('10.4 - Check list view songs', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.contains('Learn').click()
    cy.contains('Songs').click()
    cy.contains('Use list view').click()
    cy.get('.pb-16 > .w-full >').each((_song) => {
      cy.wrap(_song).scrollIntoView()
      cy.wrap(_song).click()
      cy.wrap(_song).should('be.enabled')
      cy.contains('Go to Song').scrollIntoView()
      cy.contains('Go to Song')
      cy.get('#CloseDrawerBtn').click()
    })
  })
}) // end of describe
