/// <reference types="cypress" />

describe(
  'Dashboard - Gallery Widget test',
  {
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
  () => {
    beforeEach(() => {
      cy.viewport(1920, 1080)
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

      cy.contains('Explore Languages').click()

      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').click()
    })
    const _title = 'gallerytestqa'

    it('Create Gallery', () => {
      cy.contains('Create').click()
      cy.contains('Create a gallery').click()

      cy.get('#title').type(_title)
      cy.get('#titleTranslation').type('qatestgallery')

      cy.contains('Add image').click()
      cy.get('ul > li').each((_li) => {
        cy.wrap(_li).click()
      })
      cy.contains('Insert').click()
      cy.contains('Create gallery').click()
      cy.contains('Sign Out').click()
    })

    it('Delete Gallery', () => {
      cy.contains('Edit').click()
      cy.contains('Edit a gallery').click()
      cy.contains(_title).click()
      cy.contains('Delete Gallery').click()
      cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
    })
  },
) // EOF
