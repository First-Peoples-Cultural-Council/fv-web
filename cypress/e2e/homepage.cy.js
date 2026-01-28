describe(
  'V2 Search Homepage',
  {
    retries: {
      runMode: 2,
      openMode: 1,
    },
  },
  () => {
    beforeEach(() => {
      cy.viewport(1920, 1080)
      cy.intercept(
        {
          method: 'GET', // Route all GET requests
          url: '/matomo.js',
        },
        [], // and force the response to be: []
      )
    })

    it('V2 Homepage load', () => {
      // i moved the visit from outside of beforeEach so i don't have to get it to log in on every it test
      cy.on('uncaught:exception', () => false)
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('CYPRESS_DIALECT')}`)
      cy.contains('404').should('not.exist')
      cy.contains('Líl̓wat')
    })

    it('Test contact form', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('CYPRESS_DIALECT')}`)
      cy.contains('404').should('not.exist')
      cy.contains('Please sign in to use the contact us form').should('exist')
    })

    it('check icons on alphabet widget', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('CYPRESS_DIALECT')}`)
      cy.contains('404').should('not.exist')
      cy.get(
        '[data-testid="AlphabetPresentationSelected__header"] > div',
      ).should('have.length', 2)
    })

    it('Check word of the day', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('CYPRESS_DIALECT')}`)
      cy.contains('404').should('not.exist')

      cy.get('.mt-2 > a').click()
    })

    it('check image logo', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('CYPRESS_DIALECT')}`)
      cy.get('[data-testid="SiteLogoPresentation"] img').should('be.visible')
    })

    it('check banner', () => {
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('CYPRESS_DIALECT')}`)
      cy.get('#BannerWithImage').should('be.visible')
    })

    it('mobile buttons test check', () => {
      cy.viewport('iphone-6')
      cy.visit(`${Cypress.env('baseUrl')}${Cypress.env('CYPRESS_DIALECT')}`)

      const mobileLinks = [
        { testId: 'Words-link', slug: 'words' },
        { testId: 'Songs-link', slug: 'songs' },
        { testId: 'Phrases-link', slug: 'phrases' },
        { testId: 'Stories-link', slug: 'stories' },
        { testId: 'Alphabet-link', slug: 'alphabet' },
        { testId: 'Games-link', slug: 'games' },
        { testId: 'Mobile App-link', slug: 'apps' },
        { testId: 'Categories-link', slug: 'categories' },
        { testId: 'Keyboards-link', slug: 'keyboards' },
        { testId: 'Our Language-link', slug: 'our-language' },
        { testId: 'Our People-link', slug: 'our-people' },
        { testId: 'Kids-link', slug: 'kids' },
      ]

      mobileLinks.forEach(({ testId, slug }) => {
        cy.get('[data-testid="MobileMenu-button"]').click()
        cy.get(`[data-testid="${testId}"]`).click()
        cy.location('pathname').should('include', slug)
      })
    })
  },
) // end of describe
