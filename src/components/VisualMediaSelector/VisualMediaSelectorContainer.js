import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import SearchSelectorPresentation from 'components/SearchSelector/SearchSelectorPresentation'
import VisualMediaSelectorPresentation from 'components/VisualMediaSelector/VisualMediaSelectorPresentation'
import useMediaSearch from 'common/dataHooks/useMediaSearch'
import { TYPE_VIDEO, TYPE_IMAGE } from 'common/constants'

function VisualMediaSelectorContainer({
  savedMedia,
  selectedMedia,
  mediaSelectHandler,
  type,
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
  } = useMediaSearch({ type })

  const hasResults = !!(
    media?.pages !== undefined && media?.pages?.[0]?.results?.length > 0
  )

  return (
    <div data-testid="VisualMediaSelectorContainer" className="h-full">
      <SearchSelectorPresentation
        searchQuery={searchValue}
        searchPromptText="Search all audio"
        setSearchQuery={handleTextFieldChange}
        search={handleSearchSubmit}
        isSelectDialog
        resultsSection={
          <div className="p-4 pt-0" aria-labelledby="results-header">
            <h2 id="results-header" className="sr-only">
              Audio
            </h2>
            <VisualMediaSelectorPresentation
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
const { array, func, oneOf } = PropTypes
VisualMediaSelectorContainer.propTypes = {
  savedMedia: array,
  selectedMedia: array,
  mediaSelectHandler: func,
  type: oneOf([TYPE_IMAGE, TYPE_VIDEO]),
}

export default VisualMediaSelectorContainer
