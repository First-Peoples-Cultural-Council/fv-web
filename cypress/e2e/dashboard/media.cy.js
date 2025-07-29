/// <reference types="cypress" />

describe(
  'Dashboard - Media Tests (audio/video/images)',
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
      Cypress.Commands.add('_login', () => {
        cy.visit(`${Cypress.env('baseUrl')}`)
        cy.contains('Sign in').click()
        cy.origin(
          'https://fpcc-dev.auth.ca-central-1.amazoncognito.com',
          () => {
            Cypress.Commands.add('login', (email, password) => {
              cy.get('#signInFormUsername').type(email, { force: true })
              // lets try an incorrect password
              cy.get('#signInFormPassword').type(`${password}{enter}`, {
                force: true,
              })
            })

            cy.contains('Sign in with your email and password').should('exist')
            cy.login(
              Cypress.env('CYPRESS_FV_USERNAME'),
              Cypress.env('CYPRESS_FV_PASSWORD'),
            )
          },
        )

        cy.contains('Explore Languages').click()
      })
    })

    it('2.6 - view media', () => {
      cy._login()
      cy.contains('Explore Languages').click()
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').click()

      cy.contains('Media').click()
      cy.contains('Audio').click()
      cy.contains('Download')
      cy.get('td audio:first')
        .invoke('attr', 'src')
        .then((audiofile) => {
          const audio = new Audio(audiofile)
          audio.play()
          audio.volume = 0.0
        })
      cy.go(-1)
      cy.contains('Manage your images').parent().click()
      cy.contains('Download')
      cy.go(-1)
      cy.contains('Manage your videos').parent().click()
      cy.contains('Download')
    })

    it('upload audio test', () => {
      cy._login()
      cy.contains('Explore Languages').click()
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').click()
      cy.contains('Edit words and phrases').click()
      cy.get('[data-testid="EntryRow"] td button').eq(0).click()
      cy.get('[data-testid="EntryDrawerEdit"]').invoke('removeAttr', 'target')
      cy.get('[data-testid="EntryDrawerEdit"]').click()

      cy.contains('Add audio').click()
      cy.contains('Upload new audio').click()
      cy.fixture('sample1.oga', null).as('audioFixture')
      cy.get('#audioFile').selectFile('@audioFixture')

      cy.get('div[id="AudioUploadForm"] #title').type('qatestaudio', {
        force: true,
      })
      cy.contains('Upload File').click()
      cy.contains('File Successfully Uploaded', { timeout: 120000 }) // cypress timeout is too short, adding this one
      cy.contains('Insert').click()

      cy.contains('Add audio').click()
      cy.contains('Upload New Audio').click()
      cy.fixture('sample4.opus', null).as('audioFixture')
      cy.get('#audioFile').selectFile('@audioFixture')

      cy.get('div[id="AudioUploadForm"] #title').type('qatestaudio', {
        force: true,
      })
      cy.contains('Upload File').click()
      cy.contains('File successfully uploaded', { timeout: 120000 }) // cypress timeout is too short, adding this one
      cy.contains('Insert').click()

      cy.contains('Add audio').click()
      cy.contains('Upload New Audio').click()
      cy.fixture('sample-6s.mp3', null).as('audioFixture')
      cy.get('#audioFile').selectFile('@audioFixture')

      cy.get('div[id="AudioUploadForm"] #title').type('qatestaudio', {
        force: true,
      })
      cy.contains('Upload File').click()
      cy.contains('File successfully uploaded', { timeout: 120000 }) // cypress timeout is too short, adding this one
      cy.contains('Insert').click()

      cy.contains('Add audio').click()
      cy.contains('Upload New Audio').click()
      cy.fixture('a2-db-kk-03.wav', null).as('audioFixture')
      cy.get('#audioFile').selectFile('@audioFixture')

      cy.get('div[id="AudioUploadForm"] #title').type('qatestaudio', {
        force: true,
      })
      cy.contains('Upload File').click()
      cy.contains('File successfully uploaded', { timeout: 120000 }) // cypress timeout is too short, adding this one
      cy.contains('Insert').click()

      cy.contains('Save changes').click()

      cy.go('back')

      cy.get('[data-testid="EntryRow"] td button').eq(0).click()
      cy.get('[data-testid="EntryDrawerEdit"]').invoke('removeAttr', 'target')
      cy.get('[data-testid="EntryDrawerEdit"]').click()

      cy.get('#XButton > [data-testid="Remove-btn"]').each((_el) => {
        cy.wrap(_el).click()
      })

      cy.contains('Save changes').click()
    })

    it('upload image', () => {
      cy._login()
      cy.contains('Explore Languages').click()
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').click()
      cy.contains('Edit words and phrases').click()
      cy.get('[data-testid="EntryRow"] td button').eq(0).click()
      cy.get('[data-testid="EntryDrawerEdit"]').invoke('removeAttr', 'target')
      cy.get('[data-testid="EntryDrawerEdit"]').click()

      cy.contains('Add image').click()
      cy.contains('Upload new images').click()
      cy.fixture('blank.jpg', null).as('imageFixture')
      cy.get('.uppy-Dashboard-AddFiles').selectFile('@imageFixture', {
        action: 'drag-drop',
      })

      cy.contains('Upload 1 file').click()
      cy.contains('Complete').should('exist')
      cy.get('[data-testid="upload-tab-btn"]').click()
      cy.contains('Save changes').click()
    })

    it('upload video', () => {
      cy._login()
      cy.contains('Explore Languages').click()
      cy.contains(`${Cypress.env('CYPRESS_FV_INITIALS')}`).click()
      cy.contains('Dashboard').click()
      cy.contains('Edit words and phrases').click()
      cy.get('[data-testid="EntryRow"] td button').eq(0).click()
      cy.get('[data-testid="EntryDrawerEdit"]').invoke('removeAttr', 'target')
      cy.get('[data-testid="EntryDrawerEdit"]').click()

      cy.contains('Add video').click()
      cy.contains('Upload new video').click()
      cy.fixture('file_example_MP4_640_3MG.mp4', null).as('videoFixture')
      cy.get('.uppy-Dashboard-AddFiles').selectFile('@videoFixture', {
        action: 'drag-drop',
      })

      cy.contains('Upload 1 file').click({ timeout: 120000 })
      cy.contains('Complete').should('exist')
      cy.get('[data-testid="upload-tab-btn"]').click()
      cy.contains('Save changes').click()
    })
  },
)
