/// <reference types="cypress" />

describe('log in/out', () => {
  beforeEach(() => {
    cy.viewport(1024, 768)
  })

  it('log in page', () => {
    cy.visit(`${Cypress.env('baseUrl')}/nuxeo/login.jsp`)
    cy.contains('Log In').should('exist')
  })

  it('log in lang', () => {
    cy.visit(`${Cypress.env('baseUrl')}/nuxeo/login.jsp`)
    cy.get('#username').type(Cypress.env('CYPRESS_FV_USERNAME'))
    cy.get('#password').type(`${Cypress.env('CYPRESS_FV_PASSWORD')}{enter}`)
    cy.contains('YOUR LANGUAGES').should('exist')
  })

  it('Log in/out', () => {
    cy.on('uncaught:exception', () => false)
    cy.visit(`${Cypress.env('baseUrl')}/nuxeo/login.jsp`)

    cy.get('#username').type(Cypress.env('CYPRESS_FV_USERNAME'))
    cy.get('#password').type(`${Cypress.env('CYPRESS_FV_PASSWORD')}{enter}`)
    cy.wait(3000)
    cy.visit(`${Cypress.env('baseUrl')}/${Cypress.env('DIALECT')}`)
    cy.wait(1000)
    cy.reload()
    cy.contains('cn').click()
    cy.wait(1500)
    cy.contains('Sign out', { timeout: 12000 }).click()
  }) // end of log in
}) // end of describe
