/// <reference types="cypress" />

describe('Immersion Test', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false)
    cy.viewport(1024, 768)
    cy.visit(`${Cypress.env('baseUrl')}/nuxeo/login.jsp`)
    cy.wait(2000)
    cy.login(
      Cypress.env('CYPRESS_FV_USERNAME'),
      Cypress.env('CYPRESS_FV_PASSWORD'),
    )
    cy.wait(3000)
    cy.visit(`${Cypress.env('baseUrl')}/${Cypress.env('DIALECT')}`)
    cy.wait(2000)
  })

  it('Check button exists', () => {
    cy.contains('cn').click()
    cy.contains('Immersion Mode').should('exist')
  })

  it('enable it, check, then disable it', () => {
    cy.contains('cn').click()
    cy.wait(2000)
    cy.contains('Immersion Mode').click()
    cy.contains('Dictionary').click()
    cy.contains('qwel̓qwal̓éit').should('exist')
    cy.wait(1000)
    cy.contains('cn').click()
    cy.wait(1000)
    cy.contains('Immersion Mode').click()
    cy.contains('Dictionary').click()
    cy.contains('qwel̓qwal̓éit').should('not.exist')
  })

  it('check dashboard', () => {
    cy.contains('cn').click()
    cy.contains('Dashboard').click()
    cy.get('[href="/lilwat/dashboard/edit"]').click()

    cy.contains('Edit your Immersion Labels').click()
  })
}) // end of describe
