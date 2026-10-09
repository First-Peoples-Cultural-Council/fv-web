/// <reference types="cypress" />

describe(
  'Dashboard - Tests main page',
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
      Cypress.Commands.add('_login', () => {
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
    })

    it('Request to join', () => {
      cy._login()
      cy.env(['CYPRESS_FV_INITIALS']).then(({ CYPRESS_FV_INITIALS }) => {
        cy.contains(CYPRESS_FV_INITIALS).should('be.visible')
        cy.contains(CYPRESS_FV_INITIALS).click()
      })
      cy.contains('Dashboard').click()

      cy.get('[data-testid="DashboardJoinCard"]')
        .find('[data-testid="custom-listbox-btn"]')
        .click()
      cy.contains('Approve as Member').click()
      cy.get('[data-testid="DashboardJoinCard"]')
        .find('[data-testid="custom-listbox-btn"]')
        .click()
      cy.contains('Approve as Assistant').click()
      cy.get('[data-testid="DashboardJoinCard"]')
        .find('[data-testid="custom-listbox-btn"]')
        .click()
      cy.contains('Approve as Editor').click()
      cy.get('[data-testid="DashboardJoinCard"]')
        .find('[data-testid="custom-listbox-btn"]')
        .click()
      cy.contains('Approve as Language Admin').click()

      cy.contains('Create a word').click()
      cy.go(-1)
      cy.contains('Create a phrase').click()
      cy.go(-1)
      cy.contains('Edit words and phrases').click()
      cy.go(-1)
      cy.contains('Create a widget').click()
      cy.go(-1)
      cy.contains('Edit custom pages').click()
      cy.go(-1)
      cy.contains('Edit homepage').click()
      cy.go(-1)
      cy.contains('Reports').click()
      cy.go(-1)
    })
  },
)
