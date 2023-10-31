/// <reference types="cypress" />

function middlestuff() {
  cy.contains('Add Translation').click()
  cy.get('.justify-between > .w-full').type(
    'an individual who fought for a warrior challenging a ruling of the Klingon High Council',
  )

  cy.contains('Add audio').click()
  cy.get('.table-fixed > .bg-white > :nth-child(1) > :nth-child(1)').click()
  cy.contains('Insert 1 Audio').click()

  cy.contains('Add Categories').click()
  cy.wait(4000)
  cy.get('.text-left > .flex-col > :nth-child(1) > :nth-child(1)').click()
  cy.contains('Add Category to document').click()

  cy.contains('Add Note').click()
  cy.get(
    ':nth-child(6) > .mt-2 > .space-y-2 > li > .justify-between > .w-full',
  ).type('this is so note worthy!!!')

  cy.contains('Next Step').click()
  cy.wait(2000)
  cy.contains('Next Step').click()
  cy.contains('Finish').click()
  cy.wait(2000)
  cy.contains('Edit').click()
  cy.wait(1000)
  cy.contains('Edit Words').click()
}

function _login() {
  cy.visit(`${Cypress.env('baseUrl')}`)
  cy.contains('Sign in').click()
  cy.wait(2000)
  cy.login(
    Cypress.env('CYPRESS_FV_USERNAME'),
    Cypress.env('CYPRESS_FV_PASSWORD'),
  )
  cy.wait(3000)
  cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
}

function checkValidation(widgetName) {
  cy.contains(widgetName).click()
  cy.contains('Create Widget').click()
  cy.get('.text-red-500').should('exist')
  cy.contains('Go Back').click()
}

