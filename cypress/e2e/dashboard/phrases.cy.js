/// <reference types="cypress" />

describe(
  'Dashboard - Phrase Test',
  {
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
  () => {
    beforeEach(() => {
      cy.intercept(
        {
          method: 'GET', // Route all GET requests
          url: '/matomo.js',
        },
        [], // and force the response to be: []
      )
      Cypress.Commands.add('middlestuff', (_translationwp) => {
        cy.contains(_translationwp).click()
        cy.get('[name="translations.0.text"]').type(
          'an individual who fought for a warrior challenging a ruling of the Klingon High Council',
        )

        cy.contains('Next step').click()

        cy.contains('Next step').click()
        cy.contains('Finish').click()
        cy.contains('Dismiss').should('not.exist')
      })
      cy.viewport(1920, 1080)
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
    // const name2 = `qatestwordh${new Date().getTime()}`
    const name2 = `testing this phrase`

    it('8.1 - create phrase', () => {
      cy.env(['CYPRESS_FV_INITIALS']).then(({ CYPRESS_FV_INITIALS }) => {
        cy.contains(CYPRESS_FV_INITIALS).should('be.visible')
        cy.contains(CYPRESS_FV_INITIALS).click()
      })
      cy.contains('Dashboard').click()
      cy.contains('Create').click()

      cy.contains('Create a phrase').click()
      cy.contains('Finish').click()
      cy.get('#title').type(name2)
      cy.middlestuff('Add translation')
    })

    it('8.1a - delete phrase', () => {
      cy.env(['CYPRESS_FV_INITIALS']).then(({ CYPRESS_FV_INITIALS }) => {
        cy.contains(CYPRESS_FV_INITIALS).should('be.visible')
        cy.contains(CYPRESS_FV_INITIALS).click()
      })
      cy.contains('Dashboard').click()
      cy.get('[data-testid="DashboardPresentationEdit"]').click()
      cy.contains('Edit phrases').click()
      cy.contains('Loading').should('be.visible')
      cy.contains('Loading').should('not.exist')
      cy.get('[data-testid="SearchInput"]').type(`${name2}{enter}`)
      cy.contains(name2).click()
      cy.get('[data-testid="EntryDrawerEdit"]').invoke('removeAttr', 'target')
      cy.get('[data-testid="EntryDrawerEdit"]').click()
      cy.contains('Delete phrase').click()
      cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
    })
  },
) // end of describe
