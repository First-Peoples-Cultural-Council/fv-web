/// <reference types="cypress" />

describe(
  'Dashboard - Immersion Test',
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
    })

    it('Check button exists', () => {
      cy.visit(`${Cypress.env('baseUrl')}`)
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Immersion Mode').should('exist')
    })

    it('enable it, check, then disable it', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()

      cy.contains('Immersion Mode').click()
      cy.contains('Dictionary').click()
      cy.contains('qwel̓qwal̓éit').should('exist')

      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()

      cy.contains('Immersion Mode').click()
      cy.contains('Dictionary').click()
      cy.contains('qwel̓qwal̓éit').should('not.exist')
    })

    it('check dashboard', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').click()
      cy.get('[href="/lilwat/dashboard/edit"]').click()

      cy.contains('Edit your Immersion Labels').click()
    })
  },
) // end of describe
