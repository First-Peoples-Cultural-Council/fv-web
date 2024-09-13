import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { getFriendlyDocTypes } from 'common/utils/stringHelpers'
import getIcon from 'common/utils/getIcon'
import useSearchModal from 'common/hooks/useSearchModal'
import useSearchResultSelector from 'common/hooks/useSearchResultSelector'
import SearchSelector from 'components/SearchSelector'
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

  const docLabel =
    types.length > 1 ? '' : getFriendlyDocTypes({ docTypes: types })
  const buttonLabel = `Add ${docLabel} to document`
  const labelPlural = getFriendlyDocTypes({
    docTypes: types,
    plural: true,
    isAnd: true,
  })

  return (
    <SearchSelector.Presentation
      searchQuery={searchQuery}
      searchPromptText={`Search all ${labelPlural}`}
      setSearchQuery={setSearchQuery}
      search={search}
      resultsSection={
        <>
          <div className="w-full flex justify-center mb-5 mt-5">
            <button
              data-testid={`add-${docLabel}`}
              type="button"
              onClick={() => addItem(selectedItem)}
              className="btn-contained mx-auto bg-secondary"
            >
              {getIcon('Add', 'btn-icon')}
              <span>{buttonLabel}</span>
            </button>
          </div>
          <div className="p-4 pt-0">
            <SelectorEntryPresentationList
              types={types}
              searchResults={searchResults}
              selected={selectedItem}
              setSelected={setSelectedItem}
              infiniteScroll={infiniteScroll}
            />
          </div>
        </>
      }
      isLoadingEntries={isLoadingEntries}
      hasResults={hasResults}
      loadRef={loadRef}
    />
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
