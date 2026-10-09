/// <reference types="cypress" />
import './kids.cy'
import './songs.cy'
import './word.cy'
import './stories.cy'
import './phrases.cy'
import './navigation.cy'
import './homepage.cy'
import './search.cy'

describe('basic test', () => {
  it('visit homepage', () => {
    cy.env(['baseUrl']).then(({ baseUrl }) => {
      cy.visit(baseUrl)
    })
    cy.contains('404').should('not.exist')
  })
})
