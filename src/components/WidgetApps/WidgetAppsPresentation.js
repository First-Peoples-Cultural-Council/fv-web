import React from 'react'
import { Link } from 'react-router'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import getIcon from 'common/utils/getIcon'
import { getAppDetails } from 'common/utils/appHelpers'
import LogoPresentation from 'components/SiteLogo/LogoPresentation'
import QrcodeCanvas from 'components/Actions/QrcodeCanvas'

function WidgetAppsPresentation() {
  const { site } = useSiteStore()
  const appDetails = getAppDetails({ site })

  return (
    <section
      id="WidgetAppsPresentation"
      className="mx-auto max-w-7xl w-full px-2 md:px-12"
    >
      <div className="rounded-lg p-6 md:p-12">
        <div className="grid grid-cols-2 gap-8 md:gap-4 lg:gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="mx-auto text-center md:mx-0 md:flex-auto md:py-0 md:text-left">
              <h2 className="text-balance text-blumine-700 text-3xl md:text-4xl font-semibold tracking-tight">
                Get the {site?.title} Language App to use on your favourite
                devices.
              </h2>

              <dl className="mt-10 max-w-xl space-y-4 md:space-y-8 text-left text-base/7 text-charcoal-600 md:max-w-none">
                {appDetails?.features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold text-blumine-700">
                      {getIcon(
                        feature.icon,
                        'absolute left-1 top-1 size-5  fill-current',
                      )}
                    </dt>
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-10 flex items-center justify-center gap-x-6 md:justify-start">
                <a
                  href={appDetails?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary btn-md"
                >
                  Go to the App
                </a>

                <Link
                  to={`/${site?.sitename}/apps`}
                  className="btn-tertiary btn-md"
                >
                  <span>Learn more</span>
                  {getIcon('RightArrow')}
                </Link>
              </div>
            </div>
          </div>

          <div className="col-span-2 md:col-span-1">
            <div className="flex-col items-center justify-center space-y-7">
              <div className="flex justify-center w-full">
                <a
                  href={appDetails?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center rounded-3xl shadow-lg border border-charcoal-500 p-4"
                >
                  <LogoPresentation
                    imgSrc={appDetails?.logoUrl}
                    altText={`${site?.title} Logo`}
                    additionalStyling="h-52 w-52 lg:size-64 mx-0 border"
                  />
                </a>
              </div>
              <div className="flex justify-center w-full">
                <QrcodeCanvas url={appDetails?.url} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WidgetAppsPresentation
