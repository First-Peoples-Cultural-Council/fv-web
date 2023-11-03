/// <reference types="cypress" />

describe('log in/out', () => {
  beforeEach(() => {
    cy.viewport(1024, 768)
  })

  it('log in page - fully load', () => {
    cy.visit(`${Cypress.env('baseUrl')}`)
    cy.contains('Sign in').click()
    cy.contains('Sign in').should('exist')
  })

  it('log in page - test actual login', () => {
    cy.visit(`${Cypress.env('baseUrl')}`)
    cy.contains('Sign in').click()
    cy.get('#signInFormUsername').type(Cypress.env('CYPRESS_FV_USERNAME'), {
      force: true,
    })
    cy.get('#signInFormPassword').type(
      `${Cypress.env('CYPRESS_FV_PASSWORD')}{enter}`,
      { force: true },
    )
    cy.contains('Explore Languages').should('exist')
  })

  it('Log in/out', () => {
    cy.on('uncaught:exception', () => false)
    cy.visit(`${Cypress.env('baseUrl')}`)
    cy.contains('Sign in').click()

    cy.get('#signInFormUsername').type(Cypress.env('CYPRESS_FV_USERNAME'), {
      force: true,
    })
    cy.get('#signInFormPassword').type(
      `${Cypress.env('CYPRESS_FV_PASSWORD')}{enter}`,
      { force: true },
    )
    cy.wait(3000)
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(1000)
    cy.reload()
    cy.contains('cf').click()
    cy.wait(1500)
    cy.contains('Sign out', { timeout: 12000 }).click()
  }) // end of log in

  it('Test login button', () => {
    cy.visit(`${Cypress.env('baseUrl')}`)
    cy.contains('Sign in').click() // doesn't redirect test
    cy.contains('Sign in').should('exist')
  })
}) // end of describe
