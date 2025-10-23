/// <reference types="cypress" />

describe(
  'Dashboard - Word Test',
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

        let _translationsBtn = 0
        do {
          cy.contains('Add word translations').click()
          _translationsBtn += 1
          cy.get(`[name="translations.${_translationsBtn}.text"]`).type(
            'an individual who fought for a warrior challenging a ruling of the Klingon High Council',
          )
        } while (_translationsBtn < 9)

        cy.contains('Next step').click()

        cy.contains('Next step').click()
        cy.contains('Finish').click()
        cy.contains('Success').should('exist')
      })
      cy.viewport(1024, 768)
      cy.visit(`${Cypress.env('baseUrl')}`)
      cy.contains('Sign in').click()
      cy.origin(`${Cypress.env('CYPRESS_ORIGIN')}`, () => {
        Cypress.Commands.add('login', (email, password) => {
          cy.on('uncaught:exception', () => false)

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

    it('3.0 edit words phrases', () => {
      cy.contains('Explore Languages').click()
      cy.title().should('eq', 'FirstVoices')
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').click()
      cy.contains('Edit').click()
      cy.contains('Edit words').click()

      cy.get('[data-testid="EntryRow"]:first > td:first-child').click() // FW-5206
      cy.get('[data-testid="EntryDrawerEdit"]').invoke('removeAttr', 'target')
      cy.get('[data-testid="EntryDrawerEdit"]').click()
      cy.contains('Save changes').click()
    })

    const name = `cha'Dichqaqa`
    it('7.1 - create word', () => {
      cy.on('uncaught:exception', () => false)
      cy.viewport(1024, 768)

      cy.contains('Explore Languages').click()
      cy.title().should('eq', 'FirstVoices')
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').click()
      cy.contains('Create').click()

      cy.contains('Create a word').click()
      cy.contains('Finish').click()
      cy.get('#title').type(name)
      cy.middlestuff('Add word translation')
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').click()
      cy.contains('Edit words and phrases').click()
      cy.get('[data-testid="SearchInput"]').type(`${name}{enter}`)
      cy.contains(name).click()
      cy.get('[data-testid="EntryDrawerEdit"]').invoke('removeAttr', 'target')
      cy.get('[data-testid="EntryDrawerEdit"]').click()
      cy.contains('Delete word').click()
      cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
    })
  },
) // end of describe
