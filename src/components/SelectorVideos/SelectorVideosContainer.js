import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import SelectorSearchbox from 'components/SelectorSearchbox'
import SelectorResultsWrapper from 'components/SelectorResultsWrapper'
import SelectorVisualMediaGrid from 'components/SelectorVisualMediaGrid'
import useMediaSearch from 'common/dataHooks/useMediaSearch'
import { TYPE_VIDEO } from 'common/constants'

function SelectorVideosContainer({
  savedMedia,
  selectedMedia,
  mediaSelectHandler,
}) {
  const {
    media,
    searchValue,
    handleSearchSubmit,
    handleTextFieldChange,
    infiniteScroll,
    isLoadingEntries,
    loadRef,
    loadLabel,
  } = useMediaSearch({ type: TYPE_VIDEO })

  const hasResults = !!(
    media?.pages !== undefined && media?.pages?.[0]?.results?.length > 0
  )

  return (
    <div data-testid="SelectorVideosContainer" className="h-full bg-gray-50">
      <div className="h-full w-full flex flex-col">
        <div className="w-3/4 mx-auto">
          <SelectorSearchbox.Presentation
            onSearchChange={handleTextFieldChange}
            onSearchSubmit={handleSearchSubmit}
            searchPlaceholder="Search all videos"
            searchValue={searchValue}
          />
        </div>
        <div className="grow mt-2 h-72 overflow-y-scroll">
          <SelectorResultsWrapper.Presentation
            hasResults={hasResults}
            isLoading={isLoadingEntries}
            loadRef={loadRef}
            resultsSection={
              <div aria-labelledby="results-header">
                <h2 id="results-header" className="sr-only">
                  Videos
                </h2>
                <SelectorVisualMediaGrid.Presentation
                  data={media}
                  infiniteScroll={infiniteScroll}
                  loadLabel={loadLabel}
                  savedMedia={savedMedia}
                  selectedMedia={selectedMedia}
                  mediaSelectHandler={mediaSelectHandler}
                />
              </div>
            }
          />
        </div>
      </div>
    </div>
  )
}

// PROPTYPES
const { array, func } = PropTypes
SelectorVideosContainer.propTypes = {
  savedMedia: array,
  selectedMedia: array,
  mediaSelectHandler: func,
}

export default SelectorVideosContainer
