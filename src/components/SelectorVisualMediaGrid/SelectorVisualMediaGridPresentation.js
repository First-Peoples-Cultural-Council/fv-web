import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import { SMALL, IMAGE } from 'common/constants'
import { getMediaPath } from 'common/utils/mediaHelpers'
import InfiniteLoadBtn from 'components/InfiniteLoadBtn'

function SelectorVisualMediaGridPresentation({
  infiniteQueryResponse,
  formMedia,
  selectedMedia,
  mediaSelectHandler,
}) {
  return (
    <div
      data-testid="SelectorVisualMediaGridPresentation"
      className="p-4 pt-0 overflow-y-auto h-full"
    >
      <div className="h-3/4 overflow-y-auto">
        <ul className="p-2 grid grid-cols-4 gap-y-8 gap-x-6 xl:gap-x-8">
          {infiniteQueryResponse?.hasResults &&
            infiniteQueryResponse?.data?.pages?.map((page) => (
              <React.Fragment key={page?.pageNumber}>
                {page.results.map((mediaObject) => {
                  if (formMedia?.some((elem) => elem?.id === mediaObject?.id)) {
                    // If a media file is already in the form
                    // it will not be presented as a choice in the selectMedia dialog box
                    return null
                  }
                  const mediaSrc = getMediaPath({
                    type: IMAGE,
                    mediaObject,
                    size: SMALL,
                  })
                  return (
                    <li key={mediaObject?.id} className="relative group">
                      <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-charcoal-50 focus-within:ring-scarlet-800 block w-full aspect-w-10 aspect-h-7 rounded-lg bg-charcoal-50 overflow-hidden">
                        <img
                          src={mediaSrc}
                          alt={mediaObject?.title}
                          className="group-hover:opacity-75 object-cover pointer-events-none"
                        />
                        <button
                          data-testid="media-select-btn"
                          type="button"
                          className="absolute inset-0 focus:outline-none"
                          onClick={() => mediaSelectHandler(mediaObject)}
                        >
                          <span className="sr-only">
                            View details for {mediaObject?.title}
                          </span>
                        </button>
                      </div>
                      <p className="mt-2 block text-sm font-medium text-charcoal-900 truncate pointer-events-none">
                        {mediaObject?.title}
                      </p>
                      {mediaObject?.width && mediaObject?.height && (
                        <p className="mt-2 block text-sm font-medium text-charcoal-500 truncate pointer-events-none">{`${mediaObject?.width}x${mediaObject?.height}`}</p>
                      )}
                      {selectedMedia?.some(
                        (elem) => elem?.id === mediaObject?.id,
                      ) && (
                        <button
                          data-testid="media-select-btn"
                          type="button"
                          className="absolute top-0 right-0 h-8 w-8 rounded-full bg-white"
                          onClick={() => mediaSelectHandler(mediaObject)}
                        >
                          {getIcon(
                            'TimesCircleSolid',
                            'hidden group-hover:block h-8 w-8 fill-scarlet-800',
                          )}
                          {getIcon(
                            'CheckCircleSolid',
                            'group-hover:hidden h-8 w-8 fill-jade-500',
                          )}
                        </button>
                      )}
                    </li>
                  )
                })}
              </React.Fragment>
            ))}
        </ul>
        <InfiniteLoadBtn infiniteQueryResponse={infiniteQueryResponse} />
      </div>
    </div>
  )
}

// PROPTYPES
const { array, func, object } = PropTypes
SelectorVisualMediaGridPresentation.propTypes = {
  infiniteQueryResponse: object,
  formMedia: array,
  selectedMedia: array,
  mediaSelectHandler: func,
}

export default SelectorVisualMediaGridPresentation
