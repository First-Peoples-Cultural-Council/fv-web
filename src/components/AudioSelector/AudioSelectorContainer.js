import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import SearchSelectorPresentation from 'components/SearchSelector/SearchSelectorPresentation'
import AudioSelectorPresentation from 'components/AudioSelector/AudioSelectorPresentation'
import useMediaSearch from 'common/dataHooks/useMediaSearch'
import { TYPE_AUDIO } from 'common/constants'

function AudioSelectorContainer({
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
  } = useMediaSearch({ type: TYPE_AUDIO })

  const hasResults = !!(
    media?.pages !== undefined && media?.pages?.[0]?.results?.length > 0
  )

  return (
    <div data-testid="AudioSelectorContainer" className="h-full">
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
            <AudioSelectorPresentation
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
AudioSelectorContainer.propTypes = {
  savedMedia: array,
  selectedMedia: array,
  mediaSelectHandler: func,
}

export default AudioSelectorContainer
