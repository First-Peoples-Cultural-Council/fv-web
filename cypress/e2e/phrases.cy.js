function _login() {
  cy.visit(`${Cypress.env('baseUrl')}/nuxeo/login.jsp`)
  cy.login(
    Cypress.env('CYPRESS_FV_USERNAME'),
    Cypress.env('CYPRESS_FV_PASSWORD'),
  )
  cy.visit(`${Cypress.env('baseUrl')}/${Cypress.env('DIALECT')}`)
}

function _menunav() {
  cy.contains('Dictionary', { timeout: 12000 }).click()
  cy.contains('Phrases', { timeout: 12000 }).click()
}
describe('Phrase testing', () => {
  beforeEach(() => {
    cy.viewport(1024, 768)
  })

  it('Phrase Page load', () => {
    _login()

    _menunav()
  })

  it('Phrase Page - check page areas', () => {
    _login()

    _menunav()

    cy.get('[data-testid="SearchInput"]', { timeout: 10000 })
    cy.get('#SearchSubmit', { timeout: 10000 })
    cy.contains('PHRASES')
    cy.contains('BROWSE BY')
    cy.contains('Categories')
    cy.contains('Alphabet')
    cy.contains('PHRASE', { timeout: 12000 })
    cy.contains('TRANSLATION')
  })

  it('Get first Phrase and search for it', () => {
    // i moved the visit from outside of beforeEach so i don't have to get it to log in on every it test
    cy.on('uncaught:exception', () => false)

    cy.visit(`${Cypress.env('baseUrl')}/${Cypress.env('DIALECT')}`)
    cy.wait(1000)
    _menunav()
    cy.wait(1000)
    cy.get('table tr td button')
      .first()
      .invoke('text')
      .then((text) => {
        cy.get('[data-testid=SearchInput').type(`${text}{enter}`)
        cy.contains(text)
      })
  })

  it('Check out Phrase drawer', () => {
    cy.visit(`${Cypress.env('baseUrl')}/${Cypress.env('DIALECT')}`)

    _menunav()
    cy.wait(2000)

    cy.get(':nth-child(1) > .flex > .text-left').click()
    cy.get('[data-testid=DictionaryDetailPresentationDrawer]').should(
      'be.visible',
    )

    cy.contains('MORE', { timeout: 12000 }).click()

    cy.contains('SHARE', { timeout: 12000 }).click()
    cy.contains('Cancel', { timeout: 12000 }).click()
    cy.contains('MORE', { timeout: 12000 }).click()

    cy.contains('QR CODE', { timeout: 12000 }).click()
    cy.contains('Cancel').click()
  })
}) // end of describe
