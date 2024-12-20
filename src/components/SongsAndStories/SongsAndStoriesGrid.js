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
  return 'text-charcoal-500 bg-charcoal-50'
}

function getOpacityClass({ item }) {
  if (item?.coverVisual?.type === IMAGE && item?.hideOverlay) {
    return 'opacity-0'
  }
  return 'group-hover:opacity-75'
}

function SongsAndStoriesGrid({ labels, data, handleItemClick }) {
  return (
    <section className="mt-4 lg:mt-8" aria-labelledby="gallery-heading">
      <h2 id="gallery-heading" className="sr-only">
        {labels?.titlecase}
      </h2>

      <ul className="grid grid-cols-1 gap-y-8 md:grid-cols-3 md:gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {data?.pages?.map((page) => (
          <React.Fragment key={page.pageNumber}>
            {page?.results?.map((item) => (
              <li key={item.id} className="relative">
                <button
                  type="button"
                  style={getConditionalStyle({ item })}
                  className={`${getConditonalClass({
                    item,
                  })} group h-44 lg:h-60 flex items-center focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-charcoal-50 focus-within:ring-ochre-800 group w-full rounded-lg overflow-hidden`}
                  onClick={() => handleItemClick(item)}
                  data-testid="song-story-grid-tile"
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
                          'inline-flex text-charcoal-500 fill-current w-6',
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
          </React.Fragment>
        ))}
      </ul>
    </section>
  )
}

const { func, object } = PropTypes
SongsAndStoriesGrid.propTypes = {
  labels: object,
  data: object,
  handleItemClick: func,
}

export default SongsAndStoriesGrid
