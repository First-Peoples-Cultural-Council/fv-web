describe(
  'Word testing',
  {
    defaultCommandTimeout: 8000,
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
  () => {
    beforeEach(() => {
      cy.viewport(2000, 1080)
    })

    it('5.1 - Check out word drawer', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('CYPRESS_DIALECT')}`)

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
      cy.get('body').type('{esc}')
      cy.contains('MORE').scrollIntoView()
      cy.contains('MORE').should('be.visible')
      cy.contains('MORE').click()
    })

    it('9.1 - Get first word and search for it', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('CYPRESS_DIALECT')}`)
      cy.contains('Dictionary').click()
      cy.contains('Words').click()

      cy.get('[data-testid="DictionaryListEntry"]')
        .first()
        .invoke('text')
        .then((text) => {
          cy.get('[data-testid=SearchInput').type(`${text}{enter}`)
          cy.contains(text)
        })
    })
  },
) // end of describe
