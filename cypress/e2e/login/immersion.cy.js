/// <reference types="cypress" />

describe(
  'Immersion Test',
  {
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
  () => {
    beforeEach(() => {
      cy.on('uncaught:exception', () => false)
      cy.viewport(1024, 768)
      cy.visit(`${Cypress.env('baseUrl')}/nuxeo/login.jsp`)

      cy.login(
        Cypress.env('CYPRESS_FV_USERNAME'),
        Cypress.env('CYPRESS_FV_PASSWORD'),
      )

      cy.visit(`${Cypress.env('baseUrl')}/${Cypress.env('DIALECT')}`)
    })

    it('Check button exists', () => {
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Immersion Mode').should('exist')
    })

    it('enable it, check, then disable it', () => {
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()

      cy.contains('Immersion Mode').click()
      cy.contains('Dictionary').click()
      cy.contains('qwel̓qwal̓éit').should('exist')

      cy.contains('cn').click()

      cy.contains('Immersion Mode').click()
      cy.contains('Dictionary').click()
      cy.contains('qwel̓qwal̓éit').should('not.exist')
    })

    it('check dashboard', () => {
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').click()
      cy.get('[href="/lilwat/dashboard/edit"]').click()

      cy.contains('Edit your Immersion Labels').click()
    })
  },
) // end of describe
