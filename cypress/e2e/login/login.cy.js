/// <reference types="cypress" />

describe(
  'log in/out',
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

    it('1.1 - signin/signout', () => {
      cy.env(['CYPRESS_FV_INITIALS']).then(({ CYPRESS_FV_INITIALS }) => {
        cy.contains(CYPRESS_FV_INITIALS).should('be.visible')
        cy.contains(CYPRESS_FV_INITIALS).click()
      })
      cy.contains('Dashboard').should('exist')
      cy.contains('Sign out', { timeout: 12000 }).click()
    })

    it('1.2 - signin - no redirect', () => {
      cy.env(['CYPRESS_FV_INITIALS']).then(({ CYPRESS_FV_INITIALS }) => {
        cy.contains(CYPRESS_FV_INITIALS).should('be.visible')
        cy.contains(CYPRESS_FV_INITIALS).click()
      })
      cy.contains('Sign out', { timeout: 12000 }).click()
      cy.contains('Sign in').click()
      cy.env(['CYPRESS_ORIGIN']).then(({ CYPRESS_ORIGIN }) => {
        cy.origin(CYPRESS_ORIGIN, () => {
          cy.contains('Sign in with your email and password', {
            timeout: 10000,
          }).should('exist')
        })
      })
    })

    it('sign up', () => {
      cy.env(['CYPRESS_FV_INITIALS']).then(({ CYPRESS_FV_INITIALS }) => {
        cy.contains(CYPRESS_FV_INITIALS).should('be.visible')
        cy.contains(CYPRESS_FV_INITIALS).click()
      })
      cy.contains('Sign out', { timeout: 12000 }).click()

      cy.contains('Sign in').click()
      cy.env(['CYPRESS_ORIGIN']).then(({ CYPRESS_ORIGIN }) => {
        cy.origin(CYPRESS_ORIGIN, () => {
          cy.get('.visible-lg').contains('Sign up').click()
        })
      })
    })
  },
) // end of describe
