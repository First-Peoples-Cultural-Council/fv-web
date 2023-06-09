describe('V2 Search Homepage', () => {
  beforeEach(() => {})

  it('V2 Homepage load', () => {
    // i moved the visit from outside of beforeEach so i don't have to get it to log in on every it test
    cy.on('uncaught:exception', () => false)
    cy.visit(`${Cypress.env('baseUrl')}/${Cypress.env('DIALECT')}`)
    cy.contains('404').should('not.exist')
    cy.contains('Líl̓wat')
  })

  it('Test contact form', () => {
    cy.visit(`${Cypress.env('baseUrl')}/${Cypress.env('DIALECT')}`)
    cy.contains('404').should('not.exist')
  })

  it('check icons on alphabet widget', () => {
    cy.visit(`${Cypress.env('baseUrl')}/${Cypress.env('DIALECT')}`)
    cy.contains('404').should('not.exist')
    cy.get(
      '[data-testid="AlphabetPresentationSelected__header"] > button',
    ).should('have.length', 2)
  })

  it('Check word of the day', () => {
    cy.visit(`${Cypress.env('baseUrl')}/${Cypress.env('DIALECT')}`)
    cy.contains('404').should('not.exist')

    cy.get('.mt-2 > a').click()
  })
}) // end of describe
