/// <reference types="cypress" />

describe('word Test', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false)
    cy.viewport(1024, 768)
    cy.visit(`${Cypress.env('baseUrl')}`)
    cy.contains('Sign in').click()
    cy.origin('https://fpcc-dev.auth.ca-central-1.amazoncognito.com', () => {
      Cypress.require('/cypress/support/commands')
    })
    cy.origin('https://fpcc-dev.auth.ca-central-1.amazoncognito.com', () => {
      cy.login(
        Cypress.env('CYPRESS_FV_USERNAME'),
        Cypress.env('CYPRESS_FV_PASSWORD'),
      )
    })
  })

  it('3.0 edit words phrases', () => {
    cy.contains('Explore Languages').click()
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()
    cy.contains('Edit').click()
    cy.contains('Edit words').click()

    cy.get('.bg-white > :nth-child(1) > .text-left').click() // FW-5206
    cy.get('[data-testid="EntryDrawerEdit"]').invoke('removeAttr', 'target')
    cy.get('[data-testid="EntryDrawerEdit"]').click()
    cy.contains('Save changes').click()
  })

  it('7.1 - create word', () => {
    cy.on('uncaught:exception', () => false)
    cy.viewport(1024, 768)

    cy.contains('Explore Languages').click()
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()
    cy.contains('Create').click()
    const name = `cha'Dich${new Date().getTime()}`
    cy.contains('Create a word').click()
    cy.contains('Finish').click()
    cy.get('#title').type(name)
    cy.middlestuff('Add word translation')
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).should('be.enabled')
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()
    cy.contains('Edit words and phrases').click()
    cy.get('[data-testid="SearchInput"]').type(`${name}{enter}`)
    cy.contains(name).click()
    cy.get('[data-testid="EntryDrawerEdit"]').invoke('removeAttr', 'target')
    cy.get('[data-testid="EntryDrawerEdit"]').click()
    cy.contains('Delete word').click()
    cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
  })

  it('8.1 - create phrase', () => {
    cy.on('uncaught:exception', () => false)
    cy.viewport(1024, 768)

    cy.contains('Explore Languages').click()

    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()
    cy.contains('Create').click()
    const name = `cha'DIch${new Date().getTime()}`
    cy.contains('Create a phrase').click()
    cy.contains('Finish').click()
    cy.get('#title').type(name)
    cy.middlestuff('Add phrase translation')
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).should('be.enabled')
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()
    cy.contains('Edit words and phrases').click()
    cy.get('[data-testid="SearchInput"]').type(`${name}{enter}`)
    cy.contains(name).click()
    cy.get('[data-testid="EntryDrawerEdit"]').invoke('removeAttr', 'target')
    cy.get('[data-testid="EntryDrawerEdit"]').click()
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

    cy.deletePage(name)
  })
}) // end of describe
