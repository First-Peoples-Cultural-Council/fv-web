/// <reference types="cypress" />

describe(
  'Dashboard - Speaker testing',
  {
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
  () => {
    beforeEach(() => {
      cy.viewport(1024, 768)

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
      cy.contains('Explore Languages').click()
    })
    it('Create Speaker', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').click()
      cy.contains('Create').click()
      cy.contains('Add a speaker').click()

      cy.contains('Add Speaker').click()
      cy.contains('name must be at least 1 characters').should('be.visible')
      cy.contains('A bio is required').should('be.visible')

      cy.get('#name').type('qatestspeaker')
      cy.get('#bio').type('qabio test - new speaker')
      cy.contains('Add Speaker').click()
      cy.contains('Dismiss').should('be.visible')
    })

    it('Delete Speaker', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').click()
      cy.contains('Edit').click()
      cy.contains('Edit speakers').click()
      cy.get('[data-testid="edit-speaker-qatestspeaker"]').click()
      cy.contains('Delete Speaker').click()
      cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
    })
  },
)
