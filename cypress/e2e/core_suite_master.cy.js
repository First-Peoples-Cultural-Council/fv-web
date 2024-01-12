/// <reference types="cypress" />

function middlestuff(_translationwp) {
  cy.contains(_translationwp).click()
  cy.get('[name="translations.0.text"]').type(
    'an individual who fought for a warrior challenging a ruling of the Klingon High Council',
  )

  cy.contains('Add audio').click()
  cy.get('.table-fixed > .bg-white > :nth-child(1) > :nth-child(1)').click() // FW-5205
  cy.contains('Insert 1 Audio').click()

  cy.contains('Add categories').click()
  cy.get('.text-left > .flex-col > :nth-child(1) > :nth-child(1)').click() // FW-5205
  cy.contains('Add Category to document').click()

  cy.contains('Add notes').click()
  cy.get('[name="notes.0.text"]').type('this is so note worthy!!!')

  cy.contains('Next step').click()

  cy.contains('Next step').click()
  cy.contains('Finish').click()
  cy.contains('Dismiss').click()
  // cy.get('[data-testid="DashboardPresentationEdit"]').click()
  // cy.contains('Edit words').click()
}

function _login() {
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
}

function checkValidation(widgetName) {
  cy.contains(widgetName).click()
  cy.contains('Create widget').click()
  cy.get('.text-red-500').should('exist')
  cy.contains('Go back').click()
}

