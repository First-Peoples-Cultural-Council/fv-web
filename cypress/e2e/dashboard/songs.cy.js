/// <reference types="cypress" />

const _title = `qatestsong${new Date().getTime()}`
describe(
  'Dashboard - Songs',
  {
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
  () => {
    beforeEach(() => {
      cy.on('uncaught:exception', () => false)
      cy.viewport(1920, 1080)
      cy.visit(`${Cypress.env('baseUrl')}`)

      cy.contains('Sign in').click()
      cy.origin(`${Cypress.env('CYPRESS_ORIGIN')}`, () => {
        Cypress.Commands.add('login', (email, password) => {
          cy.on('uncaught:exception', () => false)

          cy.get('#signInFormUsername').type(email, { force: true })
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
    })

    it('Create Song', () => {
      cy.contains('Dashboard').click()
      cy.contains('Create').click()

      cy.contains('Create a song').click()

      cy.get('#title').type(_title)
      cy.get('#titleTranslation').type(_title)

      cy.contains('Create song').click()
    })

    it('Delete Song', () => {
      cy.contains('Dashboard').click()
      cy.contains('Edit').click()

      cy.contains('Edit songs').click()
      cy.get(`td:contains(${_title})`)
        .siblings()
        .children('a')
        .first()
        .invoke('removeAttr', 'target')
      cy.get(`td:contains(${_title})`).siblings().children('a').first().click()
      cy.contains('Delete Song').click()
      cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
    })
  },
) // end of describe
