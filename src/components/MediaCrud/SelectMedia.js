import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import MediaItemsLayout from 'components/MediaItemsLayout'
import SearchSelectorPresentation from 'components/SearchSelector/SearchSelectorPresentation'
import { DOC_AUDIO, DOC_IMAGE, DOC_VIDEO } from 'common/constants'

function SelectMedia({
  docType,
  searchValue,
  handleSearchSubmit,
  handleTextFieldChange,
  fetchedMedia,
  savedMedia,
  selectedMedia,
  mediaSelectHandler,
  infiniteScroll,
  isLoadingEntries,
  loadRef,
  loadLabel,
  docTypeLabelPlural,
}) {
  const hasResults = fetchedMedia?.pages !== undefined && fetchedMedia?.pages?.[0]?.entries?.length > 0 ? true : false
  const BrowserComponent = docType === DOC_AUDIO ? MediaItemsLayout.Audio : MediaItemsLayout.Visual

  return (
    <div id="SelectMedia" className="h-full">
      <SearchSelectorPresentation
        searchQuery={searchValue}
        searchPromptText={`Search all ${docTypeLabelPlural}`}
        setSearchQuery={handleTextFieldChange}
        search={handleSearchSubmit}
        isSelectDialog={true}
        resultsSection={
          <div className="p-4 pt-0" aria-labelledby="results-header">
            <h2 id="results-header" className="sr-only">
              {docTypeLabelPlural}
            </h2>
            <BrowserComponent
              data={fetchedMedia}
              docType={docType}
              infiniteScroll={infiniteScroll}
              loadLabel={loadLabel}
              selection={true}
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
const { array, bool, func, object, string, oneOf } = PropTypes
SelectMedia.propTypes = {
  docType: oneOf([DOC_AUDIO, DOC_IMAGE, DOC_VIDEO]),
  searchValue: string,
  handleSearchSubmit: func,
  handleTextFieldChange: func,
  fetchedMedia: object,
  savedMedia: array,
  selectedMedia: array,
  mediaSelectHandler: func,
  infiniteScroll: object,
  isLoadingEntries: bool,
  loadRef: object,
  loadLabel: string,
  docTypeLabelPlural: string,
}

export default SelectMedia
