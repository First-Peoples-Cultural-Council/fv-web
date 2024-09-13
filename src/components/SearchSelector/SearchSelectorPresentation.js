import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import SelectorSearchbox from 'components/SelectorSearchbox'
import SelectorResultsWrapper from 'components/SelectorResultsWrapper'

function SearchSelectorPresentation({
  isSelectDialog = false,
  searchQuery,
  searchPromptText,
  setSearchQuery,
  search,
  resultsSection,
  isLoadingEntries,
  hasResults,
  loadRef,
}) {
  return (
    <div id="SearchSelectorPresentation" className="h-full bg-gray-50">
      <div className="h-full w-full flex flex-col">
        <div className={`${isSelectDialog ? 'w-3/4 mx-auto' : 'w-full'}`}>
          <SelectorSearchbox.Presentation
            onSearchChange={setSearchQuery}
            onSearchSubmit={search}
            searchPlaceholder={searchPromptText}
            searchValue={searchQuery}
          />
        </div>
        <div
          className={isSelectDialog ? 'grow mt-2 h-72 overflow-y-scroll' : ''}
        >
          <SelectorResultsWrapper.Presentation
            hasResults={hasResults}
            isLoading={isLoadingEntries}
            loadRef={loadRef}
            resultsSection={resultsSection}
          />
        </div>
      </div>
    </div>
  )
}

// PROPTYPES
const { bool, func, node, object, string } = PropTypes
SearchSelectorPresentation.propTypes = {
  isSelectDialog: bool,
  searchQuery: string,
  searchPromptText: string,
  setSearchQuery: func,
  search: func,
  resultsSection: node,
  isLoadingEntries: bool,
  hasResults: bool,
  loadRef: object,
}

export default SearchSelectorPresentation
