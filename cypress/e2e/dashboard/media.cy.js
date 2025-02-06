/// <reference types="cypress" />

describe(
  'Dashboard - Media Tests (audio/video/images)',
  {
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
  () => {
    beforeEach(() => {
      cy.viewport(1920, 1080)
      Cypress.Commands.add('_login', () => {
        cy.visit(`${Cypress.env('baseUrl')}`)
        cy.contains('Sign in').click()
        cy.origin(
          'https://fpcc-dev.auth.ca-central-1.amazoncognito.com',
          () => {
            Cypress.Commands.add('login', (email, password) => {
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
    })

    it('2.6 - view media', () => {
      cy._login()
      cy.contains('Explore Languages').click()
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').click()

      cy.contains('Media').click()
      cy.contains('Audio').click()
      cy.contains('Download')
      cy.get('td audio:first')
        .invoke('attr', 'src')
        .then((audiofile) => {
          const audio = new Audio(audiofile)
          audio.play()
        })
      cy.go(-1)
      cy.contains('Manage your images').parent().click()
      cy.contains('Download')
      cy.go(-1)
      cy.contains('Manage your videos').parent().click()
      cy.contains('Download')
    })
  },
)
