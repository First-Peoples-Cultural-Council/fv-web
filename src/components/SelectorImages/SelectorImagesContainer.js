import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import SearchSelector from 'components/SearchSelector'
import SelectorVisualMediaGrid from 'components/SelectorVisualMediaGrid'
import useMediaSearch from 'common/dataHooks/useMediaSearch'
import { TYPE_IMAGE } from 'common/constants'

function SelectorImagesContainer({
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
  } = useMediaSearch({ type: TYPE_IMAGE })

  const hasResults = !!(
    media?.pages !== undefined && media?.pages?.[0]?.results?.length > 0
  )

  return (
    <div data-testid="SelectorImagesContainer" className="h-full">
      <SearchSelector.Presentation
        searchQuery={searchValue}
        searchPromptText="Search all images"
        setSearchQuery={handleTextFieldChange}
        search={handleSearchSubmit}
        isSelectDialog
        resultsSection={
          <div className="p-4 pt-0" aria-labelledby="results-header">
            <h2 id="results-header" className="sr-only">
              Images
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
        isLoadingEntries={isLoadingEntries}
        hasResults={hasResults}
        loadRef={loadRef}
      />
    </div>
  )
}

// PROPTYPES
const { array, func } = PropTypes
SelectorImagesContainer.propTypes = {
  savedMedia: array,
  selectedMedia: array,
  mediaSelectHandler: func,
}

export default SelectorImagesContainer
