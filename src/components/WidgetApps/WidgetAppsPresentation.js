import React from 'react'

// FPCC
import SectionTitle from 'components/SectionTitle'
import { useSiteStore } from 'context/SiteContext'

function WidgetAppsPresentation() {
  const { site } = useSiteStore()
  const appLogoSrc = `https://${site?.sitename}.firstvoicesapp.com/${site?.sitename}/logo192.png`
  const pwaUrl = `https://${site?.sitename}.firstvoicesapp.com/`

  return (
    <section className="py-3 md:py-6 bg-white">
      <div className="mx-5 lg:mx-10 mb-4 md:mb-6 lg:mb-8 xl:mb-12">
        <SectionTitle.Presentation title={`Download the ${site?.title} Language App`} />
      </div>
      <div className="grid grid-cols-3 gap-4 mx-auto max-w-screen-lg">
        <div className="col-span-2 space-y-4">
          <p className="text-base font-medium">
            Browse words and phrases in the dictionary, practice with flashcards, bookmark content and more with the{' '}
            {site?.title} mobile app!
          </p>
          <p className="text-base font-medium">Compatible with iPhone, iPad, Android, Chromebook, Windows, and more.</p>
          <p className="text-base font-medium">
            <a className="inline-url" href={pwaUrl} target="_blank" rel="noopener noreferrer">
              Download the {site?.title} Language App
            </a>{' '}
            directly from the web by selecting “Install” or “Add to Homescreen” in your browser.
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
          <a href={pwaUrl} target="_blank" rel="noopener noreferrer" className="btn-contained bg-secondary">
            Install now
          </a>
        </div>
        <div className="col-span-1 flex items-center">
          <img
            className="h-32 lg:h-52 w-32 lg:w-52 shadow-2xl rounded-lg mx-auto border-8 border-white float-right "
            src={appLogoSrc}
            loading="lazy"
            alt={`${site?.title} App Logo`}
          />
        </div>
      </div>
    </section>
  )
}

export default WidgetAppsPresentation
