/// <reference types="cypress" />

describe(
  'Dashboard - Category testing',
  {
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
  () => {
    beforeEach(() => {
      cy.viewport(1024, 768)

      Cypress.Commands.add('_login', () => {
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
          cy.contains('Sign in with your email and password').should('exist')
          cy.login(
            Cypress.env('CYPRESS_FV_USERNAME'),
            Cypress.env('CYPRESS_FV_PASSWORD'),
          )
        })

        cy.contains('Explore Languages').click()
      })
    })

    it('Create Category', () => {
      cy._login()
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').click()
      cy.contains('Create').click()
      cy.contains('Add a category').click()

      cy.get('#title').type('qatestcategory')
      cy.get('#description').type('qabio test - new speaker')
      cy.contains('Create category').click()
    })

    it('Delete Category', () => {
      cy._login()
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').click()
      cy.contains('Edit').click()
      cy.contains('Edit categories').click()
      cy.get('td:contains("qatestcategory")')
        .siblings()
        .children('a')
        .first()
        .click()
      cy.contains('Delete Category').click()
      cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
    })
  },
)
