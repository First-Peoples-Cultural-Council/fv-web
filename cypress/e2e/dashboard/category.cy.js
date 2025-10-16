/// <reference types="cypress" />

describe(
  'Dashboard - Category testing',
  {
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
  () => {
    beforeEach(() => {
      cy.viewport(1024, 768)
      cy.intercept(
        {
          method: 'GET', // Route all GET requests
          url: '/matomo.js',
        },
        [], // and force the response to be: []
      )
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

    it('Create/Edit/Delete Category', () => {
      cy.contains('Explore Languages').click()
      cy.title().should('eq', 'FirstVoices')

      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).should('exist')
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').click()
      cy.contains('Create').click()
      cy.contains('Add a category').click()

      const _title = `qatestwordh${new Date().getTime()}`
      cy.get('#title').type(_title)
      cy.get('#description').type('qabio test - new speaker')
      cy.contains('Create category').click()
      cy.contains('Dismiss').should('be.visible')

      cy.get(`[data-testid="${_title}-edit-link"]`).click()

      cy.get('#description').type('test qa data')
      cy.contains('Save changes').click()

      cy.get(`[data-testid="${_title}-edit-link"]`).click()
      cy.contains('Delete category').click()
      cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
    })
  },
)
