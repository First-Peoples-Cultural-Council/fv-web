/// <reference types="cypress" />

describe(
  'Dashboard - Gallery Widget test',
  {
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
  () => {
    beforeEach(() => {
      cy.viewport(1920, 1080)
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

      // cy.contains('Explore Languages').click()
      // cy.title().should('eq', 'FirstVoices')
      cy.env(['CYPRESS_FV_INITIALS']).then(({ CYPRESS_FV_INITIALS }) => {
        cy.contains(CYPRESS_FV_INITIALS).should('be.visible')
        cy.contains(CYPRESS_FV_INITIALS).click()
      })
      cy.contains('Dashboard').click()
    })
    const _title = 'gallerytestqa'

    it('Create/Delete Gallery', () => {
      cy.contains('Create').click()
      cy.contains('Create a gallery').should('be.visible')
      cy.contains('Create a gallery').click()

      cy.get('#title').type(_title)
      cy.get('#titleTranslation').type('qatestgallery')

      cy.contains('Add image').click()
      cy.get('[data-testid="media-select-btn"]').first().click()
      cy.contains('Insert').click()
      cy.contains('Create gallery').click()

      cy.contains(_title).click()
      cy.contains('Delete gallery').click()
      cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
    })
  },
) // EOF