function randomString(length, chars) {
  let result = ''
  for (let i = length; i > 0; i -= 1)
    result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

function deletePage(name) {
  cy.contains(name).parent().children().eq(3).children().click()
  cy.contains('Edit Page Header').click()
  cy.get('#title').should('contain.value', name)
  cy.contains('Delete Page').click()
  cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
}

function createwidget(name) {
  cy.log(name)
  const widgetname = 'testwidgetcypress'
  cy.get('[href="/lilwat/dashboard/create"]').click()
  cy.contains('Create a widget').click()
  cy.contains(name).click()
  cy.get('#nickname').type(widgetname)
}

function throughme(name) {
  cy.contains('Create widget').should('be.visible')
  cy.contains('Create widget').click({ force: true })
  cy.contains('Dismiss').click()
  // cy.get('[data-testid="DashboardPresentationEdit"]').click()
  // cy.contains('Edit widgets').click()

  cy.contains(name).parent().children().eq(2).children().click()

  cy.get('#nickname').should('contain.value', name)

  cy.contains('Delete widget').click()
  cy.get('[data-testid="DeleteModal"]').contains('Delete').click()

  cy.contains('Success').should('not.exist')
  cy.contains('Dashboard').click()
}

describe('log in/out', () => {
  beforeEach(() => {
    cy.viewport(1024, 768)
    cy.on('uncaught:exception', () => false)
    cy.origin('https://fpcc-dev.auth.ca-central-1.amazoncognito.com', () => {
      Cypress.require('../support/commands')
    })
  })

  it('1.1 - signin/signout', () => {
    _login()

    cy.reload()
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').should('exist')
    cy.contains('Sign out', { timeout: 12000 }).click()
  })

  it('1.2 - signin - no redirect', () => {
    cy.visit(`${Cypress.env('baseUrl')}`)
    cy.contains('Sign in').click()

    cy.origin('https://fpcc-dev.auth.ca-central-1.amazoncognito.com', () => {
      cy.contains('Sign in with your email and password', {
        timeout: 10000,
      }).should('be.visible')
    })
  })

  it('1.3 - signin - browser back', () => {
    cy.visit(`${Cypress.env('baseUrl')}`)
    cy.contains('Sign in').click()
    cy.origin('https://fpcc-dev.auth.ca-central-1.amazoncognito.com', () => {})
    cy.origin('https://fpcc-dev.auth.ca-central-1.amazoncognito.com', () => {
      cy.contains('Sign in with your email and password')
    })

    cy.go('back')
    cy.contains('Sign in')
  })

  it('2.0/2.1 - Check widget validation', () => {
    _login()
    cy.reload()
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()
    const widgets = [
      'Page Text',
      'Logo',
      'Quotes',
      'Text With Image',
      'Short Text',
    ]
    cy.contains('Create a widget').click()
    widgets.forEach(checkValidation)

    cy.contains('Cancel').click()
    cy.contains('Edit custom pages').click()
    cy.contains('Create a Custom Page').click()
    cy.contains('Create page').click()
    cy.contains('title must be at least 1 characters').should('exist')
  })

  it('2.2 - Create Page', () => {
    _login()

    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()
    cy.contains('Edit custom pages').click()
    cy.contains('Create a Custom Page').click()
    cy.contains('Create page').click()

    cy.contains('title must be').should('exist')
    cy.contains('Please enter a URL').should('exist')

    const rString = randomString(
      17,
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    )
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()
    cy.contains('Edit custom pages').click()
    cy.contains('Create a Custom Page').click()

    cy.get('#title').type('testQApage')
    cy.get('#subtitle').type(Cypress._.uniqueId('Subtitle_'))
    cy.get('#slug').type(rString)

    cy.contains('Create page').click()
    deletePage('testQApage')
  })

  const subwidgets = ['Logo', 'Page Text', 'Text With Image', 'Short Text']
  it(`2.3 - Create widgets`, () => {
    _login()
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()
    subwidgets.forEach((_widget) => {
      createwidget(_widget)
      if (_widget === 'Mobile App') {
        cy.get('#androidUrl').type('https://www.google.ca/')
        cy.get('#iosUrl').type('https://www.google.ca/')
      } else if (_widget === 'Gallery') {
        cy.get('#galleryId').type('f0083daa-2988-4144-be17-34cd8fb288c9')
      } else if (_widget === 'Keyboard') {
        cy.get('#macUrl').type('https://www.google.ca/')
        cy.get('#windowsUrl').type('https://www.google.ca/')
      } else if (
        _widget === 'Text With Image' ||
        _widget === 'Text with Icons'
      ) {
        cy.get('#title').type('test')
        cy.get('.public-DraftStyleDefault-block').type('subtitle text')
      } else if (_widget === 'Short Text') {
        cy.get('#title').type('text title test')
        cy.get('#text').type('subtitle text')
        cy.get('#url').type('https://www.google.ca/')
        cy.get('#urlLabel').type('url label')
      } else if (_widget === 'Page Text') {
        cy.get('.public-DraftStyleDefault-block').type('subtitle text')
      }
      throughme('testwidgetcypress')
    })
  })

  it.skip('2.4 - view new page, widget', () => {
    _login()
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()
    cy.contains('Create a widget').click()
    cy.contains('Logo').click()
    cy.get('#nickname').type('qatest')
    cy.contains('Create widget').click()
    cy.contains('Dismiss').click()
    cy.contains('Success').should('not.exist')
    cy.get('[href="/lilwat/dashboard/create"]').click()
    cy.contains('Add a new page to your site').should('exist')
    cy.contains('Create a custom page').click()
    cy.contains('Create page').should('exist')
    cy.contains('Enter the details').should('exist')

    cy.get('#title').should('be.enabled')
    cy.get('#title').type('qatestpage', { force: true })
    cy.get('#subtitle').type('qasubtitle')
    cy.get('#slug').type('qatesturllink')
    cy.contains('Create page').click()
    cy.contains('qatestpage').parent().children().eq(3).children().click()

    cy.contains('Widget').click()
    cy.contains('Name: qatest').click()
    cy.contains('OK').click()

    cy.visit(
      `${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}/custom/qatesturl`,
    )
    cy.get('.object-cover').should('exist')
    cy.contains('qatestpage').should('exist')
    cy.go(-1)
    cy.contains('Edit Page Header').click()
    cy.contains('Delete Page').click()
    cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
    cy.contains('Success').should('not.exist')
    cy.get('[href="/lilwat/dashboard/edit"]').click()

    cy.contains('Edit widgets').click()

    cy.contains('qatest')

      .parent()
      .children()
      .eq(2)
      .children()
      .click()

    cy.get('#nickname').should('contain.value', 'qatest')

    cy.contains('Delete widget').click()
    cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
  })

  it('2.6 - view media', () => {
    _login()

    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()

    cy.contains('Media').click()
    cy.contains('Audio').click()
    cy.contains('Download')
    cy.go(-1)
    cy.contains('Manage your images').parent().click()
    cy.contains('Download')
    cy.go(-1)
    cy.contains('Manage your videos').parent().click()
    cy.contains('Download')
  })

  it('3.0 edit words phrases', () => {
    _login()

    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()
    cy.contains('Edit').click()
    cy.contains('Edit words').click()

    cy.get('.bg-white > :nth-child(1) > .text-left').click() // FW-5206
    cy.get('a > .inline-flex').click()
    cy.contains('Save changes').click()
  })

  it.skip('3.1 edit homepage', () => {
    _login()
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()
    cy.contains('Edit').click()
    cy.contains('Edit Homepage').click()
    cy.contains('Edit Banner and Logo').click()
    cy.contains('Save Changes').click()
    cy.scrollTo('top')
    cy.get(':nth-child(1) > .p-2 >').trigger('dragstart', { force: true })
    cy.get(':nth-child(2) > .p-2 >').trigger('drop', { force: true })
    //   .trigger('mouseover')
    //   .trigger('mousedown', { which: 1, force: true })
    //   .trigger('mousemove', {
    //     clientX: 276,
    //     clientY: 339,
    //     screenX: 276,
    //     screenY: 339,
    //     pageX: 276,
    //     pageY: 339,
    //   })
    //   .trigger('mouseup', { force: true, which: 1 })
  })

  it('4.0 - site nav - dictionary', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.contains('Dictionary').click()
    cy.contains('Words').click()
    cy.contains('WORDS').should('exist')

    cy.contains('Dictionary').click()
    cy.contains('Phrases').click()
    cy.contains('PHRASES').should('exist')
    cy.contains('Dictionary').click()
    cy.contains('Categories').click()
    cy.contains('CATEGORIES').should('exist')

    cy.contains('Dictionary').click()
    cy.contains('Alphabet').click()
    cy.contains('ALPHABET').should('exist')
  })

  it('4.1 - custom page', () => {
    const site = `${Cypress.env('baseUrl')}${Cypress.env(
      'DIALECT',
    )}/custom/qacustompage`
    cy.visit(`${Cypress.env('baseUrl')}`)
    cy.contains('Sign in').click()

    cy.login(
      Cypress.env('CYPRESS_FV_USERNAME'),
      Cypress.env('CYPRESS_FV_PASSWORD'),
    )
    cy.contains('Explore Languages').should('be.visible')
    cy.visit(site)
    cy.contains('403').should('not.exist')
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Sign out').click()
    cy.visit(site)
    cy.contains('403').should('exist')
  })

  it('5.1 - Check out word drawer', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)

    cy.contains('Dictionary').click()
    cy.contains('Words').click()
    cy.get('table tr td button', { timeout: 10000 }).first().click() // drawer should be open now

    cy.get('[data-testid=DictionaryDetailPresentationDrawer]').should(
      'be.visible',
    )

    cy.contains('MORE').click()

    cy.contains('SHARE').click()
    cy.contains('Cancel').click()
    cy.contains('MORE').scrollIntoView()
    cy.contains('MORE').click()

    cy.contains('QR CODE').click()
    cy.contains('Cancel').click()
  })

  it('7.1 - create word', () => {
    cy.on('uncaught:exception', () => false)
    cy.viewport(1024, 768)
    cy.visit(`${Cypress.env('baseUrl')}`)
    cy.contains('Sign in').click()
    cy.login(
      Cypress.env('CYPRESS_FV_USERNAME'),
      Cypress.env('CYPRESS_FV_PASSWORD'),
    )

    cy.contains('Explore Languages').click()
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()
    cy.contains('Create').click()
    const name = `cha'Dich${new Date().getTime()}`
    cy.contains('Create a word').click()
    cy.contains('Finish').click()
    cy.get('#title').type(name)
    middlestuff('Add word translation')
    cy.get('[data-testid="SearchInput"]').type(`${name}{enter}`)
    cy.contains(name).click()
    cy.get('a > .inline-flex > span').click()
    cy.contains('Delete word').click()
    cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
  })

  it('8.1 - create phrase', () => {
    cy.on('uncaught:exception', () => false)
    cy.viewport(1024, 768)
    cy.visit(`${Cypress.env('baseUrl')}`)
    cy.contains('Sign in').click()
    cy.login(
      Cypress.env('CYPRESS_FV_USERNAME'),
      Cypress.env('CYPRESS_FV_PASSWORD'),
    )

    cy.contains('Explore Languages').click()

    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()
    cy.contains('Create').click()
    const name = `cha'DIch${new Date().getTime()}`
    cy.contains('Create a phrase').click()
    cy.contains('Finish').click()
    cy.get('#title').type(name)
    middlestuff('Add phrase translation')
    cy.contains('PHRASES').click()
    cy.get('#SearchInput').type(`${name}{enter}`)
    cy.contains(name).click()
    cy.get('a > .inline-flex > span').click()
    cy.contains('Delete phrase').click()
    cy.get('[data-testid="DeleteModal"]').contains('Delete').click()
  })

  it('9.1 - Get first word and search for it', () => {
    // i moved the visit from outside of beforeEach so i don't have to get it to log in on every it test
    cy.on('uncaught:exception', () => false)
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
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

  it('9.2 - Get first Phrase and search for it', () => {
    // i moved the visit from outside of beforeEach so i don't have to get it to log in on every it test
    cy.on('uncaught:exception', () => false)

    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)

    cy.contains('Dictionary', { timeout: 12000 }).click()
    cy.contains('Phrases', { timeout: 12000 }).click()

    cy.get('table tr td button')
      .first()
      .invoke('text')
      .then((text) => {
        cy.get('[data-testid=SearchInput').type(`${text}{enter}`)
        cy.contains(text)
      })
  })

  it('10.1 - Click on stories grid view', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.contains('Learn').click()
    cy.contains('Stories').click()
    cy.get('ul li', { timeout: 10000 }).each((_song) => {
      cy.wrap(_song).click()
      cy.contains('Go to Story', { timeout: 12000 })
      cy.get('#CloseDrawerBtn').click()
      cy.contains('Go to Story').should('not.exist')
    })
  })

  it('10.2 - Check list view', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.contains('Learn').click()
    cy.contains('Stories').click()
    cy.contains('Use list view').click()
    cy.get('.pb-16 > .w-full >', { timeout: 10000 }).each((_song) => {
      cy.wrap(_song).should('be.enabled')
      cy.wrap(_song).click()
      cy.contains('Go to Story')
      cy.get('#CloseDrawerBtn').click()
    })
  })

  it('10.3 - Click on songs grid view', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.contains('Learn').click()
    cy.contains('Songs').click()
    cy.get('ul li').each((_song) => {
      cy.wrap(_song).click()

      cy.contains('Go to Song', { timeout: 12000 })
      cy.get('#CloseDrawerBtn').click()
    })
  })

  it('10.4 - Check list view songs', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.contains('Learn').click()
    cy.contains('Songs').click()
    cy.contains('Use list view').click()
    cy.get('.pb-16 > .w-full >').each((_song) => {
      cy.wrap(_song).scrollIntoView()
      cy.wrap(_song).click()
      cy.wrap(_song).should('be.enabled')
      cy.contains('Go to Song')
      cy.get('#CloseDrawerBtn').click()
    })
  })

  it('12.1 - alphabet', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.contains('ALPHABET').should('exist')
    cy.get(
      '[data-testid="AlphabetPresentationSelected__header"] button',
    ).should('have.length', 2)
  })

  it('12.2 - Page Text', () => {
    cy.visit(`${Cypress.env('baseUrl')}`)
    cy.contains('Sign in').click()
    cy.login(
      Cypress.env('CYPRESS_FV_USERNAME'),
      Cypress.env('CYPRESS_FV_PASSWORD'),
    )
    cy.contains('Explore Languages').click()
    cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
    cy.contains('Dashboard').click()
    cy.contains('Edit homepage').click()
    cy.contains('Page Text').should('not.exist')
  })

  it.skip('14.1 - Visit kids dictionary', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.contains('Kids').click()
    cy.contains('Dictionary').click()
    cy.contains('404').should('not.exist')
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
    cy.contains('Kids').click()
    cy.contains('Alphabet').click()
    cy.contains(' 404').should('not.exist')
    cy.contains('See all words').click()
    cy.contains(' 404').should('not.exist')
    cy.get('a[data-testid^="SearchFilter"]').each((letter) => {
      cy.get(letter).click()
      cy.contains(' 404').should('not.exist')
      cy.contains('Loading...').should('not.exist')
    })
  })

  it('14.3 - visit kids categories', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.contains('Kids').click()
    cy.contains('Categories').click()
    cy.contains(' 404').should('not.exist')
  })

  it('14.4 - visit kids games', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.contains('Kids').click()
    cy.contains('Games').click()
    cy.contains(' 404').should('not.exist')
  })

  it('14.5 - visit kids songs', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.contains('Kids').click()
    cy.contains('Songs').click()
    cy.contains(' 404').should('not.exist')
  })

  it('14.6 - visit kids stories', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.contains('Kids').click()
    cy.contains('Stories').click()
    cy.contains(' 404').should('not.exist')
  })

  it('14.7 kids search', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
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
}) // EOD
