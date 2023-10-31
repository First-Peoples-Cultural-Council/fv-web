/// <reference types="cypress" />

function randomString(length, chars) {
  let result = ''
  for (let i = length; i > 0; i -= 1)
    result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

describe('page tests', () => {
  beforeEach(() => {
    cy.viewport(1024, 768)
    cy.visit(`${Cypress.env('baseUrl')}`)
    cy.contains('Sign in').click()
    cy.login(
      Cypress.env('CYPRESS_FV_USERNAME'),
      Cypress.env('CYPRESS_FV_PASSWORD'),
    )
    cy.wait(3000)
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(500)
  })

  it('View Create Page', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(500)
    cy.contains('cc').click()
    cy.contains('Dashboard').click()
    cy.contains('Custom Pages').click()
    cy.contains('Create a Custom Page').click()
    cy.contains('Create a new custom page').should('exist')
    // })

    // it('View Create Page - check vaidation', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(500)
    cy.contains('cc').click()
    cy.contains('Dashboard').click()
    cy.contains('Custom Pages').click()
    cy.contains('Create a Custom Page').click()
    cy.contains('Create Page').click()

    cy.contains('title must be').should('exist')
    cy.contains('Please enter a URL').should('exist')
    // })

    // it('View Create Page - create page', () => {
    const rString = randomString(
      17,
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    )
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(500)
    cy.contains('cc').click()
    cy.contains('Dashboard').click()
    cy.contains('Custom Pages').click()
    cy.contains('Create a Custom Page').click()

    cy.get('#title').type(Cypress._.uniqueId('Title_'))
    cy.get('#subtitle').type(Cypress._.uniqueId('Subtitle_'))

    cy.get('#slug').type(rString)

    cy.contains('Create Page').click()

    // cy.contains('View Page').click()
  })
})
