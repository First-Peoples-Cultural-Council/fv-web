import React from 'react'
import PropTypes from 'prop-types'

import { getMediaUrl } from 'common/utils/urlHelpers'
import getIcon from 'common/utils/getIcon'

function SliderPresentationTile({ currentSlide, tileRef, item, onTileClick }) {
  const isActive = currentSlide?.id === item.id
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
      ref={tileRef}
      className={`flex-basis text-center mx-2 transition-transform duration-300 delay-100 transform ${
        isActive ? 'border-2 border-white' : ''
      }`}
    >
      <button
        type="button"
        style={conditionalStyle}
        className={`${conditionalClass} h-40 w-40 md:h-44 md:w-44 lg:h-72 lg:w-72 flex items-center rounded-lg shadow-lg`}
        onClick={() => onTileClick(item)}
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
      </button>
    </div>
  )
}

// PROPTYPES
const { func, object } = PropTypes
SliderPresentationTile.propTypes = {
  currentSlide: object,
  tileRef: object,
  item: object,
  onTileClick: func,
}

export default SliderPresentationTile
