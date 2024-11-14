import React from 'react'
import PropTypes from 'prop-types'

// FPCC

import useSearchModal from 'common/hooks/useSearchModal'
import useSearchResultSelector from 'common/hooks/useSearchResultSelector'
import SelectorSearchbox from 'components/SelectorSearchbox'
import SelectorResultsWrapper from 'components/SelectorResultsWrapper'
import SelectorEntryPresentationList from 'components/SelectorEntry/SelectorEntryPresentationList'

function SelectorEntryContainer({
  formEntries,
  updateFormEntries,
  types,
  visibility,
}) {
  const {
    displayedSearchTerm,
    handleSearchTermChange,
    handleSearchSubmit,
    searchResults,
    hasResults,
    infiniteScroll,
    isLoadingEntries,
    loadRef,
  } = useSearchModal({ types, visibility })

  const { selectedItem, setSelectedItem } = useSearchResultSelector({
    searchResults,
  })

  const addToEntry = () => updateFormEntries(selectedItem)

  return (
    <div data-testid="SelectorEntryContainer" className="h-full bg-charcoal-50">
      <div className="h-full w-full flex flex-col py-4">
        <div className="w-3/4 mx-auto bg-white rounded-lg overflow-hidden">
          <SelectorSearchbox.Presentation
            onSearchChange={handleSearchTermChange}
            onSearchSubmit={handleSearchSubmit}
            searchPlaceholder="Search all words and phrases"
            searchValue={displayedSearchTerm}
          />
        </div>
        <div className="grow mt-2 h-72 overflow-y-scroll">
          <SelectorResultsWrapper.Presentation
            hasResults={hasResults}
            isLoading={isLoadingEntries}
            loadRef={loadRef}
            resultsSection={
              <SelectorEntryPresentationList
                types={types}
                searchResults={searchResults}
                formEntries={formEntries}
                selected={selectedItem}
                setSelected={setSelectedItem}
                infiniteScroll={infiniteScroll}
                addToEntry={addToEntry}
              />
            }
          />
        </div>
      </div>
    </div>
  )
}

// PROPTYPES
const { array, arrayOf, func, string } = PropTypes
SelectorEntryContainer.propTypes = {
  formEntries: array,
  updateFormEntries: func,
  types: arrayOf(string),
  visibility: string,
}

export default SelectorEntryContainer
