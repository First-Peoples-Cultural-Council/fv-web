import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { isDisplayablePropMedia, getMediaPath } from 'common/utils/mediaHelpers'
import getIcon from 'common/utils/getIcon'
import { IMAGE, VIDEO } from 'common/constants'

function MediaDetailsVisual({ file, docType }) {
  return (
    <div id="MediaDetailsVisual" className="mpb-16 space-y-6 sticky top-0">
      <div>
        <div className="block w-full h-120 rounded-lg overflow-hidden">
          {docType === IMAGE && (
            <img
              src={getMediaPath({ mediaObject: file, type: IMAGE })}
              alt={file?.title}
              className="object-contain w-full h-120"
            />
          )}
          {docType === VIDEO && (
            <video
              className="object-contain w-full h-120"
              src={getMediaPath({ mediaObject: file, type: VIDEO })}
              controls
            />
          )}
        </div>
        <div className="mt-4 flex items-start">
          <div>
            <h2 className="text-lg font-medium text-fv-charcoal">
              <span className="sr-only">Details for </span>
              {file?.title}
            </h2>
            {file?.width && file?.height && (
              <p className="text-sm font-medium text-fv-charcoal-light">{`${file?.width} x ${file?.height}`}</p>
            )}
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
                    <dt className="text-fv-charcoal-light capitalize">
                      {key === 'mimeType' ? 'File Type' : key}
                    </dt>
                    <dd className="text-fv-charcoal truncate pl-8">
                      {file[key]}
                    </dd>
                  </div>
                )
              }
              return null
            })}
        </dl>
      </div>
      <div className="flex">
        <a
          href={file?.downloadLink}
          className="btn-contained flex-1 bg-secondary"
        >
          {getIcon('Download', 'btn-icon')}
          <span>Download</span>
        </a>
      </div>
    </div>
  )
}
// PROPTYPES
const { object, oneOf } = PropTypes
MediaDetailsVisual.propTypes = {
  file: object,
  docType: oneOf([IMAGE, VIDEO]),
}

export default MediaDetailsVisual
