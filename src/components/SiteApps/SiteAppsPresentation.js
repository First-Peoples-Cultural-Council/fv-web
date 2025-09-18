import React from 'react'

// FPCC
import WidgetApps from 'components/WidgetApps'
import { useSiteStore } from 'context/SiteContext'
import SiteDocHead from 'components/SiteDocHead'

function SiteAppsPresentation() {
  const { site } = useSiteStore()

  const h2Styling = 'text-xl md:text-3xl lg:text-4xl font-bold'

  return (
    <div data-testid="SiteAppsPresentation">
      <SiteDocHead titleArray={['Mobile App']} />
      <WidgetApps.Presentation />
      <section className="justify-center max-w-5xl px-4 lg:px-0 mx-auto text-charcoal-700">
        <div className="space-y-4 py-4 md:space-y-8 md:py-8">
          <h2 className={h2Styling}>
            The {site?.title} app lets you access your language on-the-go!
          </h2>
          <p>
            The wealth of language data uploaded onto the {site?.title}{' '}
            FirstVoices language site can now also be accessed through mobile
            apps. The app pulls dictionary entries, songs, and stories directly
            from FirstVoices and always has the latest content. The app can be
            installed directly from the web.
          </p>

          <h2 className={h2Styling}>Installation Instructions</h2>
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
        </div>
        <div className="w-full rounded-lg bg-ochre-200  py-4 md:py-8 px-8 md:px-14 my-8 space-y-4 md:space-y-8 ">
          <h2 className={h2Styling}>Having trouble installing apps?</h2>
          <p>
            Let us know{' '}
            <a
              className="inline-url"
              target="_blank"
              rel="noopener noreferrer"
              href="https://firstvoices.atlassian.net/servicedesk/customer/portal/6"
            >
              via our Help Desk.
            </a>
          </p>
        </div>
      </section>
    </div>
  )
}

export default SiteAppsPresentation
