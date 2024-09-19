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
    <section className="py-3 md:py-6 bg-white">
      <div className="mx-5 lg:mx-10 mb-4 md:mb-6 lg:mb-8 xl:mb-12">
        <SectionTitle.Presentation title="DOWNLOAD MOBILE APP" />
        <h2 className="text-center text-secondary text-sm md:text-base lg:text-2xl mt-2 md:mt-3.5 lg:mt-5">
          {site?.title} Language
        </h2>
      </div>
      <div className="grid grid-cols-3 gap-4 mx-auto max-w-screen-lg">
        <div className="col-span-2 space-y-4 md:space-y-8">
          <p className="text-base font-medium">
            Browse words and phrases in the dictionary
          </p>
          <p className="text-base font-medium">Practice with flashcards</p>
          <p className="text-base font-medium">
            Bookmark content and more with the {site?.title} mobile app!
          </p>
          <p className="text-base font-medium">
            Compatible with iPhone, iPad, Android, Chromebook, Windows, and
            more.
          </p>
          <p className="text-base font-medium">
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
          <p className="text-base font-medium">
            <a
              className="inline-url"
              href="https://firstvoices.atlassian.net/wiki/spaces/FIR1/pages/644579350"
              target="_blank"
              rel="noopener noreferrer"
            >
              Installation Help
            </a>
          </p>
        </div>
        <div className="col-span-1">
          <div className="flex-col items-center justify-center space-y-14 md:space-y-20">
            <img
              className="h-32 md:h-44 lg:h-52 w-32 md:w-44 lg:w-52 rounded-lg mx-auto border"
              src={appLogoSrc}
              loading="lazy"
              alt={`${site?.title} App Logo`}
            />
            <div className="flex justify-center w-full">
              <a
                href={pwaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-contained bg-secondary"
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
