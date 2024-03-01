describe('Word testing', { defaultCommandTimeout: 8000 }, () => {
  beforeEach(() => {
    cy.viewport(1024, 768)
  })

  it('5.1 - Check out word drawer', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)

    cy.contains('Dictionary').click()
    cy.contains('Words').click()
    cy.get('table tr td button', { timeout: 10000 }).first().click() // drawer should be open now

    cy.get('[data-testid=DictionaryDetailPresentationDrawer]').should(
      'be.visible',
    )

    cy.contains('MORE').click()
    cy.contains('QR CODE').should('be.visible')
    cy.contains('SHARE').click()
    cy.contains('Cancel').click()
    cy.contains('MORE').scrollIntoView()
    cy.contains('MORE').should('be.visible')
    cy.contains('MORE').click()
  })

  it('9.1 - Get first word and search for it', () => {
    // i moved the visit from outside of beforeEach so i don't have to get it to log in on every it test
    cy.on('uncaught:exception', () => false)
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.contains('Dictionary').click()
    cy.contains('Words').click()

    cy.get('table tr td button')
      .first()
      .invoke('text')
      .then((text) => {
        cy.get('[data-testid=SearchInput').type(`${text}{enter}`)
        cy.contains(text)
      })
  })
}) // end of describe
