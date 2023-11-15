/// <reference types="cypress" />

function checkValidation(widgetName) {
  cy.contains(widgetName).click()
  cy.contains('Create widget').click()
  cy.get('.text-red-500').should('exist')
  cy.contains('Go back').click()
}

function createwidget(name) {
  const widgetname = 'testwidgetcypress'
  cy.contains(name).click()
  cy.get('#widgetName').type(widgetname)
}

function throughme(name) {
  cy.contains('Create widget').click()
  cy.wait(1000)
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

  cy.get('#widgetName').should('contain.value', name)
  cy.wait(1500)
  cy.contains('Delete widget').click()
  cy.get('#RemoveWidgetModalContent').contains('Delete').click()
}

describe('Widget tests', () => {
  beforeEach(() => {
    cy.on('uncaught:exception', () => false)
    cy.viewport(1024, 768)
    cy.visit(`${Cypress.env('baseUrl')}/nuxeo/login.jsp`)
    cy.wait(2000)
    cy.login(
      Cypress.env('CYPRESS_FV_USERNAME'),
      Cypress.env('CYPRESS_FV_PASSWORD'),
    )
    cy.wait(3000)
    cy.visit(`${Cypress.env('baseUrl')}/${Cypress.env('DIALECT')}`)
    cy.wait(2000)
    cy.contains('cn').click()
    cy.wait(500)
    cy.contains('Dashboard').click()
    cy.wait(1000)
    cy.contains('Create a Widget').click()
  })

  it('Check widget validation', () => {
    const widgets = [
      'Alphabet',
      'Mobile App',
      'Contact Us',
      'Gallery',
      'Keyboard',
      'Logo',
      'Quotes',
      'New This Week',
      'Text With Image',
      'Short Text',
      'Page Text',
      'Text with Icons',
      'Word of the Day',
    ]
    widgets.forEach(checkValidation)
  })

  it('Check edit widgets', () => {
    cy.contains('Edit').click()
    cy.contains('Edit Widgets').click()
  })

  it('Create a widget - short text', () => {
    createwidget('Short Text')
    cy.get('#title').type('text title test')
    cy.get('#text').type('subtitle text')
    cy.get('#url').type('https://www.google.ca/')
    cy.get('#urlLabel').type('url label')

    throughme('testwidgetcypress')
  })

  const subwidgets = [
    'Alphabet',
    'Contact Us',
    'Logo',
    'Quotes',
    'New This Week',
    'Page Text',
    'Word of the Day',
  ]
  subwidgets.forEach((_widget) => {
    it(`Create a widget -${_widget}`, () => {
      createwidget(_widget)
      throughme('testwidgetcypress')
    })
  })

  it('Create a widget - mobile', () => {
    createwidget('Mobile App')
    cy.get('#androidUrl').type('https://www.google.ca/')
    cy.get('#iosUrl').type('https://www.google.ca/')

    throughme('testwidgetcypress')
  })

  it('Create a widget - gallery', () => {
    createwidget('Gallery')
    cy.get('#galleryId').type('f0083daa-2988-4144-be17-34cd8fb288c9')

    throughme('testwidgetcypress')
  })

  it('Create a widget - keyboard', () => {
    createwidget('Keyboard')
    cy.get('#macUrl').type('https://www.google.ca/')
    cy.get('#windowsUrl').type('https://www.google.ca/')

    throughme('testwidgetcypress')
  })

  it('Create a widget - Text with image', () => {
    createwidget('Text With Image')
    cy.get('#title').type('test')
    throughme('testwidgetcypress')
  })

  it('Create a widget - short text', () => {
    createwidget('Short Text')
    cy.get('#title').type('test')
    throughme('testwidgetcypress')
  })

  it('Create a widget - text with icons', () => {
    createwidget('Text with Icons')
    cy.get('#title').type('test')
    throughme('testwidgetcypress')
  })
}) // end of describe
