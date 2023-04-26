///

describe('Test stories', () => {
  beforeEach(() => {
    cy.viewport(1024, 768)
    cy.visit(Cypress.env('baseUrl') + '/' + Cypress.env('DIALECT'))
    cy.contains('Learn').click()
    cy.contains('Stories').click()
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })
  })

  it('Go to stories, make sure it loads', () => {})

  it('Click on stories grid view', () => {
    cy.wait(2000)
    cy.get('[role="list"] li', { timeout: 10000 }).each((_song) => {
      cy.wait(1500)
      cy.wrap(_song).click()
      cy.wait(1500)
      cy.contains('Go to Story', { timeout: 12000 })
      cy.get('#CloseDrawerBtn').click()
    })
  })

  it('Check list view', () => {
    cy.wait(2000)
    cy.contains('Use list view').click()
    cy.wait(4000)
    cy.get('.pb-16 > .w-full >', { timeout: 10000 }).each((_song) => {
      cy.wait(1500)
      cy.wrap(_song).click()
      cy.wait(1500)
      cy.contains('Go to Story')
      cy.wait(1000)
      cy.get('#CloseDrawerBtn').click()
    })
  })
})
