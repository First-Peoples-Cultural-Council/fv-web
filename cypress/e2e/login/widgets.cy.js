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
      cy.on('uncaught:exception', () => false)
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
      })
      Cypress.Commands.add('checkValidation', (widgetName) => {
        cy.contains(widgetName).click()
        cy.contains('Create widget').click()
        cy.get('.text-red-500').should('exist')
        cy.contains('Go back').click()
      })
      Cypress.Commands.add('createwidget', (name) => {
        const widgetname = 'testwidgetcypress'
        cy.visit(
          `${Cypress.env('baseUrl')}${Cypress.env(
            'DIALECT',
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
        cy.contains('Dashboard').click()
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
          cy.get('.public-DraftStyleDefault-block').type('subtitle text')
        } else if (_widget === 'Short Text') {
          cy.get('#title').type('text title test')
          cy.get('#text').type('subtitle text')
          cy.get('#url').type('https://www.google.ca/')
          cy.get('#urlLabel').type('url label')
        } else if (_widget === 'Page Text') {
          cy.get('.public-DraftStyleDefault-block').type('subtitle text')
        }
        cy.throughme('testwidgetcypress')
      })
    })

    it.skip('2.4 - view new page, widget', () => {
      cy._login()

      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').click()
      cy.contains('Create a widget').click()
      cy.contains('Logo').click()
      cy.get('#nickname').type('qatest')
      cy.contains('Create widget').click()
      cy.contains('Dismiss').click()
      cy.contains('Success').should('not.exist')
      cy.get('[href="/lilwat/dashboard/create"]').click()
      cy.contains('Add a new page to your site').should('exist')
      cy.contains('Create a custom page').click()
      cy.contains('Create page').should('exist')
      cy.contains('Enter the details').should('exist')

      cy.get('#title').should('be.enabled')
      cy.get('#title').type('qatestpage', { force: true })
      cy.get('#subtitle').type('qasubtitle')
      cy.get('#slug').type('qatesturllink')
      cy.contains('Create page').click()
      cy.contains('qatestpage').parent().children().eq(3).children().click()

      cy.contains('Widget').click()
      cy.contains('Name: qatest').click()
      cy.contains('OK').click()

      cy.visit(
        `${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}/custom/qatesturl`,
      )
      cy.get('.object-cover').should('exist')
      cy.contains('qatestpage').should('exist')
      cy.go(-1)
      cy.contains('Edit Page Header').click()
      cy.contains('Delete Page').click()
      cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
      cy.contains('Success').should('not.exist')
      cy.get('[href="/lilwat/dashboard/edit"]').click()

      cy.contains('Edit widgets').click()

      cy.contains('qatest')

        .parent()
        .children()
        .eq(2)
        .children()
        .click()

      cy.get('#nickname').should('contain.value', 'qatest')

      cy.contains('Delete widget').click()
      cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
    })
  },
) // end of describe
