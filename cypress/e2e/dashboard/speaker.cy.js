/// <reference types="cypress" />

describe(
  'Dashboard - Speaker testing',
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
      cy.contains('Explore Languages').click()
    })

    const testSpeakerName = Date.now().toString()
    it('Create Speaker', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
      cy.get('[data-testid="user-menu-btn"]').click()
      cy.get('[data-testid="user-dashboard-link"]').click()
      cy.get('[data-testid="dashboard-create-link"]').click()
      cy.get('[data-testid="create-speaker-link"]').click()

      cy.get('[data-testid="form-submit"]').click()
      cy.contains('name must be at least 1 characters').should('be.visible')
      cy.contains('A bio is required').should('be.visible')

      cy.get('#name').type(testSpeakerName)
      cy.get('#bio').type('qabio test - new speaker')
      cy.get('[data-testid="form-submit"]').click()
      cy.get('[data-testid="success-close-btn"]').should('exist')
    })

    it('Edit Speaker', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
      cy.get('[data-testid="user-menu-btn"]').click()
      cy.get('[data-testid="user-dashboard-link"]').click()
      cy.get('[data-testid="dashboard-edit-link"]').click()
      cy.get('[data-testid="edit-speakers-link"]').click()
      cy.get(`[data-testid="edit-speaker-${testSpeakerName}"]`).click()
      cy.get('#bio').type('this is the new value')
      cy.get('[data-testid="form-submit"]').click()
      cy.get('[data-testid="success-close-btn"]').should('exist')
    })

    it('Delete Speaker', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
      cy.get('[data-testid="user-menu-btn"]').click()
      cy.get('[data-testid="user-dashboard-link"]').click()
      cy.get('[data-testid="dashboard-edit-link"]').click()
      cy.get('[data-testid="edit-speakers-link"]').click()
      cy.get(`[data-testid="edit-speaker-${testSpeakerName}"]`).click()
      cy.get('#bio')
        .invoke('val')
        .then((sometext) => sometext === 'this is the new value')
      cy.get('[data-testid="delete-btn"]').click()
      cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
    })
  },
)
