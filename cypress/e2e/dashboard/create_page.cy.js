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

    cy.env(['baseUrl']).then(({ baseUrl }) => {
      cy.visit(baseUrl)
    })
    cy.contains('Sign in').click()
    cy.env(['CYPRESS_ORIGIN']).then(({ CYPRESS_ORIGIN }) => {
      cy.origin(CYPRESS_ORIGIN, () => {
        Cypress.Commands.add('login', (email, password) => {
          cy.get('.visible-lg').find('#signInFormUsername').should('be.visible')
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
    cy.get('[id="footer"]').should('exist')
  })

  const _slug = `testQA${String.fromCharCode(97 + Math.floor(Math.random() * 26))}`
  it('2.2 - Create Page', () => {
    cy.env(['CYPRESS_FV_INITIALS']).then(({ CYPRESS_FV_INITIALS }) => {
      cy.contains(CYPRESS_FV_INITIALS).should('be.visible')
      cy.contains(CYPRESS_FV_INITIALS).click()
    })
    cy.contains('Dashboard').should('be.visible')
    cy.contains('Dashboard').click()
    cy.contains('Edit custom pages').click()
    cy.contains('Create a Custom Page').click()
    cy.contains('Create page').click()

    cy.contains('title must be').should('exist')
    cy.contains('Please enter a URL').should('exist')
    cy.env(['baseUrl', 'CYPRESS_DIALECT']).then(
      ({ baseUrl, CYPRESS_DIALECT }) => {
        cy.visit(baseUrl + CYPRESS_DIALECT)
      },
    )
    cy.env(['CYPRESS_FV_INITIALS']).then(({ CYPRESS_FV_INITIALS }) => {
      cy.contains(CYPRESS_FV_INITIALS).click()
    })
    cy.contains('Dashboard').click()
    cy.contains('Edit custom pages').click()
    cy.contains('Create a Custom Page').click()

    cy.get('#title').type('testQApage')
    cy.get('#subtitle').type(Cypress._.uniqueId('Subtitle_'))
    cy.get('#slug').type(_slug)

    cy.contains('Create page').click()
    cy.contains('Success')
  })

  it('delete new page', () => {
    cy.env(['CYPRESS_FV_INITIALS']).then(({ CYPRESS_FV_INITIALS }) => {
      cy.contains(CYPRESS_FV_INITIALS).should('be.visible')
      cy.contains(CYPRESS_FV_INITIALS).click()
    })
    cy.contains('Dashboard').should('be.visible')
    cy.contains('Dashboard').click()
    cy.contains('Edit custom pages').click()

    cy.deletePage(_slug, 'testQApage')
  })
})
