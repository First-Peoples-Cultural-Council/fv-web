describe('Word testing', { defaultCommandTimeout: 8000 }, () => {
  beforeEach(() => {
    cy.viewport(1024, 768)
  })

  it('Word Page load', () => {
    cy.visit(`${Cypress.env('baseUrl')}`)
    cy.contains('Sign in').click()
    cy.login(
      Cypress.env('CYPRESS_FV_USERNAME'),
      Cypress.env('CYPRESS_FV_PASSWORD'),
    )

    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)

    cy.contains('Dictionary').click()
    cy.contains('Words').click()
  })

  it('Word Page - check page areas', () => {
    cy.visit(`${Cypress.env('baseUrl')}`)
    cy.contains('Sign in').click()
    cy.login(
      Cypress.env('CYPRESS_FV_USERNAME'),
      Cypress.env('CYPRESS_FV_PASSWORD'),
    )
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)

    cy.contains('Dictionary').click()
    cy.contains('Words').click()

    cy.get('[data-testid="SearchInput"]').should('exist')
    cy.get('#SearchSubmit').should('exist')
    cy.contains('WORDS').should('exist')
    cy.contains('BROWSE BY')
    cy.contains('Categories')
    cy.contains('Alphabet')
    cy.contains('Phrases')
    cy.contains('WORD')
    cy.contains('Translation')
  })

  it('Get first word and search for it', () => {
    // i moved the visit from outside of beforeEach so i don't have to get it to log in on every it test
    cy.on('uncaught:exception', () => false)
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(500)
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

  it('Check out word drawer', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)

    cy.contains('Dictionary').as('dicti')
    cy.get('@dicti').click()
    cy.contains('Words').click()
    cy.get('table tr td button', { timeout: 10000 }).first().click() // drawer should be open now

    cy.get('[data-testid=DictionaryDetailPresentationDrawer]').should(
      'be.visible',
    )
    cy.contains('MORE')
    cy.contains('MORE').click()
    cy.contains('SHARE')
    cy.contains('SHARE').click()
    cy.contains('Cancel').click()
    cy.contains('MORE').click()
    cy.contains('QR CODE')
    cy.contains('QR CODE').click()
    cy.contains('Cancel').click()
  })

  it('check out a sound clip', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)

    cy.contains('Dictionary').as('dicti')
    cy.get('@dicti').click()

    cy.contains('Words').as('wordy')
    cy.get('@wordy').click()

    cy.get('table tr td svg:first').click()

    cy.get('#CloseAudiobar').click()
  })

  it('checking initial dataset', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)

    cy.contains('Dictionary').click()
    cy.wait(500)
    cy.contains('Words').click()
    cy.wait(2000)
    cy.get('table tr td button:first')
      .invoke('text')
      .then((_text) => {
        cy.get('[data-testid="SearchInput"]').type(`${_text}{enter}`)
        cy.contains('Clear Search').click()
        cy.contains(_text).should('exist')
      })
    cy.log('fails on purpose, will pass once fixed')
  })

  it.skip('loop down', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)

    cy.contains('Dictionary').click()
    cy.wait(500)
    cy.contains('Words').click()

    for (let i = 0; i < 45; i += 1) {
      cy.window().scrollTo('bottom')
      cy.log(`loop ${i}`)
      cy.wait(1000)
    }
    cy.window().scrollTo('top')
  })

  it('Words to categories', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)

    cy.contains('Dictionary').click()
    cy.wait(500)
    cy.contains('Words').click()
    cy.wait(2000)

    cy.contains('Categories').click()
    cy.contains('CATEGORIES').should('exist')
  })

  it('Words to Alphabet', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)

    cy.contains('Dictionary').click()
    cy.wait(500)
    cy.contains('Words').click()
    cy.wait(2000)

    cy.contains('Alphabet').click()
    cy.contains('ALPHABET').should('exist')
  })

  it('Words to Phrases', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)

    cy.contains('Dictionary').click()
    cy.wait(500)
    cy.contains('Words').click()
    cy.wait(2000)

    cy.contains('Phrases').click()
    cy.contains('PHRASES').should('exist')
  })
}) // end of describe
