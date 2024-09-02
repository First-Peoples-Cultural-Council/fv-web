import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'

function VisualMediaSelectorPresentation({
  data,
  infiniteScroll,
  loadLabel,
  savedMedia,
  selectedMedia,
  mediaSelectHandler,
}) {
  const { isFetchingNextPage, fetchNextPage, hasNextPage } = infiniteScroll

  const [hoverArray, setHoverArray] = useState([])

  function handleHover(elementIndex, isLeaving) {
    setHoverArray((previousArray) => {
      if (isLeaving) {
        return previousArray.filter((item) => item !== elementIndex)
      }
      return [...previousArray, elementIndex]
    })
  }

  return (
    <div
      data-testid="VisualMediaSelectorPresentation"
      className="overflow-y-auto h-full"
    >
      <div className="h-3/4 overflow-y-auto">
        <ul className="p-2 grid grid-cols-4 gap-y-8 gap-x-6 xl:gap-x-8">
          {data?.pages !== undefined &&
            data?.pages?.[0]?.results?.length > 0 &&
            data?.pages?.map((page) => (
              <React.Fragment key={page?.pageNumber}>
                {page.results.map((doc, elementIndex) => {
                  if (savedMedia?.some((elemId) => elemId === doc?.id)) {
                    // If a media file is already attached to the document
                    // it will not be presented as a choice in the selectMedia dialog box
                    return null
                  }
                  return (
                    <li key={doc?.id} className="relative">
                      <div className="focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-secondary group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 overflow-hidden">
                        <img
                          src={doc?.thumbnail}
                          alt={doc?.title}
                          className="group-hover:opacity-75 object-cover pointer-events-none"
                        />
                        <button
                          data-testid="media-select-btn"
                          type="button"
                          className="absolute inset-0 focus:outline-none"
                          onClick={() => mediaSelectHandler(doc?.id)}
                          onMouseEnter={() => {
                            handleHover(elementIndex, false)
                          }}
                          onMouseLeave={() => {
                            handleHover(elementIndex, true)
                          }}
                        >
                          <span className="sr-only">
                            View details for {doc?.title}
                          </span>
                        </button>
                      </div>
                      <p className="mt-2 block text-sm font-medium text-fv-charcoal truncate pointer-events-none">
                        {doc?.title}
                      </p>
                      {doc?.width && doc?.height && (
                        <p className="mt-2 block text-sm font-medium text-fv-charcoal-light truncate pointer-events-none">{`${doc?.width}x${doc?.height}`}</p>
                      )}
                      {selectedMedia?.some((elemId) => elemId === doc?.id) && (
                        <button
                          data-testid="media-select-btn"
                          type="button"
                          onClick={() => mediaSelectHandler(doc?.id)}
                          onMouseEnter={() => {
                            handleHover(elementIndex, false)
                          }}
                          onMouseLeave={() => {
                            handleHover(elementIndex, true)
                          }}
                        >
                          {hoverArray.includes(elementIndex)
                            ? getIcon(
                                'TimesCircleSolid',
                                'absolute top-0 right-0 h-8 w-8 fill-red-700',
                              )
                            : getIcon(
                                'CheckCircleSolid',
                                'absolute top-0 right-0 h-8 w-8 fill-green-700',
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
VisualMediaSelectorPresentation.propTypes = {
  data: object,
  infiniteScroll: object,
  loadLabel: string,
  savedMedia: array,
  selectedMedia: array,
  mediaSelectHandler: func,
}

export default VisualMediaSelectorPresentation