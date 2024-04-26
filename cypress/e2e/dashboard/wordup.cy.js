/// <reference types="cypress" />

describe(
  'word Test',
  {
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
  () => {
    beforeEach(() => {
      Cypress.Commands.add('middlestuff', (_translationwp) => {
        cy.contains(_translationwp).click()
        cy.get('[name="translations.0.text"]').type(
          'an individual who fought for a warrior challenging a ruling of the Klingon High Council',
        )

        cy.contains('Next step').click()

        cy.contains('Next step').click()
        cy.contains('Finish').click()
        cy.contains('Dismiss').should('not.exist')
      })
      cy.on('uncaught:exception', () => false)
      cy.viewport(1024, 768)
      cy.visit(`${Cypress.env('baseUrl')}`)
      cy.contains('Sign in').click()
      cy.visit(`${Cypress.env('CYPRESS_ORIGIN')}`, () => {
        Cypress.Commands.add('login', (email, password) => {
          cy.on('uncaught:exception', () => false)

          cy.get('#signInFormUsername').type(email, { force: true })
          // lets try an incorrect password
          cy.get('#signInFormPassword').type(`${password}{enter}`, {
            force: true,
          })
        })

        cy.login(
          Cypress.env('CYPRESS_FV_USERNAME'),
          Cypress.env('CYPRESS_FV_PASSWORD'),
        )
      })
    })

    it.only('3.0 edit words phrases', () => {
      cy.contains('Explore Languages').click()
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').click()
      cy.contains('Edit').click()
      cy.contains('Edit words').click()

      cy.get('.bg-white > :nth-child(1) > .text-left').click() // FW-5206
      cy.get('[data-testid="EntryDrawerEdit"]').invoke('removeAttr', 'target')
      cy.get('[data-testid="EntryDrawerEdit"]').click()
      cy.contains('Save changes').click()
    })

    const name = `cha'Dichqaqa`
    it.only('7.1 - create word', () => {
      cy.on('uncaught:exception', () => false)
      cy.viewport(1024, 768)

      cy.contains('Explore Languages').click()
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').click()
      cy.contains('Create').click()

      cy.contains('Create a word').click()
      cy.contains('Finish').click()
      cy.get('#title').type(name)
      cy.middlestuff('Add word translation')
      cy.get('div[id="NavUser"] button').click()
      cy.contains('Sign out').click()
    })

    it('7.1a - delete word', () => {
      cy.contains('Explore Languages').click()
      cy.get('div[id="NavUser"] button').click()
      cy.contains('Dashboard').click()
      cy.contains('Edit words and phrases').click()
      cy.get('[data-testid="SearchInput"]').type(`${name}{enter}`)
      cy.contains(name).click()
      cy.get('[data-testid="EntryDrawerEdit"]').invoke('removeAttr', 'target')
      cy.get('[data-testid="EntryDrawerEdit"]').click()
      cy.contains('Delete word').click()
      cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
    })

    it.skip('Create n edit page', () => {
      const name2 = 'testpage11111'
      cy.contains('Create a Custom Page').click()
      cy.get('#title').type(name2)
      cy.get('#subtitle').type('random12342')
      cy.get('#slug').type('testcreatepage')
      cy.contains('Create page').click()

      cy.contains('Widget').click()
      cy.contains('Alphabet').click()
      cy.contains('OK').click()

      const widgets = [
        'Mobile App',
        'Contact Us',
        'New This Week',
        'Text With Image',
        'Word of the Day',
      ]

      widgets.forEach((_widgets) => {
        cy.get('.flex-1 > :nth-child(1) > .justify-between > .flex').click()
        cy.contains(_widgets).click()
        cy.contains('OK').click()
      })

      cy.deletePage(name)
    })
  },
) // end of describe
