import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { getMediaUrl } from 'common/utils/urlHelpers'
import appleBadge from 'images/badge-apple.svg'
import googleBadge from 'images/badge-google.svg'

function WidgetAppsPresentation({ header, logoId, subtitle, urls }) {
  return (
    <div className="flex">
      <div className="grid grid-cols-3 gap-4 bg-tertiaryA mx-auto p-10 text-white lg:my-4 max-w-screen-xl">
        <div className="col-span-2 space-y-10">
          <h1 className="text-4xl font-bold">{header}</h1>
          <p className="text-base font-medium">{subtitle}</p>
          {urls?.iosUrl && (
            <a
              href={urls?.iosUrl}
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
          )}
          {urls?.androidUrl && (
            <a
              href={urls?.androidUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex mr-5"
            >
              <img
                className="h-14 w-auto mx-auto shadow-xl"
                src={googleBadge}
                alt="App Store Logo"
              />
            </a>
          )}
        </div>
        <div className="col-span-1 flex items-center">
          <img
            className="h-32 lg:h-52 w-auto shadow-2xl rounded-lg mx-auto border-8 border-white float-right "
            src={getMediaUrl({ id: logoId, type: 'gifOrImg' })}
            loading="lazy"
            alt="App Logo"
          />
        </div>
      </div>
    </div>
  )
}

// PROPTYPES
const { string, object } = PropTypes

WidgetAppsPresentation.propTypes = {
  header: string,
  logoId: string,
  subtitle: string,
  urls: object,
}

export default WidgetAppsPresentation
