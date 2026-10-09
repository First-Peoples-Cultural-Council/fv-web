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

    it('Create/Edit/Delete Category', () => {
      // cy.contains('Explore Languages').click()
      // cy.title().should('eq', 'FirstVoices')

      cy.env(['CYPRESS_FV_INITIALS']).then(({ CYPRESS_FV_INITIALS }) => {
        cy.contains(CYPRESS_FV_INITIALS).should('be.visible')
        cy.contains(CYPRESS_FV_INITIALS).click()
      })
      cy.contains('Dashboard').click()
      cy.contains('Create').click()
      cy.contains('Add a category').click()

      const _title = `qatestwordh${new Date().getTime()}`
      cy.get('#title').type(_title)
      cy.get('#description').type('qabio test - new speaker')
      cy.contains('Create category').click()
      cy.contains('Dismiss').should('be.visible')

      cy.get(`[data-testid="${_title}-edit-link"]`).scrollIntoView()
      cy.get(`[data-testid="${_title}-edit-link"]`).click()

      cy.get('#description').type('test qa data')
      cy.contains('Save changes').click()

      cy.get(`[data-testid="${_title}-edit-link"]`).scrollIntoView()
      cy.get(`[data-testid="${_title}-edit-link"]`).click()
      cy.contains('Delete category').click()
      cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
      cy.contains('delete').should('exist')

      cy.get(`[data-testid="${_title}-edit-link"]`).should('not.exist')
    })
  },
)
