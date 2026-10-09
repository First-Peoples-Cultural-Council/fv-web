/// <reference types="cypress" />
import './core_suite_dashboard.cy'
import './core_suite_user.cy'

describe('basic test', () => {
  it('visit homepage', () => {
    cy.env(['baseUrl']).then(({ baseUrl }) => {
      cy.visit(baseUrl)
    })
    cy.contains('404').should('not.exist')
  })
})
