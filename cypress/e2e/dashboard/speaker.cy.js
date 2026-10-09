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
      cy.intercept(
        {
          method: 'GET', // Route all GET requests
          url: '/matomo.js',
        },
        [], // and force the response to be: []
      )

      cy.env(['baseUrl']).then(({ baseUrl }) => {
        cy.visit(baseUrl)
      })
      cy.contains('Sign in').click()
      cy.env(['CYPRESS_ORIGIN']).then(({ CYPRESS_ORIGIN }) => {
        cy.origin(CYPRESS_ORIGIN, () => {
          Cypress.Commands.add('login', (email, password) => {
            cy.get('.visible-lg')
              .find('#signInFormUsername')
              .should('be.visible')
            cy.get('.visible-lg').find('#signInFormUsername').type(email)
            // lets try an incorrect password
            cy.get('.visible-lg')
              .find('#signInFormPassword')
              .type(`${password}{enter}`)
          })

          cy.env(['CYPRESS_FV_USERNAME', 'CYPRESS_FV_PASSWORD']).then(
            ({ CYPRESS_FV_USERNAME, CYPRESS_FV_PASSWORD }) => {
              cy.login(CYPRESS_FV_USERNAME, CYPRESS_FV_PASSWORD)
            },
          )
        })
      })
    })
    it('Create Speaker', () => {
      cy.env(['CYPRESS_FV_INITIALS']).then(({ CYPRESS_FV_INITIALS }) => {
        cy.contains(CYPRESS_FV_INITIALS).should('be.visible')
        cy.contains(CYPRESS_FV_INITIALS).click()
      })
      cy.contains('Dashboard').should('exist')
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

      cy.get('[data-testid="edit-speaker-qatestspeaker"]').eq(0).click()
      cy.get('#bio').type('this is the new value')
      cy.contains('Save Changes').click()

      cy.get('[data-testid="edit-speaker-qatestspeaker"]').eq(0).click()
      cy.contains('Delete speaker').click()
      cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
    })
  },
)
