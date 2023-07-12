import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { getFriendlyDocTypes } from 'common/utils/stringHelpers'
import getIcon from 'common/utils/getIcon'
import useModalSearch from 'common/search/useModalSearch'
import useSearchResultSelector from 'common/hooks/useSearchResultSelector'
import SearchSelector from 'components/SearchSelector'
import EntrySelectorPresentationList from 'components/EntrySelector/EntrySelectorPresentationList'

function EntrySelectorContainer({ types, addItem }) {
  const {
    searchQuery,
    setSearchQuery,
    search,
    searchResults,
    hasResults,
    infiniteScroll,
    isLoadingEntries,
    loadRef,
  } = useModalSearch({ types })

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
      headerSection={
        <button
          type="button"
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
            types={types}
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
  types: arrayOf(string),
  addItem: func,
}

export default EntrySelectorContainer
