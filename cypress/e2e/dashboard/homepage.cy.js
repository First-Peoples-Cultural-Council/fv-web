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
        cy.visit(`${Cypress.env('baseUrl')}`)
        cy.contains('Sign in').click()
        cy.origin(
          'https://fpcc-dev.auth.ca-central-1.amazoncognito.com',
          () => {
            Cypress.Commands.add('login', (email, password) => {
              cy.get('#signInFormUsername').type(email, { force: true })
              // lets try an incorrect password
              cy.get('#signInFormPassword').type(`${password}{enter}`, {
                force: true,
              })
            })

            cy.contains('Sign in with your email and password').should('exist')
            cy.login(
              Cypress.env('CYPRESS_FV_USERNAME'),
              Cypress.env('CYPRESS_FV_PASSWORD'),
            )
          },
        )

        cy.contains('Explore Languages').click()
      })
    })

    it('Request to join', () => {
      cy._login()
      cy.contains('Explore Languages').click()
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').click()

      cy.get('[data-testid="ListboxPresentation"]').click()
      cy.contains('Approve as Member').click()
      cy.get('[data-testid="ListboxPresentation"]').click()
      cy.contains('Approve as Assistant').click()
      cy.get('[data-testid="ListboxPresentation"]').click()
      cy.contains('Approve as Editor').click()
      cy.get('[data-testid="ListboxPresentation"]').click()
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
      cy.contains('Support').click()
      cy.go(-1)
    })
  },
)
