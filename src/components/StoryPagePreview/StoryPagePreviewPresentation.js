import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { DOC_IMAGE, DOC_VIDEO } from 'common/constants'
import { getMediaUrl } from 'common/utils/urlHelpers'

function StoryPagePreviewPresentation({ page, pageNumber }) {
  return (
    <div
      data-testid="StoryPagePreview"
      className="w-full grid grid-cols-11 gap-8 p-4"
    >
      <div className="col-span-1">{pageNumber}</div>
      <div className="col-span-4 h-50 overflow-hidden">
        {page?.visualMedia?.docType === DOC_IMAGE && (
          <img
            src={getMediaUrl({
              type: 'image',
              id: page?.visualMedia?.docId,
              viewName: 'Thumbnail',
            })}
            className="object-cover rounded-md"
          />
        )}
        {page?.visualMedia?.docType === DOC_VIDEO && (
          <video
            src={getMediaUrl({
              type: 'video',
              id: page?.visualMedia?.docId,
            })}
            className="object-cover"
            controls
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
      <div className="col-span-5">
        <p>{page?.textPreview}</p>
      </div>
    </div>
  )
}

// PROPTYPES
const { object, string } = PropTypes
StoryPagePreviewPresentation.propTypes = {
  page: object,
  pageNumber: string,
}

export default StoryPagePreviewPresentation
