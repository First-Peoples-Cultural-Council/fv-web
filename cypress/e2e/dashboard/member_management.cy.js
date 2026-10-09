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
    })

    const findMember = (_memberEmail, _role) => {
      cy.get('table tbody tr dl dd').then(($rows) => {
        let _found = $rows.text().includes(_memberEmail)
        _found &&
          $rows.each(($el, $em) => {
            if ($em.innerText === _memberEmail) {
              cy.get('[data-testid="MembershipEditButton"]').eq($el).realClick()
              cy.get('#assistant').then(($radio) => {
                if ($radio.is('[data-checked]')) {
                  cy.get(`#${_role}`).realClick()
                } else {
                  cy.get('#assistant').realClick()
                }
                cy.contains('Update').realClick()
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

    it('member - find member', () => {
      cy.env(['CYPRESS_FV_INITIALS']).then(({ CYPRESS_FV_INITIALS }) => {
        cy.contains(CYPRESS_FV_INITIALS).should('be.visible')
        cy.contains(CYPRESS_FV_INITIALS).click()
      })
      cy.contains('Dashboard').realClick()
      cy.env(['CYPRESS_SERVER']).then(({ CYPRESS_SERVER }) => {
        cy.intercept(CYPRESS_SERVER).as('getNext')
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

        cy.env(['CYPRESS_MEMBER']).then(({ CYPRESS_MEMBER }) => {
          findMember(CYPRESS_MEMBER, 'editor')
        })
      })
    })
  },
) // end of describe
