import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import InfiniteLoadBtn from 'components/InfiniteLoadBtn'

function SelectorDocumentsPresentation({
  infiniteQueryResponse,
  formMedia,
  selectedMedia,
  mediaSelectHandler,
}) {
  return (
    <div
      id="SelectorDocumentsPresentation"
      className="p-4 pt-0"
      aria-labelledby="results-header"
    >
      <div>
        <div className="py-4 px-6 text-left">
          <h2
            id="results-header"
            className="text-lg font-bold text-blumine-800"
          >
            Your uploaded documents
          </h2>
        </div>
        <div
          data-testid="SelectorVisualMediaGridPresentation"
          className="p-4 pt-2 overflow-y-auto h-full"
        >
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {infiniteQueryResponse?.hasResults &&
              infiniteQueryResponse?.data?.pages?.map((page) => (
                <React.Fragment key={page?.pageNumber}>
                  {page.results.map((mediaObject) => {
                    if (
                      formMedia?.some((elem) => elem?.id === mediaObject?.id)
                    ) {
                      // If a media file is already in the form
                      // it will not be presented as a choice in the selectMedia dialog box
                      return null
                    }

                    return (
                      <button
                        key={mediaObject?.id}
                        data-testid="media-select-btn"
                        type="button"
                        onClick={() => mediaSelectHandler(mediaObject)}
                        className="group flex items-center justify-between space-x-3 rounded-lg border border-charcoal-300 bg-white px-6 py-5 shadow-xs focus-within:ring-2 focus-within:ring-scarlet-800 focus-within:ring-offset-2 hover:border-charcoal-400"
                      >
                        {getIcon(
                          'Reports',
                          'size-10 fill-current text-charcoal-400',
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-charcoal-900">
                            {mediaObject?.title}
                          </p>
                          <p className="text-sm text-charcoal-500 truncate">
                            {mediaObject?.mimeType}
                          </p>
                        </div>

                        <div className="h-8 w-8 rounded-full bg-white">
                          {selectedMedia?.some(
                            (elem) => elem?.id === mediaObject?.id,
                          ) && (
                            <>
                              {getIcon(
                                'TimesCircleSolid',
                                'hidden group-hover:block h-8 w-8 fill-scarlet-800',
                              )}
                              {getIcon(
                                'CheckCircleSolid',
                                'group-hover:hidden h-8 w-8 fill-jade-500',
                              )}
                            </>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </React.Fragment>
              ))}
          </ul>
          <InfiniteLoadBtn infiniteQueryResponse={infiniteQueryResponse} />
        </div>
      </div>
    </div>
  )
}

// PROPTYPES
const { array, func, object } = PropTypes
SelectorDocumentsPresentation.propTypes = {
  infiniteQueryResponse: object,
  formMedia: array,
  selectedMedia: array,
  mediaSelectHandler: func,
}

export default SelectorDocumentsPresentation
