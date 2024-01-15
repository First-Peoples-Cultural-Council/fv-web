/// <reference types="cypress" />

describe('word Test', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false)
    cy.viewport(1024, 768)
    cy.visit(`${Cypress.env('baseUrl')}`)
  })

  it('Create Story v1', () => {
    cy.contains('Sign in').click()
    cy.login(
      Cypress.env('CYPRESS_FV_USERNAME'),
      Cypress.env('CYPRESS_FV_PASSWORD'),
    )
    cy.contains('Explore Languages').click()
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()
    cy.contains('Create').click()

    cy.contains('Create a story').click()
    const _title = `qatest${new Date().getTime()}`
    cy.get('#title').type(_title)
    cy.get('#titleTranslation').type(`qatesttranslation${new Date().getTime()}`)

    cy.get('#author').type('qatester_001')

    cy.contains('Next step').click()

    for (let i = 0; i < 60; i += 1) {
      cy.contains('Add page').click()
      cy.contains('Save').should('be.visible')
      cy.get('.grid > :nth-child(2) > .bg-white > .w-full').type(
        'asdfasdfafs',
        { delay: 180 },
      )
      cy.get(':nth-child(3) > .bg-white > .w-full').type('asdfasdfaf')
      cy.contains('Save').click()
      cy.contains('Dismiss').should('be.visible')
      cy.contains('Dismiss').click()
      cy.log(`going on to i = ${i}`)
    }
    cy.contains('Next step').click()
    cy.contains('Next step').click()
    cy.contains('Finish').click()

    cy.get('[href="/lilwat/dashboard/edit"]').click()
    cy.contains('Edit stories').click()
    cy.get('[data-testid="SearchInput"]').type(`${_title}{enter}`)
    cy.get('.cursor-pointer > .flex').click()
    cy.get('a > .inline-flex').click()
    cy.get('#title').should('have.value', _title)
    cy.contains('Delete Story').click()
    cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
  })
}) // end of describe
