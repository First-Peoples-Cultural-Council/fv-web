/// <reference types="cypress" />

describe('Dashboard - Page testing', () => {
  beforeEach(() => {
    cy.viewport(1024, 768)

    cy.intercept(
      {
        method: 'GET', // Route all GET requests
        url: '/matomo.js',
      },
      [], // and force the response to be: []
    )

    Cypress.Commands.add('deletePage', (_slug, name) => {
      cy.get(`a[href$="slug=${_slug}"]`).click()
      cy.contains('Edit Page Header').click()
      cy.get('#title').should('contain.value', name)
      cy.contains('Delete Page').click()
      cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
    })

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

  const _slug = `testQA${String.fromCharCode(97 + Math.floor(Math.random() * 26))}`
  it('2.2 - Create Page', () => {
    cy.contains('Explore Languages').click()
    cy.title().should('eq', 'FirstVoices')
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').should('be.visible')
    cy.contains('Dashboard').click()
    cy.contains('Edit custom pages').click()
    cy.contains('Create a Custom Page').click()
    cy.contains('Create page').click()

    cy.contains('title must be').should('exist')
    cy.contains('Please enter a URL').should('exist')
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('CYPRESS_DIALECT')}`)
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()
    cy.contains('Edit custom pages').click()
    cy.contains('Create a Custom Page').click()

    cy.get('#title').type('testQApage')
    cy.get('#subtitle').type(Cypress._.uniqueId('Subtitle_'))
    cy.get('#slug').type(_slug)

    cy.contains('Create page').click()
    cy.contains('Success')
  })

  it('Custom Page - delete new page', () => {
    cy.contains('Explore Languages').click()
    cy.title().should('eq', 'FirstVoices')
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').should('be.visible')
    cy.contains('Dashboard').click()
    cy.contains('Edit custom pages').click()
    cy.deletePage(_slug, 'testQApage')
  })
})
