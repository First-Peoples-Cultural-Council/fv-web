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
      cy.contains('Explore Languages').click()
    })

    it('Check button exists', () => {
      cy.visit(`${cy.env('baseUrl')}`)
      cy.visit(`${cy.env('baseUrl')}${cy.env('CYPRESS_DIALECT')}`)
      cy.env(['CYPRESS_FV_INITIALS']).then(({ CYPRESS_FV_INITIALS }) => {
        cy.contains(CYPRESS_FV_INITIALS).should('be.visible')
        cy.contains(CYPRESS_FV_INITIALS).click()
      })
      cy.contains('Immersion Mode').should('exist')
    })

    it('enable it, check, then disable it', () => {
      cy.visit(`${cy.env('baseUrl')}${cy.env('CYPRESS_DIALECT')}`)
      cy.env(['CYPRESS_FV_INITIALS']).then(({ CYPRESS_FV_INITIALS }) => {
        cy.contains(CYPRESS_FV_INITIALS).should('be.visible')
        cy.contains(CYPRESS_FV_INITIALS).click()
      })

      cy.contains('Immersion Mode').click()
      cy.contains('Dictionary').click()
      cy.contains('qwel̓qwal̓éit').should('exist')

      cy.env(['CYPRESS_FV_INITIALS']).then(({ CYPRESS_FV_INITIALS }) => {
        cy.contains(CYPRESS_FV_INITIALS).should('be.visible')
        cy.contains(CYPRESS_FV_INITIALS).click()
      })

      cy.contains('Immersion Mode').click()
      cy.contains('Dictionary').click()
      cy.contains('qwel̓qwal̓éit').should('not.exist')
    })

    it('check dashboard', () => {
      cy.visit(`${cy.env('baseUrl')}${cy.env('CYPRESS_DIALECT')}`)
      cy.env(['CYPRESS_FV_INITIALS']).then(({ CYPRESS_FV_INITIALS }) => {
        cy.contains(CYPRESS_FV_INITIALS).should('be.visible')
        cy.contains(CYPRESS_FV_INITIALS).click()
      })
      cy.contains('Dashboard').click()
      cy.contains(/^Edit$/).click()

      cy.contains('Edit immersion labels').click()
    })
  },
) // end of describe
