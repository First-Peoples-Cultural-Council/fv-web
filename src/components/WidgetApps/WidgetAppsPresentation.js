import React from 'react'

// FPCC
import SectionTitle from 'components/SectionTitle'
import { useSiteStore } from 'context/SiteContext'
import getIcon from 'common/utils/getIcon'

function WidgetAppsPresentation() {
  const { site } = useSiteStore()
  const appLogoSrc = `https://${site?.sitename}.firstvoicesapp.com/${site?.sitename}/logo192.png`
  const pwaUrl = `https://${site?.sitename}.firstvoicesapp.com/`

  return (
    <section className="px-4 lg:px-0 py-3 lg:py-6 bg-white">
      <div className="mx-5 lg:mx-10 mb-4 md:mb-6 lg:mb-8 xl:mb-12">
        <SectionTitle.Presentation title="DOWNLOAD MOBILE APP" />
        <h2 className="text-center text-secondary text-sm md:text-base lg:text-2xl mt-2 md:mt-3.5 lg:mt-5">
          {site?.title} Language
        </h2>
      </div>
      <div className="grid grid-cols-7 gap-6 md:gap-4 mx-auto max-w-screen-lg">
        <div className="md:text-lg text-fv-charcoal-light col-span-7 md:col-span-4 space-y-4 md:space-y-8">
          <div className="space-y-4 md:space-y-8">
            <div className="flex">
              <div className="flex-none w-12 p-1">
                {getIcon('Search', 'fill-current h-5 w-auto mx-auto')}
              </div>
              <p className="grow">Browse words and phrases in the dictionary</p>
            </div>
            <div className="flex">
              <div className="flex-none w-12 p-1">
                {getIcon('Flashcard', 'fill-current h-5 w-auto mx-auto')}
              </div>
              <p className="grow">Practice with flashcards</p>
            </div>
            <div className="flex">
              <div className="flex-none w-12 p-1">
                {getIcon('Bookmark', 'fill-current h-5 w-auto mx-auto')}
              </div>
              <p className="grow">
                Bookmark content and more with the {site?.title} mobile app!
              </p>
            </div>
            <div className="flex">
              <div className="flex-none w-12 p-1">
                {getIcon('Devices', 'fill-current h-5 w-auto mx-auto')}
              </div>
              <p className="grow">
                Compatible with iPhone, iPad, Android, Chromebook, Windows, and
                more.
              </p>
            </div>
          </div>

          <p>
            <a
              className="inline-url"
              href={pwaUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Install the {site?.title} Language App
            </a>{' '}
            directly from the web by selecting “Install” or “Add to Homescreen”
            in your browser.
          </p>
          <p>
            <a
              className="inline-url text-base italic"
              href="https://firstvoices.atlassian.net/wiki/spaces/FIR1/pages/644579350"
              target="_blank"
              rel="noopener noreferrer"
            >
              Installation Help Link
            </a>
          </p>
        </div>
        <div className="col-span-7 md:col-span-3">
          <div className="flex-col items-center justify-center space-y-6 md:space-y-20">
            <img
              className="h-44 w-44 rounded-lg mx-auto border"
              src={appLogoSrc}
              loading="lazy"
              alt={`${site?.title} App Logo`}
            />
            <div className="flex justify-center w-full">
              <a
                href={pwaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-80 btn-contained bg-secondary"
              >
                {getIcon('Download', 'btn-icon')}
                <span>Install now</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WidgetAppsPresentation
