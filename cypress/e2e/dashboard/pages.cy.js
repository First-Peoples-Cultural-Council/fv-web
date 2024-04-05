/// <reference types="cypress" />
describe('Page Test', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false)
    cy.viewport(1024, 768)
  })

  it('4.1 - custom page', () => {
    const site = `${Cypress.env('baseUrl')}${Cypress.env(
      'DIALECT',
    )}/custom/qacustompage`
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

    cy.contains('Explore Languages').should('be.visible')
    cy.visit(site)
    cy.contains('403').should('not.exist')
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Sign out').click()
    cy.visit(site)
    cy.contains('403').should('exist')
  })

  it.skip('3.1 edit homepage', () => {
    cy._login()
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()
    cy.contains('Edit').click()
    cy.contains('Edit Homepage').click()
    cy.contains('Edit Banner and Logo').click()
    cy.contains('Save Changes').click()
    cy.scrollTo('top')
    cy.get(':nth-child(1) > .p-2 >').trigger('dragstart', { force: true })
    cy.get(':nth-child(2) > .p-2 >').trigger('drop', { force: true })
  })

  it('12.2 - Page Text', () => {
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
    cy.contains('Edit homepage').click()
    cy.contains('Page Text').should('not.exist')
  })
}) // end of describe
