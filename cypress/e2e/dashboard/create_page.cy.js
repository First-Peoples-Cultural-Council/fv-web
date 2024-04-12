/// <reference types="cypress" />

describe('page tests', () => {
  beforeEach(() => {
    cy.viewport(1024, 768)

    Cypress.Commands.add('deletePage', (name) => {
      cy.contains(name).parent().children().eq(3).children().click()
      cy.contains('Edit Page Header').click()
      cy.get('#title').should('contain.value', name)
      cy.contains('Delete Page').click()
      cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
    })

    Cypress.Commands.add('_login', () => {
      cy.visit(`${Cypress.env('baseUrl')}`)
      cy.contains('Sign in').click()
      cy.origin('https://fpcc-dev.auth.ca-central-1.amazoncognito.com', () => {
        cy.contains('Sign in with your email and password').should('exist')
        cy.login(
          Cypress.env('CYPRESS_FV_USERNAME'),
          Cypress.env('CYPRESS_FV_PASSWORD'),
        )
      })

      cy.contains('Explore Languages').click()
    })
  })
  it('2.2 - Create Page', () => {
    cy._login()
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()
    cy.contains('Edit custom pages').click()
    cy.contains('Create a Custom Page').click()
    cy.contains('Create page').click()

    cy.contains('title must be').should('exist')
    cy.contains('Please enter a URL').should('exist')
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()
    cy.contains('Edit custom pages').click()
    cy.contains('Create a Custom Page').click()

    const _slug = String.fromCharCode(97 + Math.floor(Math.random() * 26))

    cy.get('#title').type('testQApage')
    cy.get('#subtitle').type(Cypress._.uniqueId('Subtitle_'))
    cy.get('#slug').type(_slug)

    cy.contains('Create page').click()
    cy.deletePage('testQApage')
  })
})
