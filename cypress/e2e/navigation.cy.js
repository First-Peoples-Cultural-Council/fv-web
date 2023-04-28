describe('V2 tests, word and phrase', () => {
  beforeEach(() => {
    cy.viewport(1200, 1200)
    cy.visit(`${Cypress.env('baseUrl')}/${Cypress.env('DIALECT')}`)
  })

  it('Check Dictionary Menu ', () => {
    // i moved the visit from outside of beforeEach so i don't have to get it to log in on every it test
    cy.on('uncaught:exception', () => false)

    const dictionaryMenu = ['Words', 'Phrases', 'Alphabet', 'Categories']
    cy.checkLinks(dictionaryMenu, 'Dictionary')
  })

  it('Check Learn Menu ', () => {
    cy.on('uncaught:exception', () => true)

    // used to be login code here like in the above it function. add back here if needed.  and the first visit should be put back to beforeEach
    const learnMenu = ['Songs', 'Stories', 'Games']
    cy.checkLinks(learnMenu, 'Learn')
  })

  it('Check Resources Menu ', () => {
    cy.on('uncaught:exception', () => true)

    const resourcesMenu = ['Mobile App', 'Keyboards']
    cy.checkLinks(resourcesMenu, 'Resources')
  })

  it('Check About Menu ', () => {
    cy.on('uncaught:exception', () => true)
    // Used to be login code here like in the above it function. add back here if needed.  and the first visit should be put back to beforeEach
    const aboutMenu = ['Our Language', 'Our People']
    cy.wait(1000)
    cy.checkLinks(aboutMenu, 'About')
  })

  it('check Help', () => {
    //   cy.contains('Help').click()
  })

  it('check Donate', () => {
    //  cy.contains('Donate').click()
  })
}) // end of describe
