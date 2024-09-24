import React from 'react'

// FPCC
import WidgetApps from 'components/WidgetApps'
import { useSiteStore } from 'context/SiteContext'

function SiteAppsPresentation() {
  const { site } = useSiteStore()

  return (
    <div data-testid="SiteAppsPresentation">
      <div className="mb-4 lg:my-4">
        <WidgetApps.Presentation />
      </div>

      <section className="justify-center max-w-screen-lg px-4 pb-4 lg:px-0 lg:pb-10 mx-auto">
        <div className="space-y-4 py-4 md:space-y-8 md:py-8">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold">
            The {site?.title} app lets you access your language on-the-go!
          </h2>
          <p>
            The wealth of language data uploaded onto the {site?.title}{' '}
            FirstVoices language site can now also be accessed through mobile
            apps. The app pulls dictionary entries, songs, and stories directly
            from FirstVoices and always has the latest content. The app can be
            installed directly from the web.
          </p>
        </div>
        <div className="space-y-4 py-4 md:space-y-8 md:py-8">
          <h2 className="text-xl md:text-3xl lg:text-4xl font-bold">
            Installation Instructions
          </h2>
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
        </div>
      </section>
    </div>
  )
}

export default SiteAppsPresentation
