import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import AudioNative from 'components/AudioNative'
import { isDisplayablePropMedia } from 'common/utils/mediaHelpers'

function MediaDetailsAudio({ file }) {
  return (
    <div id="MediaDetailsAudio" className="mpb-16 space-y-6">
      <div>
        <div className="block w-full rounded-lg overflow-hidden">
          <AudioNative styling="w-full" audioObject={file} />
        </div>
        <div className="mt-4 flex items-start">
          <div>
            <h2 className="text-lg font-medium text-fv-charcoal">
              <span className="sr-only">Details for </span>
              {file?.filename}
            </h2>
            <p className="text-sm font-medium text-fv-charcoal-light">
              {file?.title}
            </p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-medium text-fv-charcoal">Information</h3>
        <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
          {file?.id &&
            Object.keys(file).map((key) => {
              if (isDisplayablePropMedia(key, file[key])) {
                return (
                  <div
                    key={key}
                    className="py-3 flex justify-between text-sm font-medium"
                  >
                    <dt className="text-fv-charcoal-light">{key}</dt>
                    <dd className="text-fv-charcoal max-w-1/2">{file[key]}</dd>
                  </div>
                )
              }
              return null
            })}
        </dl>
        {file?.speakers.length > 0 && (
          <dl className="mt-2 border-b border-gray-200 divide-y divide-gray-200">
            <div className="py-3 flex justify-between text-sm font-medium">
              <dt className="text-fv-charcoal-light">Speakers</dt>
              <dd className="text-fv-charcoal">
                {file?.speakers?.map((speaker) => speaker?.name).join(', ')}
              </dd>
            </div>
          </dl>
        )}
      </div>
      <div>
        <h3 className="font-medium text-fv-charcoal">Description</h3>
        <div className="mt-2 flex items-center justify-between">
          <p className="text-sm text-fv-charcoal-light italic">
            {file?.description}
          </p>
        </div>
      </div>
      <div className="flex">
        <a
          href={file?.downloadLink}
          className="flex-1 bg-secondary py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-secondary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-word"
        >
          <div className="flex w-full h-full items-center justify-center">
            {getIcon('Download', 'w-6 h-6 fill-current mr-3 inline-flex')}{' '}
            Download
          </div>
        </a>
      </div>
    </div>
  )
}

// PROPTYPES
const { object } = PropTypes
MediaDetailsAudio.propTypes = {
  file: object,
}

export default MediaDetailsAudio
