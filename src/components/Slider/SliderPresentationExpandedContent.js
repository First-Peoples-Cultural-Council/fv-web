import React from 'react'
import PropTypes from 'prop-types'

import { getMediaUrl } from 'common/utils/urlHelpers'
import getIcon from 'common/utils/getIcon'

function SliderPresentationExpandedContent({ item, onCloseExpandedContent }) {
  const hasCoverImage = item.photos?.length > 0
  const conditionalClass = hasCoverImage
    ? 'bg-center bg-cover text-white'
    : 'text-charcoal-500 bg-charcoal-50'
  const conditionalStyle = hasCoverImage
    ? {
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), url(${getMediaUrl(
          {
            type: 'image',
            id: item.photos[0],
          },
        )})`,
      }
    : {}

  return (
    <div
      key={item.id}
      className="relative flex-basis text-center m-2 transition-transform duration-300 delay-100"
    >
      <button
        type="button"
        className="absolute top-3 right-3 text-white"
        onClick={onCloseExpandedContent}
      >
        {getIcon('Close', 'fill-current w-8 h-8')}
      </button>
      <div
        style={conditionalStyle}
        className={`${conditionalClass} h-44 lg:h-60 flex items-center w-full rounded-lg`}
      >
        <span className="sr-only">Go to {item.title}</span>
        <div className="w-full flex flex-col text-center items-center">
          <div className="text-lg lg:text-2xl font-medium mb-2">
            {item.title}{' '}
            {item.videos?.length > 0 &&
              getIcon(
                'Video',
                'inline-flex text-charcoal-500 fill-current w-6',
              )}
          </div>
          <div className="text-base font-light">{item.titleTranslation}</div>
          <div className="text-base font-light">{item.author}</div>
        </div>
      </div>
    </div>
  )
}

// PROPTYPES
const { func, object } = PropTypes
SliderPresentationExpandedContent.propTypes = {
  item: object,
  onCloseExpandedContent: func,
}

export default SliderPresentationExpandedContent
