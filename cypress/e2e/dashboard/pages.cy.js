/// <reference types="cypress" />
import 'cypress-real-events'

describe(
  'Dashboard - Page Test',
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

    it('4.1 - custom page', () => {
      cy.env(['baseUrl', 'CYPRESS_DIALECT']).then(
        ({ baseUrl, CYPRESS_DIALECT }) => {
          const site = `${baseUrl}${CYPRESS_DIALECT}/custom/qacustompage`

          cy.contains('Explore Languages').should('be.visible')
          cy.visit(site)
          cy.contains('403').should('not.exist')
        },
      )
    })

    it('3.1 edit homepage', () => {
      cy.env(['CYPRESS_FV_INITIALS']).then(({ CYPRESS_FV_INITIALS }) => {
        cy.contains(CYPRESS_FV_INITIALS).should('be.visible')
        cy.contains(CYPRESS_FV_INITIALS).click()
      })
      cy.contains('Dashboard').click()
      cy.contains('Edit homepage').click()
      cy.contains('Edit banner and logo').click()
      cy.contains('Save changes').click()
    })

    it('12.2 - Page Text', () => {
      cy.env(['CYPRESS_FV_INITIALS']).then(({ CYPRESS_FV_INITIALS }) => {
        cy.contains(CYPRESS_FV_INITIALS).should('be.visible')
        cy.contains(CYPRESS_FV_INITIALS).click()
      })
      cy.contains('Dashboard').click()
      cy.contains('Edit homepage').click()
      cy.contains('Page Text').should('not.exist')
    })

    it('3.1 edit homepage - widget', () => {
      cy.env(['CYPRESS_FV_INITIALS']).then(({ CYPRESS_FV_INITIALS }) => {
        cy.contains(CYPRESS_FV_INITIALS).should('be.visible')
        cy.contains(CYPRESS_FV_INITIALS).click()
      })
      cy.contains('Dashboard').click()
      cy.contains('Edit homepage').click()

      cy.get('[data-testid="sortable-item-btn"]')
        .should('be.visible')
        .then(() => {
          cy.get('[data-testid="sortable-item-btn"]').eq(2).realMouseDown()
          cy.get('[data-testid="sortable-item-btn"]')
            .eq(2)
            .realMouseMove(0, 150)
          cy.get('[data-testid="sortable-item-btn"]').eq(2).realMouseUp()
        })
    })
  },
) // end of describe
