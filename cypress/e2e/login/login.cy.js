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
      cy.visit(`${Cypress.env('baseUrl')}`)
      cy.contains('Sign in').click()
      cy.origin(`${Cypress.env('CYPRESS_ORIGIN')}`, () => {
        Cypress.Commands.add('login', (email, password) => {
          cy.get('#signInFormUsername').type(email, { force: true })
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
      cy.title().should('eq', 'FirstVoices')
    })

    it('1.1 - signin/signout', () => {
      //  cy.visit(`${Cypress.env('baseUrl')}`)
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').should('exist')
      cy.contains('Sign out', { timeout: 12000 }).click()
    })

    it('1.2 - signin - no redirect', () => {
      //cy.visit(`${Cypress.env('baseUrl')}`)
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Sign out', { timeout: 12000 }).click()
      cy.contains('Sign in').click()
      cy.origin(`${Cypress.env('CYPRESS_ORIGIN')}`, () => {
        cy.contains('Sign in with your email and password', {
          timeout: 10000,
        }).should('exist')
      })
    })

    it('sign up', () => {
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Sign out', { timeout: 12000 }).click()
      cy.contains('Sign in').click()
      cy.origin(`${Cypress.env('CYPRESS_ORIGIN')}`, () => {
        cy.contains('Sign up').click({ force: true })
      })
    })
  },
) // end of describe
