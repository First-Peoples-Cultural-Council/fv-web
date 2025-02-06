/// <reference types="cypress" />

describe('Dashboard - Page testing', () => {
  beforeEach(() => {
    cy.viewport(1024, 768)

    Cypress.Commands.add('deletePage', (name) => {
      cy.contains(name).parent().children().eq(3).children().click()
      cy.contains('Edit Page Header').click()
      cy.get('#title').should('contain.value', name)
      cy.contains('Delete Page').click()
      cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
    })

    cy.visit(`${Cypress.env('baseUrl')}`)
    cy.contains('Sign in').click()
    cy.origin(`${Cypress.env('CYPRESS_ORIGIN')}`, () => {
      Cypress.Commands.add('login', (email, password) => {
        cy.get('#signInFormUsername').type(email, { force: true })
        // lets try an incorrect password
        cy.get('#signInFormPassword').type(`${password}{enter}`, {
          force: true,
        })
      })

      cy.login(
        Cypress.env('CYPRESS_FV_USERNAME'),
        Cypress.env('CYPRESS_FV_PASSWORD'),
      )
    })
  })
  it('2.2 - Create Page', () => {
    cy.contains('Explore Languages').click()
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').should('be.visible')
    cy.contains('Dashboard').click()
    cy.contains('Edit custom pages').click()
    cy.contains('Create a Custom Page').click()
    cy.contains('Create page').click()

    cy.contains('title must be').should('exist')
    cy.contains('Please enter a URL').should('exist')
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('CYPRESS_DIALECT')}`)
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()
    cy.contains('Edit custom pages').click()
    cy.contains('Create a Custom Page').click()

    const _slug = String.fromCharCode(97 + Math.floor(Math.random() * 26))

    cy.get('#title').type('testQApage')
    cy.get('#subtitle').type(Cypress._.uniqueId('Subtitle_'))
    cy.get('#slug').type(_slug)

    cy.contains('Create page').click()
    cy.deletePage('testQApage')
  })
})
