/// <reference types="cypress" />

function middlestuff() {
  cy.contains('Add Translation').click()
  cy.get('.justify-between > .w-full').type(
    'an individual who fought for a warrior challenging a ruling of the Klingon High Council',
  )

  cy.contains('Add audio').click()
  cy.get('.min-w-full > .bg-white > :nth-child(1) > :nth-child(1)').click()
  cy.contains('Insert 1 Audio').click()

  cy.contains('Add Categories').click()
  cy.wait(4000)
  cy.get('.text-left > .flex-col > :nth-child(1) > :nth-child(1)').click()
  cy.contains('Add Category to document').click()

  cy.contains('Add Note').click()
  cy.get(
    ':nth-child(6) > .mt-2 > .space-y-2 > li > .justify-between > .w-full',
  ).type('this is so note worthy!!!')

  cy.contains('Next Step').click()
  cy.wait(2000)
  cy.contains('Next Step').click()
  cy.contains('Finish').click()
  cy.wait(2000)
  cy.contains('Edit').click()
  cy.wait(1000)
  cy.contains('Edit Words').click()
}
function deletePage(name) {
  cy.contains('Edit Page Header').click()
  cy.get('#title').should('contain.value', name)
  cy.contains('Delete Page').click()
  cy.get('#RemoveWidgetModalContent').contains('Delete').click()
}

describe('word Test', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false)
    cy.viewport(1024, 768)
    cy.visit(`${Cypress.env('baseUrl')}`)
    cy.contains('Sign in').click()
    cy.wait(2000)
    cy.login(
      Cypress.env('CYPRESS_FV_USERNAME'),
      Cypress.env('CYPRESS_FV_PASSWORD'),
    )
    cy.wait(3000)
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(2000)
    cy.contains('cc').click()
    cy.contains('Dashboard').click()
    cy.contains('Create').click()
  })

  it('word requirements - anything u can do', () => {
    cy.contains('Create a Word').click()
    cy.contains('Finish').click()
  })

  it('7.1 - create word', () => {
    cy.on('uncaught:exception', () => false)
    cy.viewport(1024, 768)
    cy.visit(`${Cypress.env('baseUrl')}`)
    cy.contains('Sign in').click()
    cy.wait(2000)
    cy.login(
      Cypress.env('CYPRESS_FV_USERNAME'),
      Cypress.env('CYPRESS_FV_PASSWORD'),
    )
    cy.wait(3000)
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(2000)
    cy.contains('cc').click()
    cy.contains('Dashboard').click()
    cy.contains('Create').click()
    const name = `cha'Dich${new Date().getTime()}`
    cy.contains('Create a Word').click()
    cy.contains('Finish').click()
    cy.get('#title').type(name)
    middlestuff()
    cy.get('#SearchInput').type(`${name}{enter}`)
    cy.contains(name).click()
    cy.get('a > .inline-flex > span').click()
    cy.contains('Delete word').click()
    cy.get('#RemoveWidgetModalContent').contains('Delete').click()
  })

  it('8.1 - create phrase', () => {
    cy.on('uncaught:exception', () => false)
    cy.viewport(1024, 768)
    cy.visit(`${Cypress.env('baseUrl')}`)
    cy.contains('Sign in').click()
    cy.wait(2000)
    cy.login(
      Cypress.env('CYPRESS_FV_USERNAME'),
      Cypress.env('CYPRESS_FV_PASSWORD'),
    )
    cy.wait(3000)
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(2000)
    cy.contains('cc').click()
    cy.contains('Dashboard').click()
    cy.contains('Create').click()
    const name = `cha'DIch${new Date().getTime()}`
    cy.contains('Create a Phrase').click()
    cy.contains('Finish').click()
    cy.get('#title').type(name)
    middlestuff()
    cy.contains('PHRASES').click()
    cy.get('#SearchInput').type(`${name}{enter}`)
    cy.contains(name).click()
    cy.get('a > .inline-flex > span').click()
    cy.contains('Delete phrase').click()
    cy.get('#RemoveWidgetModalContent').contains('Delete').click()
  })

  it('Create n edit page - no u cant', () => {
    const name = 'testpage11111'
    cy.contains('Create a Custom Page').click()
    cy.get('#title').type(name)
    cy.get('#url').type('testcreatepage')
    cy.contains('Create Page').click()

    cy.wait(2000)

    cy.contains('Widget').click()
    cy.contains('Alphabet').click()
    cy.contains('OK').click()

    const widgets = [
      'Mobile App',
      'Contact Us',
      'New This Week',
      'Text With Image',
      'Word of the Day',
    ]

    widgets.forEach((_widgets) => {
      cy.wait(1000)
      cy.get('.flex-1 > :nth-child(1) > .justify-between > .flex').click()
      cy.contains(_widgets).click()
      cy.contains('OK').click()
    })

    deletePage(name)
  })
}) // end of describe
