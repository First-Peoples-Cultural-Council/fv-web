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
  cy.on('uncaught:exception', (err, runnable) => {
    return false
  })

  cy.get('#username').type(email)
  //lets try an incorrect password
  cy.get('input[name=user_password]').type(password + '{enter}')
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
  for (var i = 0; i < links.length; i++) {
    //loop through the dictionary menu from the array above here.
    //cy.get('#MobileMenuButton').click()
    cy.wait(1000)
    cy.contains(section, { timeout: 12000 }).click()
    cy.wait(1000)
    cy.contains(links[i], { timeout: 10000 }).click()
    cy.wait(1000)
    // cy.contains('Bad Request').should('not.exist')
    cy.wait(1000)
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
