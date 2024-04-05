/// <reference types="cypress" />

describe('media tests', () => {
  beforeEach(() => {
    cy.viewport(1024, 768)
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

  it('2.6 - view media', () => {
    cy._login()

    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()

    cy.contains('Media').click()
    cy.contains('Audio').click()
    cy.contains('Download')
    cy.go(-1)
    cy.contains('Manage your images').parent().click()
    cy.contains('Download')
    cy.go(-1)
    cy.contains('Manage your videos').parent().click()
    cy.contains('Download')
  })
})
