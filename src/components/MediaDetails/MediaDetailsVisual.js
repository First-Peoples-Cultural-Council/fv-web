import React from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'

// FPCC
import { getMediaPath } from 'common/utils/mediaHelpers'
import getIcon from 'common/utils/getIcon'
import { IMAGE, VIDEO } from 'common/constants'
import MediaDetailsSettings from 'components/MediaDetails/MediaDetailsSettings'

function MediaDetailsVisual({ file, type }) {
  const { sitename } = useParams()

  return (
    <div id="MediaDetailsVisual" className="mpb-16 space-y-6 sticky top-0">
      <div className="flex justify-center space-x-2">
        <a href={file?.downloadLink} className="flex-1 btn-outlined">
          {getIcon('Download', 'btn-icon')}
          <span>Download</span>
        </a>

        <Link
          to={`/${sitename}/dashboard/edit/${type}?id=${file?.id}`}
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
          {type === IMAGE && (
            <img
              src={getMediaPath({ mediaObject: file, type: IMAGE })}
              alt={file?.title}
              className="object-contain w-full"
            />
          )}
          {type === VIDEO && (
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
      <MediaDetailsSettings file={file} />
    </div>
  )
}
// PROPTYPES
const { object, oneOf } = PropTypes
MediaDetailsVisual.propTypes = {
  file: object,
  type: oneOf([IMAGE, VIDEO]),
}

export default MediaDetailsVisual