function randomString(length, chars) {
  let result = ''
  for (let i = length; i > 0; i -= 1)
    result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

function deletePage(name) {
  cy.wait(3000)
  cy.contains(name)
    .scrollIntoView()
    .parent()
    .children()
    .eq(3)
    .children()
    .click()
  cy.contains('Edit Page Header').click()
  cy.get('#title').should('contain.value', name)
  cy.contains('Delete Page').click()
  cy.get('#RemoveWidgetModalContent').contains('Delete').click()
}

function createwidget(name) {
  const widgetname = 'testwidgetcypress'
  cy.contains('Create').click()
  cy.contains('Create a Widget').click()
  cy.contains(name).click()
  cy.wait(3000)
  cy.get('#nickname').type(widgetname)
}

function throughme(name) {
  cy.wait(1000)
  cy.contains('Create Widget').should('be.visible')
  cy.contains('Create Widget').click({ force: true })
  cy.wait(4000)
  cy.get('[href="/lilwat/dashboard/edit"]').click()
  cy.wait(1000)
  cy.contains('Edit Widgets').click()

  cy.contains(name)
    .scrollIntoView()
    .parent()
    .children()
    .eq(2)
    .children()
    .click()

  cy.get('#nickname').should('contain.value', name)
  cy.wait(1500)
  cy.contains('Delete Widget').click()
  cy.get('#RemoveWidgetModalContent').contains('Delete').click()
  cy.wait(3000)
}

describe('log in/out', () => {
  beforeEach(() => {
    cy.viewport(1024, 768)
    cy.on('uncaught:exception', () => false)
  })

  it('1.1 - signin/signout', () => {
    _login()
    cy.wait(1000)
    cy.reload()
    cy.contains('cf').click()
    cy.wait(1500)
    cy.contains('Dashboard').should('exist')
    cy.contains('Sign out', { timeout: 12000 }).click()
  })

  it('1.2 - signin - no redirect', () => {
    cy.visit(`${Cypress.env('baseUrl')}`)
    cy.contains('Sign in').click()
    cy.contains('Sign in with your email and password')
  })

  it('1.3 - signin - browser back', () => {
    cy.visit(`${Cypress.env('baseUrl')}`)
    cy.contains('Sign in').click()
    cy.contains('Sign in with your email and password')
    cy.go('back')
    cy.contains('Sign in')
  })

  it('2.0/2.1 - Check widget validation', () => {
    _login()
    cy.wait(1000)
    cy.reload()
    cy.contains('cf').click()
    cy.wait(1500)
    cy.contains('Dashboard').click()
    const widgets = [
      'Page Text',
      'Logo',
      'Quotes',
      'Text With Image',
      'Short Text',
    ]
    cy.contains('Create a Widget').click()
    widgets.forEach(checkValidation)

    cy.contains('Cancel').click()
    cy.contains('Custom Pages').click()
    cy.contains('Create a Custom Page').click()
    cy.contains('Create Page').click()
    cy.contains('title must be at least 1 characters').should('exist')
  })

  it('2.2 - Create Page', () => {
    _login()

    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(500)
    cy.contains('cf').click()
    cy.contains('Dashboard').click()
    cy.contains('Custom Pages').click()
    cy.contains('Create a Custom Page').click()
    cy.contains('Create Page').click()

    cy.contains('title must be').should('exist')
    cy.contains('Please enter a URL').should('exist')

    const rString = randomString(
      17,
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    )
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(500)
    cy.contains('cf').click()
    cy.contains('Dashboard').click()
    cy.contains('Custom Pages').click()
    cy.contains('Create a Custom Page').click()

    cy.get('#title').type('testQApage')
    cy.get('#subtitle').type(Cypress._.uniqueId('Subtitle_'))
    cy.get('#slug').type(rString)

    cy.contains('Create Page').click()
    deletePage('testQApage')
  })

  const subwidgets = ['Logo', 'Page Text', 'Text With Image', 'Short Text']
  it(`2.3 - Create widgets`, () => {
    _login()
    cy.wait(500)
    cy.contains('cf').click()
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

  it('2.4 - view new page, widget', () => {
    _login()
    cy.wait(500)
    cy.contains('cf').click()
    cy.contains('Dashboard').click()
    cy.contains('Create a Widget').click()
    cy.contains('Logo').click()
    cy.get('#nickname').type('qatest')
    cy.contains('Create Widget').click()
    cy.wait(1000)
    cy.get('[href="/lilwat/dashboard/create"]').click()
    cy.wait(4000)
    cy.contains('Create a Custom Page').click()

    cy.get('#title').type('qatestpage')
    cy.get('#subtitle').type('qasubtitle')
    cy.get('#slug').type('qatesturl')
    cy.contains('Create Page').click()
    cy.contains('qatestpage')
      .scrollIntoView()
      .parent()
      .children()
      .eq(3)
      .children()
      .click()

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
    cy.get('#RemoveWidgetModalContent').contains('Delete').click()
    cy.wait(4000)
    cy.get('[href="/lilwat/dashboard/edit"]').click()
    cy.wait(4000)
    cy.contains('Edit Widgets').click()

    cy.contains('qatest')
      .scrollIntoView()
      .parent()
      .children()
      .eq(2)
      .children()
      .click()

    cy.get('#nickname').should('contain.value', 'qatest')
    cy.wait(1500)
    cy.contains('Delete Widget').click()
    cy.get('#RemoveWidgetModalContent').contains('Delete').click()
    cy.wait(3000)
  })

  it('2.6 - view media', () => {
    _login()
    cy.wait(500)
    cy.contains('cf').click()
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
    cy.wait(500)
    cy.contains('cf').click()
    cy.contains('Dashboard').click()
    cy.contains('Edit').click()
    cy.contains('Edit Words').click()

    cy.get('.min-w-full > .bg-white > :nth-child(1) > .flex').click()
    cy.get('a > .inline-flex').click()
    cy.contains('Save Changes').click()
  })

  it.skip('3.1 edit homepage', () => {
    _login()
    cy.wait(500)
    cy.contains('cf').click()
    cy.contains('Dashboard').click()
    cy.contains('Edit').click()
    cy.contains('Edit Homepage').click()
    cy.contains('Edit Banner and Logo').click()
    cy.contains('Save Changes').click()
    cy.wait(2000)
    cy.scrollTo('top')
    cy.get(':nth-child(1) > .p-2 >')
      .trigger('dragstart', { force: true })

      .invoke('css', 'color', 'red')
    cy.wait(2000)
    cy.get(':nth-child(2) > .p-2 >')
      .trigger('drop', { force: true })
      .invoke('css', 'color', 'blue')
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
    cy.contains('Alphabet').click()
    cy.contains('ALPHABET').should('exist')

    cy.contains('Dictionary').click()
    cy.contains('Categories').click()
    cy.contains('CATEGORIES').should('exist')
  })

  it('4.1 - custom page', () => {
    const site = `${Cypress.env('baseUrl')}${Cypress.env(
      'DIALECT',
    )}/custom/qacustompage`
    cy.visit(`${Cypress.env('baseUrl')}`)
    cy.contains('Sign in').click()
    cy.wait(2000)
    cy.login(
      Cypress.env('CYPRESS_FV_USERNAME'),
      Cypress.env('CYPRESS_FV_PASSWORD'),
    )
    cy.wait(3000)
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.visit(site)
    cy.contains('403').should('not.exist')
    cy.contains('cf').click()
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

  it('7.1 - create word', () => {
    cy.on('uncaught:exception', () => false)
    cy.viewport(1024, 768)
    cy.visit(`${Cypress.env('baseUrl')}`)
    cy.contains('Sign in').click()
    cy.wait(2000)
    cy.login(
      Cypress.env('CYPRESS_FV_USERNAME'),
      Cypress.env('CYPRESS_FV_PASSWORD'),
    )
    cy.wait(3000)
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(2000)
    cy.contains('cf').click()
    cy.contains('Dashboard').click()
    cy.contains('Create').click()
    const name = `cha'Dich${new Date().getTime()}`
    cy.contains('Create a Word').click()
    cy.contains('Finish').click()
    cy.get('#title').type(name)
    middlestuff()
    cy.get('#SearchInput').type(`${name}{enter}`)
    cy.contains(name).click()
    cy.get('a > .inline-flex > span').click()
    cy.contains('Delete word').click()
    cy.get('#RemoveWidgetModalContent').contains('Delete').click()
  })

  it('8.1 - create phrase', () => {
    cy.on('uncaught:exception', () => false)
    cy.viewport(1024, 768)
    cy.visit(`${Cypress.env('baseUrl')}`)
    cy.contains('Sign in').click()
    cy.wait(2000)
    cy.login(
      Cypress.env('CYPRESS_FV_USERNAME'),
      Cypress.env('CYPRESS_FV_PASSWORD'),
    )
    cy.wait(3000)
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(2000)
    cy.contains('cf').click()
    cy.contains('Dashboard').click()
    cy.contains('Create').click()
    const name = `cha'DIch${new Date().getTime()}`
    cy.contains('Create a Phrase').click()
    cy.contains('Finish').click()
    cy.get('#title').type(name)
    middlestuff()
    cy.contains('PHRASES').click()
    cy.get('#SearchInput').type(`${name}{enter}`)
    cy.contains(name).click()
    cy.get('a > .inline-flex > span').click()
    cy.contains('Delete phrase').click()
    cy.get('#RemoveWidgetModalContent').contains('Delete').click()
  })

  it('9.1 - Get first word and search for it', () => {
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

  it('9.2 - Get first Phrase and search for it', () => {
    // i moved the visit from outside of beforeEach so i don't have to get it to log in on every it test
    cy.on('uncaught:exception', () => false)

    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(1000)
    cy.contains('Dictionary', { timeout: 12000 }).click()
    cy.contains('Phrases', { timeout: 12000 }).click()
    cy.wait(1000)
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
    cy.wait(2000)
    cy.get('ul li', { timeout: 10000 }).each((_song) => {
      cy.wait(1500)
      cy.wrap(_song).click()
      cy.wait(1500)
      cy.contains('Go to Story', { timeout: 12000 })
      cy.get('#CloseDrawerBtn').click()
    })
  })

  it('10.2 - Check list view', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.contains('Learn').click()
    cy.contains('Stories').click()
    cy.wait(2000)
    cy.contains('Use list view').click()
    cy.wait(4000)
    cy.get('.pb-16 > .w-full >', { timeout: 10000 }).each((_song) => {
      cy.wait(1500)
      cy.wrap(_song).click()
      cy.wait(1500)
      cy.contains('Go to Story')
      cy.wait(1000)
      cy.get('#CloseDrawerBtn').click()
    })
  })

  it('10.3 - Click on songs grid view', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.contains('Learn').click()
    cy.contains('Songs').click()
    cy.wait(2000)
    cy.get('ul li').each((_song) => {
      cy.wait(2000)
      cy.wrap(_song).click()

      cy.contains('Go to Song', { timeout: 12000 })
      cy.get('#CloseDrawerBtn').click()
    })
  })

  it('10.4 - Check list view songs', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.contains('Learn').click()
    cy.contains('Songs').click()
    cy.wait(1000)
    cy.contains('Use list view').click()
    cy.wait(1000)
    cy.get('.pb-16 > .w-full >').each((_song) => {
      cy.wait(1000)
      cy.wrap(_song).click()
      cy.wait(1000)
      cy.contains('Go to Song')
      cy.wait(1000)
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
    cy.wait(2000)
    cy.login(
      Cypress.env('CYPRESS_FV_USERNAME'),
      Cypress.env('CYPRESS_FV_PASSWORD'),
    )
    cy.wait(3000)
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(2000)
    cy.contains('cf').click()
    cy.contains('Dashboard').click()
    cy.contains('Edit Homepage').click()
    cy.contains('Page Text').should('not.exist')
  })

  it.skip('14.1 - Visit kids dictionary', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(2000)
    cy.contains('Kids').click()
    cy.wait(1000)
    cy.contains('Dictionary').click()
    cy.contains('404').should('not.exist')
    cy.wait(1000)
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
    cy.wait(2000)
    cy.contains('Kids').click()
    cy.wait(1000)
    cy.contains('Alphabet').click()
    cy.contains(' 404').should('not.exist')
    cy.contains('See all words').click()
    cy.contains(' 404').should('not.exist')
    cy.wait(2000)

    cy.get('a[data-testid^="SearchFilter"]').each((letter) => {
      cy.get(letter).click()
      cy.wait(3000)
      cy.contains(' 404').should('not.exist')
    })
  })

  it('14.3 - visit kids categories', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(2000)
    cy.contains('Kids').click()
    cy.contains('Categories').click()
    cy.contains(' 404').should('not.exist')
  })

  it('14.4 - visit kids games', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(2000)
    cy.contains('Kids').click()
    cy.contains('Games').click()
    cy.contains(' 404').should('not.exist')
  })

  it('14.5 - visit kids songs', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(2000)
    cy.contains('Kids').click()
    cy.contains('Songs').click()
    cy.contains(' 404').should('not.exist')
  })

  it('14.6 - visit kids stories', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(2000)
    cy.contains('Kids').click()
    cy.contains('Stories').click()
    cy.contains(' 404').should('not.exist')
  })

  it('14.7 kids search', () => {
    cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('DIALECT')}`)
    cy.wait(2000)
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
