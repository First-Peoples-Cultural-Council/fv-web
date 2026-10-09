/// <reference types="cypress" />
const _reportTypes = [
  'Build your own',
  'Recently created',
  'Recently modified',
  'No audio',
  'No images',
  'Team content',
  'Members only content',
  'Public content',
  'Not on Kids site',
]

describe(
  'Dashboard - Reports testing',
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
      Cypress.Commands.add('checkHeaderCSS', (fontWeightStrength) => {
        if (fontWeightStrength[0] === 'Build your own') {
          cy.get('[data-testid="sortby-title-btn"] > span').should(
            'have.css',
            'font-weight',
            `${fontWeightStrength[1]}`,
          )
        }
        cy.get('[id="SingleSelect-hasAudio"] span').should(
          'have.css',
          'font-weight',
          `${fontWeightStrength[2]}`,
        )
        cy.get('[id="SingleSelect-hasImage"] span').should(
          'have.css',
          'font-weight',
          `${fontWeightStrength[3]}`,
        )
        cy.get('[id="SingleSelect-hasVideo"] span').should(
          'have.css',
          'font-weight',
          `${fontWeightStrength[4]}`,
        )
        cy.get('[id="SingleSelect-hasTranslation"] span').should(
          'have.css',
          'font-weight',
          `${fontWeightStrength[5]}`,
        )
        cy.get('[id="SingleSelect-visibility"] span').should(
          'have.css',
          'font-weight',
          `${fontWeightStrength[6]}`,
        )
      })
      cy.viewport(1920, 1080)
      cy.env(['baseUrl']).then(({ baseUrl }) => {
        cy.visit(baseUrl)
      })
      cy.contains('Sign in').click()
      cy.env(['CYPRESS_ORIGIN']).then(({ CYPRESS_ORIGIN }) => {
        cy.origin(CYPRESS_ORIGIN, () => {
          Cypress.Commands.add('login', (email, password) => {
            cy.get('.visible-lg')
              .find('#signInFormUsername')
              .should('be.visible')
            cy.get('.visible-lg').find('#signInFormUsername').type(email)
            // lets try an incorrect password
            cy.get('.visible-lg')
              .find('#signInFormPassword')
              .type(`${password}{enter}`)
          })

          cy.env(['CYPRESS_FV_USERNAME', 'CYPRESS_FV_PASSWORD']).then(
            ({ CYPRESS_FV_USERNAME, CYPRESS_FV_PASSWORD }) => {
              cy.login(CYPRESS_FV_USERNAME, CYPRESS_FV_PASSWORD)
            },
          )
        })
      })

      cy.env(['CYPRESS_FV_INITIALS']).then(({ CYPRESS_FV_INITIALS }) => {
        cy.contains(CYPRESS_FV_INITIALS).should('be.visible')
        cy.contains(CYPRESS_FV_INITIALS).click()
      })
      cy.contains('Dashboard').click()
      cy.get('[data-testid="DashboardPresentationReports"]').click()
    })

    it('check recently created', () => {
      cy.contains(_reportTypes[0]).click()
      cy.checkHeaderCSS([_reportTypes[0], 700, 500, 500, 500, 500, 500])
      cy.go('back')

      cy.contains(_reportTypes[1]).click()
      cy.checkHeaderCSS([_reportTypes[1], 700, 500, 500, 500, 500, 500])
      cy.contains('Created', { matchCase: false }).should('be.visible')
      cy.go('back')

      cy.contains(_reportTypes[2]).click()
      cy.checkHeaderCSS([_reportTypes[2], 700, 500, 500, 500, 500, 500])
      cy.contains('Last modified', { matchCase: false }).should('be.visible')
      cy.go('back')

      cy.contains(_reportTypes[3]).click()
      cy.checkHeaderCSS([_reportTypes[3], 500, 700, 500, 500, 500, 500])
      cy.contains('Has no audio', { matchCase: false }).should('be.visible')
      cy.go('back')

      cy.contains(_reportTypes[4]).click()
      cy.checkHeaderCSS([_reportTypes[4], 500, 500, 700, 500, 500, 500])
      cy.contains('Has no image', { matchCase: false }).should('be.visible')
      cy.go('back')

      cy.contains(_reportTypes[5]).click()
      cy.checkHeaderCSS([_reportTypes[5], 500, 500, 500, 500, 500, 700])
      cy.contains('Team Only', { matchCase: false }).should('be.visible')
      cy.go('back')

      cy.contains(_reportTypes[6]).click()
      cy.checkHeaderCSS([_reportTypes[6], 500, 500, 500, 500, 500, 700])
      cy.contains('Members Only', { matchCase: false }).should('be.visible')
      cy.go('back')

      cy.contains(_reportTypes[7]).click()
      cy.checkHeaderCSS([_reportTypes[7], 500, 500, 500, 500, 500, 700])
      cy.contains('Public', { matchCase: false }).should('be.visible')
      cy.go('back')

      cy.contains(_reportTypes[8]).click()
      cy.checkHeaderCSS([_reportTypes[7], 700, 500, 500, 500, 500, 500])
      cy.contains('on kids site', { matchCase: false }).should('be.visible')
      cy.go('back')
    })
  },
) // end of descript
