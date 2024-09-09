import React from 'react'

// FPCC
import { useSiteStore } from 'context/SiteContext'

function WidgetAppsPresentation() {
  const { site } = useSiteStore()
  const appLogoSrc = `https://${site?.sitename}.firstvoicesapp.com/${site?.sitename}/logo192.png`
  const pwaUrl = `https://${site?.sitename}.firstvoicesapp.com/`

  return (
    <div className="flex bg-tertiaryA">
      <div className="grid grid-cols-3 gap-4 mx-auto p-10 text-white lg:my-4 max-w-screen-xl">
        <div className="col-span-2 space-y-4">
          <h1 className="text-3xl font-bold">Download the {site?.title} Language App!</h1>
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
    </div>
  )
}

export default WidgetAppsPresentation
