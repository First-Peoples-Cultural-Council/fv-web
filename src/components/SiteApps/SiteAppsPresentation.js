import React from 'react'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import SectionTitle from 'components/SectionTitle'
import SiteDocHead from 'components/SiteDocHead'
import getIcon from 'common/utils/getIcon'
import { getAppDetails } from 'common/utils/appHelpers'
import LogoPresentation from 'components/SiteLogo/LogoPresentation'
import QrcodeCanvas from 'components/Actions/QrcodeCanvas'

function SiteAppsPresentation() {
  const { site } = useSiteStore()
  const appDetails = getAppDetails({ site })
  const headerStyling =
    'mt-2 text-pretty text-3xl sm:text-4xl font-semibold tracking-tight text-charcoal-900 lg:text-balance'

  return (
    <div
      data-testid="SiteAppsPresentation"
      className="max-w-7xl mx-auto pt-2 md:pt-4 lg:pt-8 bg-white"
    >
      <SiteDocHead titleArray={['Mobile App']} />
      <div className="px-4 sm:px-6 lg:px-8">
        <SectionTitle.Presentation title="MOBILE APP" />
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 lg:space-y-10 mt-4 sm:mt-6 lg:mt-10">
          <div className="bg-white space-y-4">
            <div className="h-full w-full flex items-center justify-center p-5">
              <div className="grid grid-cols-2 gap-7 sm:gap-12 place-items-center">
                <div className="col-span-1">
                  <div className="flex items-center justify-center rounded-3xl shadow-lg border border-charcoal-500 p-4">
                    <LogoPresentation
                      imgSrc={appDetails?.logoUrl}
                      altText={`${site?.title} Logo`}
                      additionalStyling="h-32 w-32 md:h-44 md:w-44 mx-0 border"
                    />
                  </div>
                </div>
                <div className="col-span-1 space-y-2 md:space-y-5">
                  <div className="flex justify-center w-full">
                    <QrcodeCanvas url={appDetails?.url} />
                  </div>
                  <div className="flex justify-center w-full">
                    <a
                      href={appDetails?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary btn-md"
                    >
                      Go to the App
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-3xl lg:text-center">
                <p className={headerStyling}>
                  The {site?.title} app lets you access your language on-the-go!
                </p>
                <p className="mt-4 sm:mt-6 text-lg/8 text-charcoal-700">
                  The wealth of language data uploaded onto the {site?.title}{' '}
                  FirstVoices language site can now also be accessed through our
                  mobile app. The app pulls dictionary entries, songs, and
                  stories directly from FirstVoices and always has the latest
                  content. The app can be installed directly from the web.
                </p>
              </div>
              <div className="mx-auto mt-10 max-w-2xl sm:mt-14 lg:mt-18 lg:max-w-4xl">
                <dl className="grid max-w-xl grid-cols-1 gap-x-6 gap-y-8 lg:max-w-none lg:grid-cols-2 lg:gap-y-14">
                  {appDetails?.features.map((feature) => (
                    <div key={feature.name} className="relative pl-16">
                      <dt className="text-base/7 font-semibold text-charcoal-900">
                        <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-blumine-600">
                          {getIcon(
                            feature.icon,
                            'size-6 text-white fill-current',
                          )}
                        </div>
                        {feature.name}
                      </dt>
                      <dd className="mt-2 text-base/7 text-charcoal-600">
                        {feature.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          <section className="justify-center max-w-5xl px-4 lg:px-0 mx-auto text-charcoal-700">
            <div className="space-y-4 py-4 md:py-8">
              <h2 className={headerStyling}>Installation Instructions</h2>
              <div className="mt-2 text-charcoal-700 text-pretty">
                <p className="mt-4 sm:mt-6 text-lg/8">On Android (Chrome)</p>
                <ol className="list-outside px-5 list-decimal text-base/7 py-2">
                  <li>
                    Open Chrome and go to the{' '}
                    <a
                      href={appDetails?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-url"
                    >
                      app website.
                    </a>
                  </li>
                  <li>Tap the three-dot menu ( ⋮ ) in the top right corner.</li>
                  <li>
                    Select &quot;Install app&quot; or &quot;Add to Home
                    screen&quot;.
                  </li>
                  <li>Follow the on-screen prompts to confirm and install.</li>
                </ol>
                <p className="mt-4 sm:mt-6 text-lg/8">
                  On iOS/iPhone/iPad (Safari)
                </p>
                <p className="font-light">
                  Note: PWA installation on iOS requires Safari and iOS 16.4 or
                  later.
                </p>
                <ol className="list-outside px-5 list-decimal text-base/7 py-2">
                  <li>
                    Open Safari and go to the{' '}
                    <a
                      href={appDetails?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-url"
                    >
                      app website.
                    </a>
                  </li>
                  <li>
                    Tap the three-dot menu (⋯) in the bottom right corner.
                  </li>
                  <li>Tap the Share button (box with an upward arrow).</li>
                  <li>Scroll down and tap &quot;Add to Home Screen&quot;.</li>
                  <li>Confirm the name and tap &quot;Add&quot;.</li>
                </ol>
                <p className="mt-4 sm:mt-6 text-lg/8">
                  On Desktop (Chrome, Edge, Brave)
                </p>
                <ol className="list-outside px-5 list-decimal text-base/7 py-2">
                  <li>
                    Go to the{' '}
                    <a
                      href={appDetails?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-url"
                    >
                      app website
                    </a>{' '}
                    in your browser.
                  </li>
                  <li>
                    Look at the right side of the address bar for an install
                    icon (often a computer screen with a downward arrow, or a
                    plus sign).
                  </li>
                  <li>Click the icon and select &quot;Install&quot;.</li>
                  <li>
                    Alternatively: Click the three-dot menu ( ⋮ ), go to
                    &quot;Apps&quot; or &quot;More Tools,&quot; and select
                    &quot;Install [Site Name]&quot;.
                  </li>
                </ol>
                <p className="mt-4 sm:mt-6 text-lg/8">On macOS (Safari 17+)</p>
                <ol className="list-outside px-5 list-decimal text-base/7 py-2">
                  <li>
                    Open Safari and go to the{' '}
                    <a
                      href={appDetails?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-url"
                    >
                      app website.
                    </a>
                  </li>
                  <li>
                    Go to the menu bar and select &quot;File&quot; &gt;
                    &quot;Add to Dock&quot;.
                  </li>
                </ol>
              </div>
              <p className="text-lg/8 text-charcoal-700">
                Find more detailed instructions on how to install our app on
                your device here:{' '}
                <a
                  className="inline-url"
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://firstvoices.atlassian.net/wiki/spaces/FIR1/pages/644579350"
                >
                  App Installation Instructions
                </a>
              </p>
            </div>
            <div className="w-full rounded-lg bg-blumine-100  py-4 md:py-8 px-8 md:px-14 my-8">
              <h2 className="text-lg/8 font-semibold text-charcoal-900">
                Having trouble installing the app?
              </h2>
              <p className="mt-4 sm:mt-6 text-lg/8 text-charcoal-700">
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
      </div>
    </div>
  )
}

export default SiteAppsPresentation
