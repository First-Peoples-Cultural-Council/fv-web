import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import appleBadge from 'images/badge-apple.svg'
import googleBadge from 'images/badge-google.svg'
import macLogo from 'images/logo-mac.png'
import windowsLogo from 'images/logo-windows.png'
import fvKeyboardsLogo from 'images/fv-keyboards.png'

function WidgetKeyboardsPresentation({ header, urls }) {
  return (
    <section
      id="WidgetKeyboardsPresentation"
      className="mx-auto max-w-7xl w-full px-2 md:px-12"
    >
      <div className="relative rounded-lg p-6 md:p-12">
        <div className="grid grid-cols-2 gap-8 md:gap-4 lg:gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="space-y-8 md:space-y-10">
              <h2 className="text-center md:text-left text-balance text-blumine-700 text-3xl md:text-4xl font-semibold tracking-tight">
                {header}
              </h2>
              <div className="flex justify-center md:hidden">
                <img
                  className="size-44 sm:size-52"
                  src={fvKeyboardsLogo}
                  loading="lazy"
                  alt="App Logo"
                />
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-5 lg:pt-2">
                <a
                  href="https://apps.apple.com/ca/app/firstvoices-keyboards/id1066651145"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                >
                  <img
                    className="h-12 sm:h-14 w-auto mx-auto"
                    src={appleBadge}
                    alt="App Store Logo"
                  />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.firstvoices.keyboards "
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                >
                  <img
                    className="h-12 sm:h-14 w-auto mx-auto"
                    src={googleBadge}
                    alt="Google Play Store Logo"
                  />
                </a>
              </div>

              {urls.macUrl || urls.windowsUrl ? (
                <div className="space-y-6 md:space-y-10">
                  <h3 className="text-center md:text-left md:text-xl text-charcoal-900">
                    Also available on desktop:
                  </h3>
                  <div className="w-full inline-flex justify-center md:justify-start">
                    {urls?.macUrl && (
                      <div className="flex">
                        <a
                          href={urls?.macUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col space-y-5 mr-5"
                        >
                          <img
                            className="h-14 w-auto mx-auto"
                            src={macLogo}
                            alt={urls?.macUrl}
                          />
                          <div className="mx-auto">
                            <div className="btn-secondary btn-md">
                              Install on Mac
                            </div>
                          </div>
                        </a>
                      </div>
                    )}
                    {urls?.windowsUrl && (
                      <div className="flex">
                        <a
                          href={urls?.windowsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col space-y-5"
                        >
                          <img
                            className="h-14 w-auto mx-auto"
                            src={windowsLogo}
                            alt={urls?.windowsUrl}
                          />
                          <div className="mx-auto">
                            <div className="btn-secondary btn-md">
                              Install on Windows
                            </div>
                          </div>
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          </div>
          <div className="hidden md:block md:col-span-1">
            <div className="flex items-center justify-center w-full h-full">
              <img
                className="h-52 w-52 lg:size-72 rounded-[56px] overflow-hidden"
                src={fvKeyboardsLogo}
                loading="lazy"
                alt="App Logo"
              />
            </div>
          </div>
        </div>
        <div className="hidden absolute -z-10 bottom-0 right-0 w-full h-full border-l-[80vw] border-l-transparent border-b-[50vh] border-b-scarlet-100 border-r-0 border-r-transparent"></div>
      </div>
    </section>
  )
}

// PROPTYPES
const { string, object } = PropTypes

WidgetKeyboardsPresentation.propTypes = {
  header: string,
  urls: object,
}

export default WidgetKeyboardsPresentation
