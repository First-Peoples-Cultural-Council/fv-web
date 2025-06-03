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

    it('4.1 - custom page', () => {
      const site = `${Cypress.env('baseUrl')}${Cypress.env(
        'CYPRESS_DIALECT',
      )}/custom/qacustompage`

      cy.contains('Explore Languages').should('be.visible')
      cy.visit(site)
      cy.contains('403').should('not.exist')
    })

    it('3.1 edit homepage', () => {
      cy.contains('Explore Languages').click()
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).should('exist')
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').click()
      cy.contains('Edit homepage').click()
      cy.contains('Edit banner and logo').click()
      cy.contains('Save changes').click()
    })

    it('12.2 - Page Text', () => {
      cy.contains('Explore Languages').click()
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).should('exist')
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').click()
      cy.contains('Edit homepage').click()
      cy.contains('Page Text').should('not.exist')
    })

    it('3.1 edit homepage - widget', () => {
      cy.contains('Explore Languages').click()

      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').click()
      cy.contains('Edit homepage').click()

      cy.get('[data-testid="DashboardWidgetMoveButton"]')
        .should('be.visible')
        .then(() => {
          cy.get('[data-testid="DashboardWidgetMoveButton"]')
            .eq(2)
            .realMouseDown()
          cy.get('[data-testid="DashboardWidgetMoveButton"]')
            .eq(2)
            .realMouseMove(0, 150)
          cy.get('[data-testid="DashboardWidgetMoveButton"]')
            .eq(2)
            .realMouseUp()

          cy.get('[data-testid="DashboardWidgetMoveButton"]')
            .eq(1)
            .realMouseDown()
          cy.get('[data-testid="DashboardWidgetMoveButton"]')
            .eq(1)
            .realMouseMove(0, 150)
          cy.get('[data-testid="DashboardWidgetMoveButton"]')
            .eq(1)
            .realMouseUp()

          cy.get('[data-testid="DashboardWidgetMoveButton"]')
            .eq(0)
            .realMouseDown()
          cy.get('[data-testid="DashboardWidgetMoveButton"]')
            .eq(0)
            .realMouseMove(0, -150)
          cy.get('[data-testid="DashboardWidgetMoveButton"]')
            .eq(0)
            .realMouseUp()
        })
    })
  },
) // end of describe
