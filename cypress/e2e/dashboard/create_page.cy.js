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
  })

  it('View Create Page', () => {
    cy.contains('Explore Languages').click()
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()
    cy.contains('Edit custom pages').click()
    cy.contains('Create a Custom Page').click()
    cy.contains('Create a new custom page').should('exist')
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)

    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()
    cy.contains('Edit custom pages').click()
    cy.contains('Create a Custom Page').click()
    cy.contains('Create page').click()

    cy.contains('title must be').should('exist')
    cy.contains('Please enter a URL').should('exist')

    const rString = randomString(
      17,
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    )
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)

    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()
    cy.contains('Edit custom pages').click()
    cy.contains('Create a Custom Page').click()

    cy.get('#title').type(Cypress._.uniqueId('Title_'))
    cy.get('#subtitle').type(Cypress._.uniqueId('Subtitle_'))

    cy.get('#slug').type(rString)
    cy.contains('Create page').click()
  })
})
