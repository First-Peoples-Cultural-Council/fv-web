describe('V2 tests, word and phrase', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl') + '/' + Cypress.env('DIALECT'))
    cy.viewport(1200, 1200)
    cy.wait(2000)
    cy.contains('Kids').click()
  })

  it('V2 - Visit kids dictionary', () => {
    cy.wait(1000)
    cy.contains('Dictionary').click()
    cy.contains('404').should('not.exist')
    cy.wait(1000)
    cy.get('[data-testid="DictionaryGridTilePresentationKids"]  > .grid > #media').each((_words) => {
      cy.request({
        url: _words[0].lastChild.href,
        failOnStatusCode: true,
      }).then((resp) => {
        expect(resp.status).to.eq(200)
      })
    })
  })

  it('V2 - visit kids alphabet', () => {
    cy.wait(1000)
    cy.contains('Alphabet').click()
    cy.contains(' 404').should('not.exist')
    cy.contains('See all words').click()
    cy.contains(' 404').should('not.exist')
    cy.wait(2000)

    cy.get('a[data-testid^="SearchFilter"]').then((_letter) => {
      for (let i = 0; i < _letter.length; i++) {
        cy.get(_letter[i]).click()
        cy.wait(3000)
        cy.contains(' 404').should('not.exist')
      }
    })
  })

  it('V2 - visit kids categories', () => {
    cy.contains('Categories').click()
    cy.contains(' 404').should('not.exist')
  })

  it('V2 - visit kids games', () => {
    cy.contains('Games').click()
    cy.contains(' 404').should('not.exist')
  })

  it('V2 - visit kids songs', () => {
    cy.contains('Songs').click()
    cy.contains(' 404').should('not.exist')
  })

  it('V2 - visit kids stories', () => {
    cy.contains('Stories').click()
    cy.contains(' 404').should('not.exist')
  })
}) //end of description
