import React from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'

// FPCC
import { isDisplayablePropMedia } from 'common/utils/mediaHelpers'
import getIcon from 'common/utils/getIcon'
import {
  AUDIO_PATH,
  DOCUMENT_PATH,
  IMAGE_PATH,
  VIDEO_PATH,
} from 'common/constants'

function DashboardMediaDetailsPresentation({ file, mediaTypePath, thumbnail }) {
  const { sitename } = useParams()
  return (
    <div
      id="DashboardMediaDetailsPresentation"
      className="min-h-screen w-full pb-16 px-8 sticky top-16 bg-white border-1 border-charcoal-100"
    >
      <div className="flex justify-center space-x-2 py-5">
        <a href={file?.downloadLink} className="flex-1 btn-outlined">
          {getIcon('Download', 'btn-icon')}
          <span>Download</span>
        </a>

        <Link
          to={`/${sitename}/dashboard/edit/${mediaTypePath}?id=${file?.id}`}
          data-testid="EntryDrawerEdit"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 btn-contained bg-scarlet-800"
        >
          {getIcon('Pencil', 'btn-icon')}
          <span>Edit</span>
        </Link>
      </div>
      <div className="space-y-2">
        <div>{thumbnail}</div>
        <h2 className="text-lg font-medium text-charcoal-900">
          <span className="sr-only">Details for </span>
          {file?.title}
        </h2>
        <div>
          <h3 className="font-medium text-charcoal-900">Details</h3>
          <dl className="border-t border-b border-charcoal-100 divide-y divide-charcoal-100">
            {file?.id &&
              Object.keys(file).map((key) => {
                if (isDisplayablePropMedia(key, file[key])) {
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
      </div>
    </div>
  )
}
// PROPTYPES
const { node, object, oneOf } = PropTypes
DashboardMediaDetailsPresentation.propTypes = {
  thumbnail: node,
  file: object,
  mediaTypePath: oneOf([AUDIO_PATH, DOCUMENT_PATH, IMAGE_PATH, VIDEO_PATH]),
}

export default DashboardMediaDetailsPresentation
