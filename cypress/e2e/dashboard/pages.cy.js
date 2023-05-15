/// <reference types="cypress" />

function deletePage(name) {
  cy.contains('Edit Page Header').click()
  cy.get('#title').should('contain.value', name)
  cy.contains('Delete Page').click()
  cy.get('#RemoveWidgetModalContent').contains('Delete').click()
}

describe('Page Test', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false)
    cy.viewport(1024, 768)
    cy.visit(`${Cypress.env('baseUrl')}/nuxeo/login.jsp`)
    cy.login(
      Cypress.env('CYPRESS_FV_USERNAME'),
      Cypress.env('CYPRESS_FV_PASSWORD'),
    )
    cy.visit(`${Cypress.env('baseUrl')}/${Cypress.env('DIALECT')}`)
    cy.contains('cn').click()
    cy.contains('Dashboard').click()
    cy.contains('Custom Pages').click()
    cy.contains('Create a Custom Page').click()
  })

  it('Check page option', () => {
    cy.contains('Create Page').click()

    cy.contains('title must be')
    cy.contains('Please enter a URL')
  })

  it('Create page', () => {
    const name = 'testpage11111'
    cy.get('#title').type(name)
    cy.get('#url').type('testcreatepage')
    cy.contains('Create Page').click()

    deletePage(name)
  })

  it('Create n edit page', () => {
    const name = 'testpage11111'
    cy.get('#title').type(name)
    cy.get('#url').type('testcreatepage')
    cy.contains('Create Page').click()

    cy.contains('Widget').click()
    cy.contains('Alphabet').click()
    cy.contains('OK').click()

    const widgets = [
      'Mobile App',
      'Contact Us',
      'New This Week',
      'Text With Image',
      'Word of the Day',
    ]

    widgets.forEach((_widgets) => {
      cy.get('.flex-1 > :nth-child(1) > .justify-between > .flex').click()
      cy.contains(_widgets).click()
      cy.contains('OK').click()
    })

    deletePage(name)
  })
}) // end of describe
