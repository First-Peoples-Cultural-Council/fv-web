/// <reference types="cypress" />

describe(
  'Dashboard - Stories Test',
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
      cy.intercept(
        {
          method: 'GET', // Route all GET requests
          url: '/matomo.js',
        },
        [], // and force the response to be: []
      )
      cy.visit(`${Cypress.env('baseUrl')}`)
    })

    it('Create Story v1', () => {
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
      cy.contains('Create').click()

      cy.contains('Create a story').click()
      const _title = `qatest${new Date().getTime()}`
      cy.get('#title').type(_title)
      cy.get('#titleTranslation').type(
        `qatesttranslation${new Date().getTime()}`,
      )

      cy.get('#author').type('qatester_001')

      cy.contains('Next step').click()

      for (let i = 0; i < 1; i += 1) {
        cy.contains('Add page').click()
        cy.contains('Save').should('be.visible')
        cy.get(':nth-child(1) > .tiptap > p').eq(0).type('asdfasdfafs')
        cy.get(':nth-child(1) > .tiptap > p').eq(1).type('asdfasdfaf')
        cy.contains('Save').click()
      }
      cy.contains('Next step').click({ force: true })
      cy.contains('Next step').click()
      cy.contains('Finish').click()

      cy.get('[href="/lilwat/dashboard/edit"]').click()
      cy.contains('Edit stories').click()
      cy.get('[data-testid="SearchInput"]').type(`${_title}{enter}`)
      cy.get(`td:contains(${_title})`)
        .siblings()
        .children('a')
        .first()
        .invoke('removeAttr', 'target')
      cy.get(`td:contains(${_title})`).siblings().children('a').first().click()
      cy.contains('Delete Story').click()
      cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
    })
  },
) // end of describe
