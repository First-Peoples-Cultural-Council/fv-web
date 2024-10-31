import React from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'

// FPCC
import { isDisplayablePropMedia, getMediaPath } from 'common/utils/mediaHelpers'
import getIcon from 'common/utils/getIcon'
import { IMAGE, VIDEO } from 'common/constants'

function MediaDetailsVisual({ file, docType }) {
  const { sitename } = useParams()

  return (
    <div id="MediaDetailsVisual" className="mpb-16 space-y-6 sticky top-0">
      <div className="flex justify-center space-x-2">
        <a href={file?.downloadLink} className="flex-1 btn-outlined">
          {getIcon('Download', 'btn-icon')}
          <span>Download</span>
        </a>

        <Link
          to={`/${sitename}/dashboard/edit/${docType}?id=${file?.id}`}
          data-testid="EntryDrawerEdit"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 btn-contained bg-scarlet-800"
        >
          {getIcon('Pencil', 'btn-icon')}
          <span>Edit</span>
        </Link>
      </div>
      <div>
        <div className="block w-full max-h-1/3-screen rounded-lg overflow-hidden">
          {docType === IMAGE && (
            <img
              src={getMediaPath({ mediaObject: file, type: IMAGE })}
              alt={file?.title}
              className="object-contain w-full"
            />
          )}
          {docType === VIDEO && (
            <video
              className="w-full aspect-video"
              src={getMediaPath({ mediaObject: file, type: VIDEO })}
              controls
            />
          )}
        </div>
        <div className="mt-4 flex items-start">
          <div>
            <h2 className="text-lg font-medium text-charcoal-900">
              <span className="sr-only">Details for </span>
              {file?.title}
            </h2>
            {file?.width && file?.height && (
              <p className="text-sm font-medium text-charcoal-500">{`${file?.width} x ${file?.height}`}</p>
            )}
          </div>
        </div>
      </div>
      <div>
        <h3 className="font-medium text-charcoal-900">Information</h3>
        <dl className="mt-2 border-t border-b border-charcoal-100 divide-y divide-charcoal-100">
          {file?.id &&
            Object.keys(file).map((key) => {
              if (isDisplayablePropMedia(key, file[key])) {
                if (key === 'description') {
                  return null
                }
                return (
                  <div
                    key={key}
                    className="py-3 flex justify-between text-sm font-medium"
                  >
                    <dt className="text-charcoal-500 capitalize">
                      {key === 'mimeType' ? 'File Type' : key}
                    </dt>
                    <dd className="text-charcoal-900 truncate pl-8">
                      {file[key]}
                    </dd>
                  </div>
                )
              }
              return null
            })}
        </dl>
      </div>
      {file?.description.length > 0 && (
        <div>
          <h3 className="font-medium text-fv-charcoal">Description</h3>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-sm text-fv-charcoal-light italic">
              {file?.description}
            </p>
          </div>
        </div>
      )}
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
