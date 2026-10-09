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
      cy.env(['baseUrl', 'CYPRESS_DIALECT']).then(
        ({ baseUrl, CYPRESS_DIALECT }) => {
          cy.visit(`${baseUrl}${CYPRESS_DIALECT}`)
        },
      )
      cy.contains('404').should('not.exist')
      cy.contains('Líl̓wat')
    })

    it('Test contact form', () => {
      cy.env(['baseUrl', 'CYPRESS_DIALECT']).then(
        ({ baseUrl, CYPRESS_DIALECT }) => {
          cy.visit(`${baseUrl}${CYPRESS_DIALECT}`)
        },
      )
      cy.contains('404').should('not.exist')
      cy.get('[data-testid="contact-form-hidden"]').should('exist')
    })

    it('check icons on alphabet widget', () => {
      cy.env(['baseUrl', 'CYPRESS_DIALECT']).then(
        ({ baseUrl, CYPRESS_DIALECT }) => {
          cy.visit(`${baseUrl}${CYPRESS_DIALECT}`)
        },
      )
      cy.contains('404').should('not.exist')
      cy.get('[data-testid="character-detail-header"] > div').should(
        'have.length',
        2,
      )
    })

    it('Check word of the day', () => {
      cy.env(['baseUrl', 'CYPRESS_DIALECT']).then(
        ({ baseUrl, CYPRESS_DIALECT }) => {
          cy.visit(`${baseUrl}${CYPRESS_DIALECT}`)
        },
      )
      cy.contains('404').should('not.exist')

      cy.get('#CopyAction').should('be.visible')
      cy.get('[data-testid="share-btn"]').should('be.visible')
    })

    it('check image logo', () => {
      cy.env(['baseUrl', 'CYPRESS_DIALECT']).then(
        ({ baseUrl, CYPRESS_DIALECT }) => {
          cy.visit(`${baseUrl}${CYPRESS_DIALECT}`)
        },
      )
      cy.get('[data-testid="SiteLogoPresentation"] img').should('be.visible')
    })

    it('check banner', () => {
      cy.env(['baseUrl', 'CYPRESS_DIALECT']).then(
        ({ baseUrl, CYPRESS_DIALECT }) => {
          cy.visit(`${baseUrl}${CYPRESS_DIALECT}`)
        },
      )
      cy.get('#BannerWithImage').should('be.visible')
    })
  },
) // end of describe
