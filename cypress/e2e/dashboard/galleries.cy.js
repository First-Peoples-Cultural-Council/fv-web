/// <reference types="cypress" />

describe('gallery Test', () => {
  beforeEach(() => {
    cy.clearAllSessionStorage()
    cy.viewport(1920, 1080)
    cy.visit(`${Cypress.env('baseUrl')}`)
    cy.contains('Sign in').click()
    cy.origin(`${Cypress.env('CYPRESS_ORIGIN')}`, () => {
      Cypress.require('/cypress/support/commands')
    })
    cy.origin(`${Cypress.env('CYPRESS_ORIGIN')}`, () => {
      cy.login(
        Cypress.env('CYPRESS_FV_USERNAME'),
        Cypress.env('CYPRESS_FV_PASSWORD'),
      )
    })
  })

  it.only('create gallery', () => {
    cy.contains('Explore Languages').click()

    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()
    cy.contains('Create').click()
    cy.contains('Create a gallery').click()
  })
}) // EOF
