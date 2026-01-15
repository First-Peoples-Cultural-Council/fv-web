/// <reference types="cypress" />

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
      cy.viewport(1024, 768)
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
              cy.get('[data-testid="MembershipEditButton"]').eq($el).click()
              cy.get('#assistant').then(() => {
                cy.get(`#${_role}`).click()
                cy.contains('Update').click()
                cy.get('[data-testid="page-1-btn"]').click({ timeout: 20000 })
                return
              })
            }
          })
        if (!_found) {
          cy.get('[data-testid="next-page-btn"]').then(($nextBtn) => {
            cy.wrap($nextBtn).click()
            cy.wait('@getNext')
          })
          findMember(_memberEmail, _role)
        }
      })
    }

    it.only('member - find member', () => {
      cy.contains('Explore Languages').click()
      cy.title().should('eq', 'FirstVoices')
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).should('exist')
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').click()
      cy.intercept(`${Cypress.env('CYPRESS_SERVER')}`).as('getNext')
      cy.contains('Member Management').click()
      cy.get('#PaginationControlsPresentation').should('be.visible')
      cy.get('[data-testid^="page"]').should('have.length.greaterThan', 1)
      cy.get('[data-testid="next-page-btn"]').click()
      cy.get('[data-testid^="page"]').each((_page) => {
        cy.wrap(_page).scrollIntoView()
        cy.wrap(_page).click()
        cy.wait('@getNext')
      })
      cy.get('[data-testid="page-1-btn"]').click()

      findMember(`${Cypress.env('CYPRESS_MEMBER')}`, 'assistant')
      findMember(`${Cypress.env('CYPRESS_MEMBER')}`, 'member')
    })
  },
) // end of describe
