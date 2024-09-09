import React from 'react'

// FPCC
import WidgetApps from 'components/WidgetApps'
import { useSiteStore } from 'context/SiteContext'

function SiteAppsPresentation() {
  const { site } = useSiteStore()

  const headerStyle = 'border-b border-gray-500 font-bold mb-5 pb-5 text-2xl text-primary'

  return (
    <div data-testid="SiteAppsPresentation">
      <div className="lg:my-4">
        <WidgetApps.Presentation />
      </div>

      <section className="justify-center max-w-screen-lg px-4 pb-4 lg:px-0 lg:pb-10 mx-auto">
        <h2 className={headerStyle}>{`The ${site?.title} app lets you access your language on-the-go!`}</h2>
        <p className="pb-8">
          The wealth of language data uploaded onto the {site?.title} FirstVoices language site can now also be accessed
          through mobile apps. The app pulls dictionary entries, songs, and stories directly from FirstVoices and always
          has the latest content. The app can be installed directly from the web.
        </p>
        <h2 className={headerStyle}>Installation Instructions</h2>
        <p>
          Find detailed instructions for your browser here:{' '}
          <a
            className="inline-url"
            target="_blank"
            rel="noopener noreferrer"
            href="https://firstvoices.atlassian.net/wiki/spaces/FIR1/pages/644579350"
          >
            Instructions for installing PWA
          </a>
        </p>
        <p>
          Having trouble installing apps? Let us know via our{' '}
          <a
            className="inline-url"
            target="_blank"
            rel="noopener noreferrer"
            href="https://firstvoices.atlassian.net/servicedesk/customer/portal/6"
          >
            Help Desk.
          </a>
        </p>
      </section>
    </div>
  )
}

export default SiteAppsPresentation
