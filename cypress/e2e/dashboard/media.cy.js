/// <reference types="cypress" />

describe('media tests', () => {
  beforeEach(() => {
    cy.viewport(1024, 768)
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
