/// <reference types="cypress" />

describe(
  'Dashboard - Media Tests (audio/video/images)',
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

    it.only('adding speaker to audio', () => {
      cy._login()
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').click()
      cy.contains('Media').click()
      cy.contains('Audio').click()
      //Add Speaker to Audio
      cy.get('[data-testid="EntryDrawerEdit"]')
        .invoke('removeAttr', 'target')
        .click()
      cy.get('[data-testid="label-speakers"]')
        .parent()
        .find('[data-testid="autocomplete-input"]')
      cy.get('[data-testid="label-speakers"]')
        .parent()
        .find('button[aria-haspopup="listbox"]')
        .click()
      cy.get('[role="option"]').first().click()
      cy.get('body').click(0, 0)
      cy.contains('Save changes').click()
      // Remove Speaker from audio
      cy.get('[data-testid="EntryDrawerEdit"]')
        .first()
        .invoke('removeAttr', 'target')
        .click()
      cy.get('[data-testid="label-speakers"]')
        .parent()
        .find('button[aria-haspopup="listbox"]')
        .click()
      cy.get('[role="option"]').first().click()
      cy.get('body').click(0, 0)
      cy.contains('Save changes').click()
    })
  },
)
