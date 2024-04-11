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
]

describe(
  'Reports testing',
  {
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
  () => {
    beforeEach(() => {
      cy.on('uncaught:exception', () => false)
      Cypress.Commands.add('checkHeaderCSS', (fontWeightStrength) => {
        cy.get('[id="SingleSelect-sort"] > div > button > span').should(
          'have.css',
          'font-weight',
          `${fontWeightStrength[0]}`,
        )
        cy.get('[id="SingleSelect-hasAudio"] > div > button > span').should(
          'have.css',
          'font-weight',
          `${fontWeightStrength[1]}`,
        )
        cy.get('[id="SingleSelect-hasImage"] > div > button > span').should(
          'have.css',
          'font-weight',
          `${fontWeightStrength[2]}`,
        )
        cy.get('[id="SingleSelect-hasVideo"] > div > button > span').should(
          'have.css',
          'font-weight',
          `${fontWeightStrength[3]}`,
        )
        cy.get(
          '[id="SingleSelect-hasTranslation"] > div > button > span',
        ).should('have.css', 'font-weight', `${fontWeightStrength[4]}`)
        cy.get('[id="SingleSelect-visibility"] > div > button > span').should(
          'have.css',
          'font-weight',
          `${fontWeightStrength[5]}`,
        )
      })
      cy.viewport(1024, 768)
      cy.visit(`${Cypress.env('baseUrl')}`)
      cy.contains('Sign in').click()
      cy.origin(`${Cypress.env('CYPRESS_ORIGIN')}`, () => {
        Cypress.Commands.add('login', (email, password) => {
          cy.on('uncaught:exception', () => false)

          cy.get('#signInFormUsername').type(email, { force: true })
          // lets try an incorrect password
          cy.get('#signInFormPassword').type(`${password}{enter}`, {
            force: true,
          })
        })

        cy.login(
          Cypress.env('CYPRESS_FV_USERNAME'),
          Cypress.env('CYPRESS_FV_PASSWORD'),
        )
      })

      cy.contains('Explore Languages').click()
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').click()
      cy.get('[data-testid="DashboardPresentationReports"]').click()
    })

    it('check page loaded', () => {
      cy.contains('Reports').should('exist')

      _reportTypes.forEach((_rt) => {
        cy.contains(_rt).should('exist')
      })
    })

    it('check recently created', () => {
      cy.contains(_reportTypes[0]).click()
      cy.checkHeaderCSS([500, 500, 500, 500, 500, 500])
      cy.go('back')

      cy.contains(_reportTypes[1]).click()
      cy.checkHeaderCSS([700, 500, 500, 500, 500, 500])
      cy.contains('Recently created').should('be.visible')
      cy.go('back')

      cy.contains(_reportTypes[2]).click()
      cy.checkHeaderCSS([700, 500, 500, 500, 500, 500])
      cy.contains('Recently modified').should('be.visible')
      cy.go('back')

      cy.contains(_reportTypes[3]).click()
      cy.checkHeaderCSS([500, 700, 500, 500, 500, 500])
      cy.contains('Has no audio').should('be.visible')
      cy.go('back')

      cy.contains(_reportTypes[4]).click()
      cy.checkHeaderCSS([500, 500, 700, 500, 500, 500])
      cy.contains('Has no image').should('be.visible')
      cy.go('back')

      cy.contains(_reportTypes[5]).click()
      cy.checkHeaderCSS([500, 500, 500, 500, 500, 700])
      cy.contains('Team Only').should('be.visible')
      cy.go('back')

      cy.contains(_reportTypes[6]).click()
      cy.checkHeaderCSS([500, 500, 500, 500, 500, 700])
      cy.contains('Members Only').should('be.visible')
      cy.go('back')

      cy.contains(_reportTypes[7]).click()
      cy.checkHeaderCSS([500, 500, 500, 500, 500, 700])
      cy.contains('Public').should('be.visible')
      cy.go('back')
    })
  },
) // end of descript
