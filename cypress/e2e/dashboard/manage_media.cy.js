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

    it('adding speaker to audio', () => {
      cy._login()
      cy.env(['CYPRESS_FV_INITIALS']).then(({ CYPRESS_FV_INITIALS }) => {
        cy.contains(CYPRESS_FV_INITIALS).should('be.visible')
        cy.contains(CYPRESS_FV_INITIALS).click()
      })
      cy.contains('Dashboard').click()
      cy.contains('Media').click()
      cy.contains('Audio').click()
      //Add Speaker to Audio
      cy.get('[data-testid="EntryDrawerEdit"]')
        .invoke('removeAttr', 'target')
        .click()
      cy.get('[id="description"]').clear()
      cy.get('[id="description"]').type('test description')
      cy.press(Cypress.Keyboard.Keys.TAB)
      //cy.get('[data-testid="autocomplete-multi-input"]').type(' ')
      cy.get('[role="option"]').first().click()
      cy.get('[data-testid="autocomplete-multi-input"]').type('{esc}')
      cy.contains('Save changes').click()

      // Remove Speaker from audio
      cy.contains('Dismiss').click()
      cy.get('[data-testid="EntryDrawerEdit"]')
        .first()
        .invoke('removeAttr', 'target')
        .click()
      cy.get('[id="description"]').type(' test')
      cy.press(Cypress.Keyboard.Keys.TAB)
      cy.get('[role="option"]').first().click()
      cy.get('[data-testid="autocomplete-multi-input"]').type('{esc}')
      cy.contains('Save changes').click()
    })
  },
)
