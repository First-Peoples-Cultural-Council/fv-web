describe('Test songs', () => {
  beforeEach(() => {
    cy.viewport(1024, 768)
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.contains('Learn').click()
    cy.contains('Songs').click()
    cy.on('uncaught:exception', () => false)
  })

  it('Go to songs, make sure it loads', () => {})

  it('Click on songs grid view', () => {
    cy.get('ul li').each((_song) => {
      cy.wrap(_song).click()

      cy.contains('Go to Song', { timeout: 12000 })
      cy.get('#CloseDrawerBtn').click()
    })
  })

  it('Check list view', () => {
    cy.contains('Use list view').click()

    cy.get('.pb-16 > .w-full >').each((_song) => {
      cy.wrap(_song).click()

      cy.contains('Go to Song')

      cy.get('#CloseDrawerBtn').click()
    })
  })
}) // end of describe
