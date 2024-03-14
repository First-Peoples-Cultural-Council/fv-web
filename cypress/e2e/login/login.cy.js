/// <reference types="cypress" />

describe('log in/out', () => {
  beforeEach(() => {
    cy.viewport(1024, 768)
  })

  it('1.1 - signin/signout', () => {
    cy._login()
    cy.reload()
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').should('exist')
    cy.contains('Sign out', { timeout: 12000 }).click()
  })

  it('1.2 - signin - no redirect', () => {
    cy.visit(`${Cypress.env('baseUrl')}`)
    cy.contains('Sign in').click()
    cy.origin(`${Cypress.env('CYPRESS_ORIGIN')}`, () => {
      cy.contains('Sign in with your email and password', {
        timeout: 10000,
      }).should('exist')
    })
  })

  it('1.3 - signin - browser back', () => {
    cy.visit(`${Cypress.env('baseUrl')}`)
    cy.contains('Sign in').click()
    cy.origin(`${Cypress.env('CYPRESS_ORIGIN')}`, () => {
      cy.contains('Sign in with your email and password').should('exist')
      cy.go('back')
    })

    cy.contains('Sign in')
  })
}) // end of describe
