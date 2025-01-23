/// <reference types="cypress" />

describe('api testing', () => {
  let settings = {}
  it.skip('API - get site feature', () => {
    cy.origin(
      'https://api.dev.firstvoices.com',

      () => {
        settings = {
          async: true,
          crossDomain: true,
          url: 'https://api.dev.firstvoices.com/api/1.0/sites/mandalore/features/',
          method: 'GET',
          headers: {
            Authorization: Cypress.env('CYPRESS_TOKEN'),
          },
        }

        const request = Cypress.$.ajax(settings).done(() => {})

        request.fail((xhr) => {
          if (xhr.status !== 200)
            throw new Error('API test failed -- needs review')
        })
      }, // eos
    )
  })

  it.skip('API - Site feature update', () => {
    cy.origin(
      'https://api.dev.firstvoices.com',

      () => {
        settings = {
          async: true,
          crossDomain: true,
          url: 'https://api.dev.firstvoices.com/api/1.0/sites/mandalore/features/immersion',
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: Cypress.env('CYPRESS_TOKEN'),
          },
          processData: false,
          data: '{\n    "key": "immersion",\n    "is_enabled": true\n}',
        }

        const request = Cypress.$.ajax(settings).done(() => {})

        request.fail((xhr) => {
          if (xhr.status !== 200)
            throw new Error('API test failed -- needs review')
        })
      },
    )
  })

  it.skip('API - site feature retrieve', () => {
    cy.origin('https://api.dev.firstvoices.com', () => {
      settings = {
        async: true,
        crossDomain: true,
        url: 'https://api.dev.firstvoices.com/api/1.0/sites/mandalore/features/immersion',
        method: 'GET',
        headers: {
          Authorization: Cypress.env('CYPRESS_TOKEN'),
        },
      }

      const request = Cypress.$.ajax(settings).done(() => {})

      request.fail((xhr) => {
        if (xhr.status !== 200)
          throw new Error('API test failed -- needs review')
      })
    })
  }) // eot

  it.skip('dictionary clean up - was it run?', () => {})

  it.skip('mtd testing - was it run?', () => {})

  it.skip('rebuild index - was it run?', () => {})

  it.skip('Bulk visibility testing', () => {})

  it.skip('import jobs - was it run?', () => {})
}) // eod
