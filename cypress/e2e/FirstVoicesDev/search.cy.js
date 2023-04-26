describe('V2 Search Home Page', () => {
  beforeEach(() => {
    cy.viewport(1200, 1200)
  })

  it('Try searching for something', () => {
    //i moved the visit from outside of beforeEach so i don't have to get it to log in on every it test
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })

    cy.visit(Cypress.env('baseUrl') + '/' + Cypress.env('DIALECT'))

    cy.get('[data-testid=SearchInput]').type('a{enter}')
    cy.wait(1000)
    cy.contains('Not Found').should('not.exist')
  })

  it('Grab a song name and search', () => {
    cy.visit(Cypress.env('baseUrl') + '/' + Cypress.env('DIALECT'))
    cy.contains('Learn').click()
    cy.contains('Songs').click()
    cy.get(':nth-child(1) > .text-fv-charcoal-light')
      .invoke('text')
      .then((_text) => {
        cy.log(_text)
        cy.get('polygon').click()
        cy.get('[data-testid=SearchInput]').type(_text + '{enter}')

        cy.contains('Resources').click()
        cy.contains('Mobile App').click()

        cy.get('[data-testid="SearchInput"]').type(_text + '{enter}')
      })
  })
  /*
  it('Try searching for nothing', () => {
    //i moved the visit from outside of beforeEach so i don't have to get it to log in on every it test
    cy.on('uncaught:exception', (err, runnable) => {
      //   return false;
    })

    //need to log in first to access these areas
    //cy.quickLogin(info.login, info.password)
    cy.visit('/' + Cypress.env('DIALECT'))
    cy.wait(1000)

    cy.get('[data-testid=SearchInput]').type('{enter}')
    cy.wait(1000)
    cy.contains('Not Found').should('not.exist')
  }) */
})
