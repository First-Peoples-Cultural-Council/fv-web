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

Cypress.Commands.add('quickLogin', (email, password) => {
  cy.request({
    method: 'POST',
    url: '/nuxeo/startup',
    form: true,
    body: {
      email,
      password,
      language: 'en',
      requestedUrl: 'nxstartup.faces',
      forceAnonymousLogin: '',
      form_submitted_marker: '',
      Submit: 'Log In',
    },
  })
})

Cypress.Commands.add('checkLinks', (links, section) => {
  for (let i = 0; i < links.length; i += 1) {
    // loop through the dictionary menu from the array above here.

    cy.contains(section).click()

    cy.contains(links[i]).click()
  }
})
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
