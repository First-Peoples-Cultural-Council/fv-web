import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'

function SelectorVisualMediaGridPresentation({
  data,
  infiniteScroll,
  loadLabel,
  savedMedia,
  selectedMedia,
  mediaSelectHandler,
}) {
  const { isFetchingNextPage, fetchNextPage, hasNextPage } = infiniteScroll

  return (
    <div
      data-testid="SelectorVisualMediaGridPresentation"
      className="p-4 pt-0 overflow-y-auto h-full"
    >
      <div className="h-3/4 overflow-y-auto">
        <ul className="p-2 grid grid-cols-4 gap-y-8 gap-x-6 xl:gap-x-8">
          {data?.pages !== undefined &&
            data?.pages?.[0]?.results?.length > 0 &&
            data?.pages?.map((page) => (
              <React.Fragment key={page?.pageNumber}>
                {page.results.map((mediaObject) => {
                  if (
                    savedMedia?.some((elem) => elem?.id === mediaObject?.id)
                  ) {
                    // If a media file is already attached to the document
                    // it will not be presented as a choice in the selectMedia dialog box
                    return null
                  }
                  return (
                    <li key={mediaObject?.id} className="relative group">
                      <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-secondary block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden">
                        <img
                          src={mediaObject?.thumbnail}
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
                      <p className="mt-2 block text-sm font-medium text-fv-charcoal truncate pointer-events-none">
                        {mediaObject?.title}
                      </p>
                      {mediaObject?.width && mediaObject?.height && (
                        <p className="mt-2 block text-sm font-medium text-fv-charcoal-light truncate pointer-events-none">{`${mediaObject?.width}x${mediaObject?.height}`}</p>
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
                            'hidden group-hover:block h-8 w-8 fill-secondary',
                          )}
                          {getIcon(
                            'CheckCircleSolid',
                            'group-hover:hidden h-8 w-8 fill-bgGreen',
                          )}
                        </button>
                      )}
                    </li>
                  )
                })}
              </React.Fragment>
            ))}
        </ul>
        <div className="pt-10 text-center text-fv-charcoal font-medium">
          <button
            data-testid="load-btn"
            type="button"
            className={!hasNextPage ? 'cursor-text' : ''}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
          >
            {loadLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

// PROPTYPES
const { array, func, object, string } = PropTypes
SelectorVisualMediaGridPresentation.propTypes = {
  data: object,
  infiniteScroll: object,
  loadLabel: string,
  savedMedia: array,
  selectedMedia: array,
  mediaSelectHandler: func,
}

export default SelectorVisualMediaGridPresentation
