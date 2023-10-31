describe('V2 tests, word and phrase', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(2000)
    cy.contains('Kids').click()
  })

  it.skip('14.1 - Visit kids dictionary', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(2000)
    cy.contains('Kids').click()
    cy.wait(1000)
    cy.contains('Dictionary').click()
    cy.contains('404').should('not.exist')
    cy.wait(1000)
    cy.get(
      '[data-testid="DictionaryGridTilePresentationKids"]  > .grid > #EntryDetails',
    ).each((_words) => {
      cy.request({
        url: _words[0].lastChild.href,
        failOnStatusCode: true,
      }).then((resp) => {
        expect(resp.status).to.eq(200)
      })
    })
  })

  it('14.2 - visit kids alphabet', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(2000)
    cy.contains('Kids').click()
    cy.wait(1000)
    cy.contains('Alphabet').click()
    cy.contains(' 404').should('not.exist')
    cy.contains('See all words').click()
    cy.contains(' 404').should('not.exist')
    cy.wait(2000)

    cy.get('a[data-testid^="SearchFilter"]').each((letter) => {
      cy.get(letter).click()
      cy.wait(3000)
      cy.contains(' 404').should('not.exist')
    })
  })

  it('14.3 - visit kids categories', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(2000)
    cy.contains('Kids').click()
    cy.contains('Categories').click()
    cy.contains(' 404').should('not.exist')
  })

  it('14.4 - visit kids games', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(2000)
    cy.contains('Kids').click()
    cy.contains('Games').click()
    cy.contains(' 404').should('not.exist')
  })

  it('14.5 - visit kids songs', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(2000)
    cy.contains('Kids').click()
    cy.contains('Songs').click()
    cy.contains(' 404').should('not.exist')
  })

  it('14.6 - visit kids stories', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(2000)
    cy.contains('Kids').click()
    cy.contains('Stories').click()
    cy.contains(' 404').should('not.exist')
  })

  it('14.7 kids search', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(2000)
    cy.contains('Kids').click()
    cy.contains('Dictionary').click()
    cy.get(
      ':nth-child(2) > [data-testid="DictionaryGridTilePresentationKids"] > .grid > #EntryDetails > .w-full > .inline-flex > a',
    )
      .invoke('text')
      .then((_text) => {
        cy.get('#SearchSubmit').click()
        cy.contains(_text).should('exist')
      })
    cy.log('crashes until word is found')
  })
}) // end of describe
