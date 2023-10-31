/// <reference types="cypress" />

function checkValidation(widgetName) {
  cy.contains(widgetName).click()
  cy.contains('Create widget').click()
  cy.get('.text-red-500').should('exist')
  cy.contains('Go back').click()
}

function createwidget(name) {
  const widgetname = 'testwidgetcypress'
  cy.contains('Create').click()
  cy.contains('Create a Widget').click()
  cy.contains(name).click()
  cy.wait(3000)
  cy.get('#nickname').type(widgetname)
}

function throughme(name) {
  cy.contains('Create widget').click()
  cy.wait(1000)
  cy.contains('Create Widget').should('be.visible')
  cy.contains('Create Widget').click({ force: true })
  cy.wait(4000)
  cy.get('[href="/lilwat/dashboard/edit"]').click()
  cy.wait(1000)
  cy.contains('Edit widgets').click()

  cy.contains(name)
    .scrollIntoView()
    .parent()
    .children()
    .eq(2)
    .children()
    .click()

  cy.get('#nickname').should('contain.value', name)
  cy.wait(1500)
  cy.contains('Delete widget').click()
  cy.get('#RemoveWidgetModalContent').contains('Delete').click()
  cy.wait(3000)
}

describe('Widget tests', () => {
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
    cy.wait(4000)
    cy.contains('cc').click()
    cy.wait(500)
    cy.contains('Dashboard').click()
    cy.wait(1000)
    //  cy.contains('Create a Widget').click()
  })

  it('Check widget validation', () => {
    const widgets = [
      'Page Text',
      'Logo',
      'Quotes',
      'Text With Image',
      'Short Text',
    ]
    cy.contains('Create a Widget').click()
    widgets.forEach(checkValidation)
  })

  it('Check edit widgets', () => {
    cy.contains('Edit').click()
    cy.contains('Edit Widgets').click()
  })

  const subwidgets = [
    'Logo',
    'Quotes',
    'Page Text',
    'Text With Image',
    'Short Text',
  ]
  it.only(`Create widgets`, () => {
    subwidgets.forEach((_widget) => {
      createwidget(_widget)
      if (_widget === 'Mobile App') {
        cy.get('#androidUrl').type('https://www.google.ca/')
        cy.get('#iosUrl').type('https://www.google.ca/')
      } else if (_widget === 'Gallery') {
        cy.get('#galleryId').type('f0083daa-2988-4144-be17-34cd8fb288c9')
      } else if (_widget === 'Keyboard') {
        cy.get('#macUrl').type('https://www.google.ca/')
        cy.get('#windowsUrl').type('https://www.google.ca/')
      } else if (
        _widget === 'Text With Image' ||
        _widget === 'Text with Icons'
      ) {
        cy.get('#title').type('test')
        cy.get('.public-DraftStyleDefault-block').type('subtitle text')
      } else if (_widget === 'Short Text') {
        cy.get('#title').type('text title test')
        cy.get('#text').type('subtitle text')
        cy.get('#url').type('https://www.google.ca/')
        cy.get('#urlLabel').type('url label')
      } else if (_widget === 'Page Text') {
        cy.get('.public-DraftStyleDefault-block').type('subtitle text')
      }
      throughme('testwidgetcypress')
    })
  })
}) // end of describe
