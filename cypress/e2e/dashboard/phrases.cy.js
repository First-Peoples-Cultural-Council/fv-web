/// <reference types="cypress" />

describe('word Test', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false)
    cy.viewport(1024, 768)
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

  it('8.1 - create phrase', () => {
    cy.on('uncaught:exception', () => false)
    cy.viewport(1920, 1080)

    cy.contains('Explore Languages').click()

    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()
    cy.contains('Create').click()
    const name2 = `qatestwordh${new Date().getTime()}`
    cy.contains('Create a phrase').click()
    cy.contains('Finish').click()
    cy.get('#title').type(name2)
    cy.middlestuff('Add phrase translation')
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).should('be.enabled')
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()
    cy.get('[data-testid="DashboardPresentationEdit"]').click()
    cy.contains('Edit phrases').click()
    cy.contains('Loading').should('be.visible')
    cy.contains('Loading').should('not.exist')
    cy.get('[data-testid="SearchInput"]').type(`${name2}`, {
      delay: 50,
    })
    cy.get('[id="SearchSubmit"]').click()
    cy.contains(name2).click()
    cy.get('[data-testid="EntryDrawerEdit"]').invoke('removeAttr', 'target')
    cy.get('[data-testid="EntryDrawerEdit"]').click()
    cy.contains('Delete phrase').click()
    cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
  })
}) // end of describe
