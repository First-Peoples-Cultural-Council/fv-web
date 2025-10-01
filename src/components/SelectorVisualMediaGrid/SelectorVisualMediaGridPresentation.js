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
                      <div className="block w-full rounded-lg bg-charcoal-50 overflow-hidden">
                        <img
                          src={mediaSrc}
                          alt={mediaObject?.title}
                          className="group-hover:opacity-75 aspect-3/2 w-full object-cover"
                        />
                        <button
                          data-testid="media-select-btn"
                          type="button"
                          className="absolute inset-0 focus:outline-hidden"
                          onClick={() => mediaSelectHandler(mediaObject)}
                        />
                      </div>
                      <div className="my-2 space-y-1 text-xs text-charcoal-900 truncate">
                        <p className="truncate text-sm">{mediaObject?.title}</p>
                        {mediaObject?.width && mediaObject?.height && (
                          <p className="truncate">{`${mediaObject?.width} x ${mediaObject?.height}`}</p>
                        )}
                        <p className="truncate">{mediaObject?.created}</p>
                      </div>
                      {selectedMedia?.some(
                        (elem) => elem?.id === mediaObject?.id,
                      ) && (
                        <button
                          data-testid="media-select-btn"
                          type="button"
                          className="absolute top-1 right-1"
                          onClick={() => mediaSelectHandler(mediaObject)}
                        >
                          <div className="btn-primary btn-md-icon hidden group-hover:flex">
                            {getIcon('Close')}
                          </div>
                          <div className="btn-primary btn-md-icon group-hover:hidden">
                            {getIcon('Checkmark')}
                          </div>
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
