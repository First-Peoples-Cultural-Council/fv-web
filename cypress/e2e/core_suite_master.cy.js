/// <reference types="cypress" />
import './dashboard/reports.cy'
import './dashboard/pages.cy'
import './dashboard/create_page.cy'
import './dashboard/media.cy'
import './dashboard/wordup.cy'
import './login/login.cy'
import './login/widgets.cy'
import './kids.cy'
import './songs.cy'
import './word.cy'
import './stories.cy'
import './phrases.cy'
import './navigation.cy'
import './homepage.cy'

describe('Master file', () => {
  beforeEach(() => {
    cy.viewport(1024, 768)
    cy.on('uncaught:exception', () => false)
    cy.origin('https://fpcc-dev.auth.ca-central-1.amazoncognito.com', () => {
      Cypress.require('/cypress/support/commands')
    })
  })
}) // EOD
