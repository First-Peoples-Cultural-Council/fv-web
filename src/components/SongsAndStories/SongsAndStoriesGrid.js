import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { SMALL, IMAGE } from 'common/constants'
import { getMediaPath } from 'common/utils/mediaHelpers'
import getIcon from 'common/utils/getIcon'

function getConditionalStyle({ item }) {
  if (item?.coverVisual?.type === IMAGE) {
    // If a cover image is present
    const imageUrl = `url(${getMediaPath({
      type: item.coverVisual?.type,
      mediaObject: item.coverVisual?.entry,
      size: SMALL,
    })})`

    if (item?.hideOverlay) {
      return {
        backgroundImage: imageUrl,
      }
    }
    return {
      backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.3)), ${imageUrl}`,
    }
  }
  return {}
}

function getConditonalClass({ item }) {
  if (item?.coverVisual?.type === IMAGE) {
    if (item?.hideOverlay) {
      return 'bg-center bg-cover'
    }
    return 'bg-center bg-cover text-white'
  }
  return 'text-fv-charcoal-light bg-gray-100'
}

function getOpacityClass({ item }) {
  if (item?.coverVisual?.type === IMAGE && item?.hideOverlay) {
    return 'opacity-0'
  }
  return 'group-hover:opacity-75'
}

function SongsAndStoriesGrid({
  pluralDocType,
  items,
  showNoResultsMessage,
  handleItemClick,
}) {
  return (
    <section className="mt-4 lg:mt-8 pb-16" aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" className="sr-only">
        {pluralDocType}
      </h2>

      <ul className="grid grid-cols-1 gap-y-8 md:grid-cols-3 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {items?.pages?.map((page) => (
          <React.Fragment key={page.pageNumber}>
            {page?.results?.map((item) => (
              <li key={item.id} className="relative">
                <button
                  type="button"
                  style={getConditionalStyle({ item })}
                  className={`${getConditonalClass({
                    item,
                  })} group h-44 lg:h-60 flex items-center focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-storyText group w-full rounded-lg overflow-hidden`}
                  onClick={() => handleItemClick(item)}
                  data-testid="SongAndStoriesGridTile"
                >
                  <div
                    className={`${getOpacityClass({
                      item,
                    })} w-full px-3 lg:px-5 py-6 lg:py-10 rounded-lg flex flex-col text-center items-center`}
                  >
                    <div className="text-lg lg:text-2xl font-medium mb-2">
                      {item.title}{' '}
                      {item.videos?.length > 0 &&
                        getIcon(
                          'Video',
                          'inline-flex text-gray-400 fill-current w-6',
                        )}
                    </div>
                    <div className="text-base font-light">
                      {item.titleTranslation}
                    </div>
                    <div className="text-base font-light">{item.author}</div>
                    <span className="sr-only">Go to {item.title}</span>
                  </div>
                </button>
              </li>
            ))}
            {showNoResultsMessage(page)}
          </React.Fragment>
        ))}
      </ul>
    </section>
  )
}

const { func, object, string } = PropTypes
SongsAndStoriesGrid.propTypes = {
  pluralDocType: string,
  items: object,
  handleItemClick: func,
  showNoResultsMessage: func,
}

export default SongsAndStoriesGrid
