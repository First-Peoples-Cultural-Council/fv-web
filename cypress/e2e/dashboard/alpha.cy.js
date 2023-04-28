/// <reference types="cypress" />

describe('alphabet Test', () => {
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
    cy.contains('Edit').click()
  })

  it('edit alphabet', () => {
    const note =
      "Angie, Angie When will those clouds all disappear? Angie, Angie Where will it lead us from here? With no lovin' in our"
    cy.contains('Edit your Alphabet').click()
    cy.get('.min-w-full > .bg-white >').should('have.length', 58)
    cy.get(':nth-child(1) > :nth-child(5) > .text-secondary >').click()
    cy.get('#generalNote').should('contain.value', note)
    cy.get('#generalNote').clear()
    cy.contains('Save Changes').click()
    cy.get(':nth-child(1) > :nth-child(5) > .text-secondary >').click()
    cy.get('#generalNote').should('contain.value', '')
    cy.get('#generalNote').type(note)
    cy.contains('Save Changes').click()
  })
}) // end of describe
