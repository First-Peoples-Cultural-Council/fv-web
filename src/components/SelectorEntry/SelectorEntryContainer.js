import React from 'react'
import PropTypes from 'prop-types'

// FPCC

import useSearchModal from 'common/hooks/useSearchModal'
import useSearchResultSelector from 'common/hooks/useSearchResultSelector'
import SelectorSearchbox from 'components/SelectorSearchbox'
import SelectorResultsWrapper from 'components/SelectorResultsWrapper'
import SelectorEntryPresentationList from 'components/SelectorEntry/SelectorEntryPresentationList'

function SelectorEntryContainer({ types, visibility, addItem }) {
  const {
    searchQuery,
    setSearchQuery,
    search,
    searchResults,
    hasResults,
    infiniteScroll,
    isLoadingEntries,
    loadRef,
  } = useSearchModal({ types, visibility })

  const { selectedItem, setSelectedItem } = useSearchResultSelector({
    searchResults,
  })

  const addToEntry = () => addItem(selectedItem)

  return (
    <div data-testid="SelectorEntryContainer" className="h-full bg-gray-50">
      <div className="h-full w-full flex flex-col">
        <div className="w-3/4 mx-auto">
          <SelectorSearchbox.Presentation
            onSearchChange={setSearchQuery}
            onSearchSubmit={search}
            searchPlaceholder="Search all words and phrases"
            searchValue={searchQuery}
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
const { arrayOf, func, string } = PropTypes
SelectorEntryContainer.propTypes = {
  types: arrayOf(string),
  visibility: string,
  addItem: func,
}

export default SelectorEntryContainer
