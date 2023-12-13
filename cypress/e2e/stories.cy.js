describe('Test stories', () => {
  beforeEach(() => {
    cy.viewport(1024, 768)
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.contains('Learn').click()
    cy.contains('Stories').click()
    cy.on('uncaught:exception', () => false)
  })

  it('Go to stories, make sure it loads', () => {})

  it('Click on stories grid view', () => {
    cy.get('ul li', { timeout: 10000 }).each((_song) => {
      cy.wrap(_song).click()

      cy.contains('Go to Story', { timeout: 12000 })
      cy.get('#CloseDrawerBtn').click()
    })
  })

  it('Check list view', () => {
    cy.contains('Use list view').click()

    cy.get('.pb-16 > .w-full >', { timeout: 10000 }).each((_song) => {
      cy.wrap(_song).click()

      cy.contains('Go to Story')

      cy.get('#CloseDrawerBtn').click()
    })
  })
}) // end of describe
