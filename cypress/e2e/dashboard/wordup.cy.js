/// <reference types="cypress" />

function middlestuff(wordtrans) {
  cy.contains(wordtrans).click()
  cy.get('.justify-between > .w-full').type(
    'an individual who fought for a warrior challenging a ruling of the Klingon High Council',
  )

  cy.contains('Add audio').click()
  cy.get('.table-fixed > .bg-white > :nth-child(1) > :nth-child(1)').click()
  cy.contains('Insert 1 Audio').click()

  cy.contains('Add categories').click()
  cy.get('.text-left > .flex-col > :nth-child(1) > :nth-child(1)').click()
  cy.contains('Add Category to document').click()

  cy.contains('Add note').click()
  cy.get(
    ':nth-child(6) > .mt-2 > .space-y-2 > li > .justify-between > .w-full',
  ).type('this is so note worthy!!!')

  cy.contains('Next step').click()
  cy.contains('Next step').click()
  cy.contains('Finish').click()
  cy.contains('Edit').click()
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
    cy.login(
      Cypress.env('CYPRESS_FV_USERNAME'),
      Cypress.env('CYPRESS_FV_PASSWORD'),
    )
    cy.contains('Explore Languages').click()
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()
    cy.contains('Create').click()
  })

  it('word requirements - anything u can do', () => {
    cy.contains('Create a Word').click()
    cy.contains('Finish').click()
  })

  it('7.1 - create word', () => {
    cy.on('uncaught:exception', () => false)
    const name = `cha'Dich${new Date().getTime()}`
    cy.contains('Create a Word').click()
    cy.contains('Finish').click()
    cy.get('#title').type(name)
    middlestuff('Add word translation')
    cy.get('#SearchInput').type(`${name}{enter}`)
    cy.contains(name).click()
    cy.get('a > .inline-flex > span').click()
    cy.contains('Delete word').click()
    cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
  })

  it('8.1 - create phrase', () => {
    cy.on('uncaught:exception', () => false)
    const name = `cha'DIch${new Date().getTime()}`
    cy.contains('Create a Phrase').click()
    cy.contains('Finish').click()
    cy.get('#title').type(name)
    middlestuff('Add phrase translation')
    cy.contains('PHRASES').click()
    cy.get('#SearchInput').type(`${name}{enter}`)
    cy.contains(name).click()
    cy.get('a > .inline-flex > span').click()
    cy.contains('Delete phrase').click()
    cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
  })

  it.skip('Create n edit page', () => {
    const name = 'testpage11111'
    cy.contains('Create a Custom Page').click()
    cy.get('#title').type(name)
    cy.get('#subtitle').type('random12342')
    cy.get('#slug').type('testcreatepage')
    cy.contains('Create page').click()

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
      cy.get('.flex-1 > :nth-child(1) > .justify-between > .flex').click()
      cy.contains(_widgets).click()
      cy.contains('OK').click()
    })

    deletePage(name)
  })
}) // end of describe
