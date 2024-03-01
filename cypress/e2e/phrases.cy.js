describe('Phrase testing', () => {
  beforeEach(() => {
    cy.viewport(1024, 768)
  })

  it('9.2 - Get first Phrase and search for it', () => {
    // i moved the visit from outside of beforeEach so i don't have to get it to log in on every it test
    cy.on('uncaught:exception', () => false)

    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)

    cy.contains('Dictionary', { timeout: 12000 }).click()
    cy.contains('Phrases', { timeout: 12000 }).click()

    cy.get('table tr td button')
      .first()
      .invoke('text')
      .then((text) => {
        cy.get('[data-testid=SearchInput').type(`${text}{enter}`)
        cy.contains(text)
      })
  })
}) // end of describe
