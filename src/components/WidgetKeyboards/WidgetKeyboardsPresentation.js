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
    <div className="mx-auto" id="WidgetKeyboardsPresentation">
      <div className="bg-white border border-charcoal-200 mx-auto p-6 md:p-10 my-4 max-w-screen-lg rounded-xl">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3 md:col-span-2 space-y-5 md:space-y-10">
            <h1 className="text-xl md:text-3xl text-blumine-800">{header}</h1>

            <a
              href="https://apps.apple.com/ca/app/firstvoices-keyboards/id1066651145"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mr-5"
            >
              <img
                className="h-14 w-auto mx-auto"
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
                className="h-14 w-auto mx-auto"
                src={googleBadge}
                alt="Google Play Store Logo"
              />
            </a>
          </div>
          <div className="flex order-first col-span-3 md:order-last md:col-span-1 justify-center md:justify-end">
            <img
              className="h-32 w-32 md:h-52 md:w-52"
              src={fvKeyboardsLogo}
              loading="lazy"
              alt="App Logo"
            />
          </div>
        </div>
        {urls.macUrl || urls.windowsUrl ? (
          <div className="mt-5 space-y-8">
            <h3 className="md:text-xl text-charcoal-900">
              Also available on desktop:
            </h3>
            <div className="inline-flex">
              {urls?.macUrl && (
                <div className="flex">
                  <a
                    href={urls?.macUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col space-y-5 mr-8"
                  >
                    <img
                      className="h-14 w-auto mx-auto"
                      src={macLogo}
                      alt={urls?.macUrl}
                    />
                    <div className="mx-auto">
                      <div className="btn-secondary btn-sm">Install on Mac</div>
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
                    className="flex flex-col space-y-5 mr-8"
                  >
                    <img
                      className="h-14 w-auto mx-auto"
                      src={windowsLogo}
                      alt={urls?.windowsUrl}
                    />
                    <div className="mx-auto">
                      <div className="btn-secondary btn-sm">
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
  )
}

// PROPTYPES
const { string, object } = PropTypes

WidgetKeyboardsPresentation.propTypes = {
  header: string,
  urls: object,
}

export default WidgetKeyboardsPresentation
