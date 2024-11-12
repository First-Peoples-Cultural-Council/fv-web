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
    })

    it('1.1 - signin/signout', () => {
      cy.reload()
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').should('exist')
      cy.contains('Sign out', { timeout: 12000 }).click()
    })

    it('1.2 - signin - no redirect', () => {
      cy.visit(`${Cypress.env('baseUrl')}`)
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Sign out', { timeout: 12000 }).click()
      cy.contains('Sign in').click()
      cy.origin(`${Cypress.env('CYPRESS_ORIGIN')}`, () => {
        cy.contains('Sign in with your email and password', {
          timeout: 10000,
        }).should('exist')
      })
    })

    it('1.3 - signin - browser back', () => {
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Sign out', { timeout: 12000 }).click()
      cy.contains('Sign in').click()
      cy.origin(`${Cypress.env('CYPRESS_ORIGIN')}`, () => {
        cy.contains('Sign in with your email and password').should('exist')
        cy.go('back')
      })

      cy.contains('Sign in')
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
