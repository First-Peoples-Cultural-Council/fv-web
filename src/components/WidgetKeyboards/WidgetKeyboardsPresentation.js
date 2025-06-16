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
    <div className="flex" id="WidgetKeyboardsPresentation">
      <div className="bg-charcoal-700 mx-auto p-6 md:p-10 text-white lg:my-4 max-w-screen-xl">
        <div className="flex flex-col md:flex-row">
          <div className="space-y-10">
            <h1 className="text-3xl font-bold">{header}</h1>
            <a
              href="https://apps.apple.com/ca/app/firstvoices-keyboards/id1066651145"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mr-5"
            >
              <img
                className="h-14 w-auto mx-auto shadow-xl"
                src={appleBadge}
                alt="App Store Logo"
              />
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.firstvoices.keyboards "
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mr-5"
            >
              <img
                className="h-14 w-auto mx-auto shadow-xl"
                src={googleBadge}
                alt="Google Play Store Logo"
              />
            </a>
          </div>
          <div className="flex items-center">
            <img
              className="flex lg:h-52 w-auto shadow-2xl rounded-lg my-6 border-8 border-white float-right"
              src={fvKeyboardsLogo}
              loading="lazy"
              alt="App Logo"
            />
          </div>
        </div>
        {urls && (
          <div className="mt-5 space-y-8">
            <h3 className="text-xl">Also available on desktop:</h3>
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
                      className="h-14 w-auto mx-auto shadow-xl"
                      src={macLogo}
                      alt={urls?.macUrl}
                    />
                    <div className="mx-auto">
                      <div className="flex px-4 py-2 text-xs text-center bg-black rounded-lg">
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
                    className="flex flex-col space-y-5 mr-8"
                  >
                    <img
                      className="h-14 w-auto mx-auto shadow-xl"
                      src={windowsLogo}
                      alt={urls?.windowsUrl}
                    />
                    <div className="mx-auto">
                      <div className="flex px-4 py-2 text-xs text-center bg-black rounded-lg">
                        Install on Windows
                      </div>
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
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
