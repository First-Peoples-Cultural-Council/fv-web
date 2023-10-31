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
    cy.wait(2000)
    cy.get('ul li').each((_song) => {
      cy.wait(2000)
      cy.wrap(_song).click()

      cy.contains('Go to Song', { timeout: 12000 })
      cy.get('#CloseDrawerBtn').click()
    })
  })

  it('Check list view', () => {
    cy.wait(1000)
    cy.contains('Use list view').click()
    cy.wait(1000)
    cy.get('.pb-16 > .w-full >').each((_song) => {
      cy.wait(500)
      cy.wrap(_song).click()
      cy.wait(500)
      cy.contains('Go to Song')
      cy.wait(1000)
      cy.get('#CloseDrawerBtn').click()
    })
  })
}) // end of describe
