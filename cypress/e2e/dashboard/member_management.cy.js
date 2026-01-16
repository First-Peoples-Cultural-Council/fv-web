/// <reference types="cypress" />
import 'cypress-real-events'
describe(
  'Dashboard - Member Management',
  {
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
  () => {
    beforeEach(() => {
      cy.viewport(1920, 1080)
      cy.intercept(
        {
          method: 'GET', // Route all GET requests
          url: '/matomo.js',
        },
        [], // and force the response to be: []
      )
      cy.visit(`${Cypress.env('baseUrl')}`)
      cy.contains('Sign in').click()
      cy.origin(`${Cypress.env('CYPRESS_ORIGIN')}`, () => {
        Cypress.Commands.add('login', (email, password) => {
          cy.get('#signInFormUsername').type(email, { force: true })
          cy.get('#signInFormPassword').type(`${password}{enter}`, {
            force: true,
          })
        })

        cy.login(
          Cypress.env('CYPRESS_FV_USERNAME'),
          Cypress.env('CYPRESS_FV_PASSWORD'),
        )
      })
    })

    const findMember = (_memberEmail, _role) => {
      cy.get('table tbody tr dl dd').then(($rows) => {
        let _found = $rows.text().includes(_memberEmail)
        _found &&
          $rows.each(($el, $em) => {
            if ($em.innerText === _memberEmail) {
              cy.get('[data-testid="MembershipEditButton"]').eq($el).realClick()
              cy.get('#assistant').then(() => {
                cy.get(`#${_role}`).realClick()
                cy.contains('Update').realClick()
                cy.get('[data-testid="page-1-btn"]').realClick({
                  timeout: 20000,
                })
                return
              })
            }
          })
        if (!_found) {
          cy.get('[data-testid="next-page-btn"]').then(($nextBtn) => {
            cy.wrap($nextBtn).realClick()
            cy.wait('@getNext')
          })
          findMember(_memberEmail, _role)
        }
      })
    }

    it.only('member - find member', () => {
      cy.contains('Explore Languages').realClick()
      cy.title().should('eq', 'FirstVoices')
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).should('exist')
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).realClick()
      cy.contains('Dashboard').realClick()
      cy.intercept(`${Cypress.env('CYPRESS_SERVER')}`).as('getNext')
      cy.contains('Member Management').realClick()
      cy.get('#PaginationControlsPresentation').should('be.visible')
      cy.get('[data-testid^="page"]').should('have.length.greaterThan', 1)
      cy.get('[data-testid="page-2-btn"]').should('be.visible')
      cy.get('[data-testid="next-page-btn"]').click()
      cy.get('[data-testid^="page"]').each((_page) => {
        cy.wrap(_page).scrollIntoView()
        cy.wrap(_page).should('not.be.disabled')
        cy.wrap(_page).realClick()
        cy.wait('@getNext')
      })
      cy.get('[data-testid="page-1-btn"]').realClick()

      findMember(`${Cypress.env('CYPRESS_MEMBER')}`, 'assistant')
      findMember(`${Cypress.env('CYPRESS_MEMBER')}`, 'member')
    })
  },
) // end of describe
