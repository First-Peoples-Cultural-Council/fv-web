/// <reference types="cypress" />

describe(
  'Widget tests',
  {
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
  () => {
    beforeEach(() => {
      cy.intercept(
        {
          method: 'GET', // Route all GET requests
          url: '/matomo.js',
        },
        [], // and force the response to be: []
      )
      Cypress.Commands.add('_login', () => {
        cy.visit(`${Cypress.env('baseUrl')}`)
        cy.contains('Sign in').click()
        cy.origin(
          'https://fpcc-dev.auth.ca-central-1.amazoncognito.com',
          () => {
            Cypress.Commands.add('login', (email, password) => {
              cy.on('uncaught:exception', () => false)

              cy.get('#signInFormUsername').type(email, { force: true })
              // lets try an incorrect password
              cy.get('#signInFormPassword').type(`${password}{enter}`, {
                force: true,
              })
            })
            cy.contains('Sign in with your email and password').should('exist')
            cy.login(
              Cypress.env('CYPRESS_FV_USERNAME'),
              Cypress.env('CYPRESS_FV_PASSWORD'),
            )
          },
        )

        cy.contains('Explore Languages').click()
        cy.title().should('eq', 'FirstVoices')
      })
      Cypress.Commands.add('checkValidation', (widgetName) => {
        cy.contains(widgetName).click()
        cy.contains('Create widget').click()
        cy.get('.text-scarlet-700').should('exist')
        cy.contains('Go back').click()
      })
      Cypress.Commands.add('createwidget', (name) => {
        const widgetname = 'testwidgetcypress'
        cy.visit(
          `${Cypress.env('baseUrl')}${Cypress.env(
            'CYPRESS_DIALECT',
          )}/dashboard/create/widget`,
        )
        cy.contains(name).should('be.enabled')
        cy.contains(name).click({ force: true })
        cy.get('#nickname').type(widgetname)
      })
      Cypress.Commands.add('throughme', (name) => {
        cy.contains('Create widget').should('be.visible')
        cy.contains('Create widget').click({ force: true })
        cy.contains('Dismiss').click()
        cy.contains(name).parent().children().eq(2).children().click()

        cy.get('#nickname').should('contain.value', name)

        cy.contains('Delete widget').click()
        cy.get('[data-testid="DeleteModal"]').contains('Delete').click()

        cy.contains('Success').should('not.exist')
      })
      cy.viewport(1024, 768)
    })

    it('2.0/2.1 - Check widget validation', () => {
      cy._login()

      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').click()
      const widgets = [
        'Page Text',
        'Quotes',
        'Text With Image',
        'Short Text',
        'Map',
      ]
      cy.contains('Create a widget').click()
      widgets.forEach((_el) => cy.checkValidation(_el))

      cy.contains('Cancel').click()
      cy.contains('Edit custom pages').click()
      cy.contains('Create a Custom Page').click()
      cy.contains('Create page').click()
      cy.contains('title must be at least 1 characters').should('exist')
    })

    const subwidgets = ['Page Text', 'Text With Image', 'Short Text']
    it(`2.3 - Create widgets`, () => {
      cy._login()

      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').click()
      subwidgets.forEach((_widget) => {
        cy.createwidget(_widget)
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
          cy.get(':nth-child(1) > .tiptap > p').type('subtitle text')
        } else if (_widget === 'Short Text') {
          cy.get('#title').type('text title test')
          cy.get('#text').type('subtitle text')
          cy.get('#url').type('https://www.google.ca/')
          cy.get('#urlLabel').type('url label')
        } else if (_widget === 'Page Text') {
          cy.get(':nth-child(1) > .tiptap > p').type('subtitle text')
        }
        cy.throughme('testwidgetcypress')
      })
    })
  },
) // end of describe
