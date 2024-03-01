// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
  cy.on('uncaught:exception', () => false)

  cy.get('#signInFormUsername').type(email, { force: true })
  // lets try an incorrect password
  cy.get('#signInFormPassword').type(`${password}{enter}`, { force: true })
})

Cypress.Commands.add('_login', () => {
  cy.visit(`${Cypress.env('baseUrl')}`)
  cy.contains('Sign in').click()
  cy.origin('https://fpcc-dev.auth.ca-central-1.amazoncognito.com', () => {
    cy.contains('Sign in with your email and password').should('exist')
    cy.login(
      Cypress.env('CYPRESS_FV_USERNAME'),
      Cypress.env('CYPRESS_FV_PASSWORD'),
    )
  })

  cy.contains('Explore Languages').click()
})

Cypress.Commands.add('checkLinks', (links, section) => {
  for (let i = 0; i < links.length; i += 1) {
    // loop through the dictionary menu from the array above here.

    cy.contains(section).click()

    cy.contains(links[i]).click()
  }
})

Cypress.Commands.add('checkHeaderCSS', (fontWeightStrength) => {
  cy.get('[id="SingleSelect-sort"] > div > button > span').should(
    'have.css',
    'font-weight',
    `${fontWeightStrength[0]}`,
  )
  cy.get('[id="SingleSelect-hasAudio"] > div > button > span').should(
    'have.css',
    'font-weight',
    `${fontWeightStrength[1]}`,
  )
  cy.get('[id="SingleSelect-hasImage"] > div > button > span').should(
    'have.css',
    'font-weight',
    `${fontWeightStrength[2]}`,
  )
  cy.get('[id="SingleSelect-hasVideo"] > div > button > span').should(
    'have.css',
    'font-weight',
    `${fontWeightStrength[3]}`,
  )
  cy.get('[id="SingleSelect-hasTranslation"] > div > button > span').should(
    'have.css',
    'font-weight',
    `${fontWeightStrength[4]}`,
  )
  cy.get('[id="SingleSelect-visibility"] > div > button > span').should(
    'have.css',
    'font-weight',
    `${fontWeightStrength[5]}`,
  )
})

Cypress.Commands.add('middlestuff', (_translationwp) => {
  cy.contains(_translationwp).click()
  cy.get('[name="translations.0.text"]').type(
    'an individual who fought for a warrior challenging a ruling of the Klingon High Council',
  )

  cy.contains('Add audio').click()
  cy.get('.table-fixed > .bg-white > :nth-child(1) > :nth-child(1)').click() // FW-5205
  cy.contains('Insert 1 Audio').click()

  cy.contains('Add category').click()
  cy.get('.text-left > .flex-col > :nth-child(1) > :nth-child(1)').click() // FW-5205
  cy.contains('Add Category').click()

  cy.contains('Add notes').click()
  cy.get('[name="notes.0.text"]').type('this is so note worthy!!!')

  cy.contains('Next step').click()

  cy.contains('Next step').click()
  cy.contains('Finish').click()
  cy.contains('Dismiss').click()
})

Cypress.Commands.add('checkValidation', (widgetName) => {
  cy.contains(widgetName).click()
  cy.contains('Create widget').click()
  cy.get('.text-red-500').should('exist')
  cy.contains('Go back').click()
})

Cypress.Commands.add('deletePage', (name) => {
  cy.contains(name).parent().children().eq(3).children().click()
  cy.contains('Edit Page Header').click()
  cy.get('#title').should('contain.value', name)
  cy.contains('Delete Page').click()
  cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
})

Cypress.Commands.add('createwidget', (name) => {
  const widgetname = 'testwidgetcypress'
  cy.visit(
    `${Cypress.env('baseUrl')}${Cypress.env(
      'DIALECT',
    )}/dashboard/create/widget`,
  )
  cy.contains(name).should('be.enabled')
  cy.contains(name).click({ force: true })
  cy.get('#nickname').type(widgetname)
})

Cypress.Commands.add('throughme', (name) => {
  cy.contains('Create widget').should('be.visible')
  cy.contains('Create widget').click({ force: true })
  cy.contains('Dismiss').click()
  cy.contains(name).parent().children().eq(2).children().click()

  cy.get('#nickname').should('contain.value', name)

  cy.contains('Delete widget').click()
  cy.get('[data-testid="DeleteModal"]').contains('Delete').click()

  cy.contains('Success').should('not.exist')
  cy.contains('Dashboard').click()
})
