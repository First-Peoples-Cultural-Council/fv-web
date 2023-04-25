import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { getFriendlyDocTypes } from 'common/stringHelpers'
import getIcon from 'common/getIcon'
import useModalDocumentSearch from 'common/search/useModalDocumentSearch'
import useSearchResultSelector from 'common/useSearchResultSelector'
import SearchSelector from 'components/SearchSelector'
import EntrySelectorPresentationList from 'components/EntrySelector/EntrySelectorPresentationList'

function EntrySelectorContainer({ docTypes, addItem }) {
  const {
    searchQuery,
    setSearchQuery,
    search,
    searchResults,
    hasResults,
    infiniteScroll,
    isLoadingEntries,
    loadRef,
  } = useModalDocumentSearch({ docTypes })

  const { selectedItem, setSelectedItem } = useSearchResultSelector({
    searchResults,
  })

  const docLabel = docTypes.length > 1 ? '' : getFriendlyDocTypes({ docTypes })
  const buttonLabel = `Add ${docLabel} to document`
  const labelPlural = getFriendlyDocTypes({
    docTypes,
    plural: true,
    isAnd: true,
  })

  return (
    <SearchSelector.Presentation
      searchQuery={searchQuery}
      searchPromptText={`Search all ${labelPlural}`}
      setSearchQuery={setSearchQuery}
      search={search}
      headerSection={
        <button
          onClick={() => addItem(selectedItem?.id)}
          className="mx-auto bg-secondary border border-transparent rounded-lg shadow-sm py-2 px-4 inline-flex
        justify-center text-sm font-medium text-white hover:bg-secondary-light
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-light"
        >
          {getIcon('Add', 'fill-current -ml-1 mr-2 h-5 w-5')}
          <span>{buttonLabel}</span>
        </button>
      }
      resultsSection={
        <div className="p-4 pt-0">
          <EntrySelectorPresentationList
            docTypes={docTypes}
            searchResults={searchResults}
            selected={selectedItem}
            setSelected={setSelectedItem}
            infiniteScroll={infiniteScroll}
          ></EntrySelectorPresentationList>
        </div>
      }
      isLoadingEntries={isLoadingEntries}
      hasResults={hasResults}
      loadRef={loadRef}
    />
  )
}

// PROPTYPES
const { arrayOf, func, string } = PropTypes
EntrySelectorContainer.propTypes = {
  docTypes: arrayOf(string),
  addItem: func,
  removeItem: func,
}

export default EntrySelectorContainer
