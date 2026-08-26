import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { getMediaPath } from 'common/utils/mediaHelpers'
import { SMALL, IMAGE } from 'common/constants'

function GalleryPresentationThumbnail({ data }) {
  const imageUrl = getMediaPath({
    type: IMAGE,
    mediaObject: data?.coverImage,
    size: SMALL,
  })

  const conditionalStyle = data?.coverImage && {
    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url(${imageUrl})`,
  }
  const conditionalClass = data?.coverImage
    ? 'bg-center bg-cover text-white'
    : 'text-charcoal-500 bg-charcoal-50'

  return (
    <div
      data-testid={`GalleryPresentationThumbnail_${data?.id}`}
      style={conditionalStyle}
      className={`${conditionalClass} h-44 w-44 rounded-lg overflow-hidden px-3 py-6 lg:py-10 `}
    >
      <div className="h-full flex-col items-center justify-center text-center">
        <div className="text-lg font-medium mb-2">{data?.title}</div>
        <div className="text-sm font-light truncate">
          {data?.titleTranslation}
        </div>
      </div>
    </div>
  )
}
// PROPTYPES
const { object } = PropTypes
GalleryPresentationThumbnail.propTypes = {
  data: object,
}

export default GalleryPresentationThumbnail
