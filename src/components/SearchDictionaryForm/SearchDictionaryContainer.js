import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import SearchInputPresentation from 'components/SearchInput/SearchInputPresentation'
import useSearchBoxNavigation from 'common/search/useSearchBoxNavigation'

function SearchDictionaryContainer({ kids, customBaseUrl, searchType }) {
  // basic searchbox behaviour
  const {
    handleSearchNavigation,
    searchLanguage,
    searchLanguageOptions,
    handleSearchLanguageNavigation,
    displayedSearchTerm,
    setDisplayedSearchTerm,
    submittedSearchTerm,
    handleSearchTermChange,
    searchBoxPlaceholder,
    doSearchNavigation,
  } = useSearchBoxNavigation({ customBaseUrl, searchType, kids })

  // reset feature
  const [initialSearchType] = useState(searchType)

  const resetSearch = (event) => {
    event.preventDefault()
    setDisplayedSearchTerm('')
    doSearchNavigation({
      searchTerm: '',
      searchLanguage: 'BOTH',
      searchType: initialSearchType,
      kidFlag: kids,
    })
  }

  return (
    <div id="DictionarySearchContainer" className="flex w-full rounded-lg">
      <SearchInputPresentation
        handleSearchSubmit={handleSearchNavigation}
        handleTextFieldChange={handleSearchTermChange}
        handleSearchLanguageChange={handleSearchLanguageNavigation}
        searchLanguage={searchLanguage}
        searchLanguageOptions={searchLanguageOptions}
        searchValue={displayedSearchTerm}
        placeholder={searchBoxPlaceholder}
      />

      {submittedSearchTerm && (
        <button
          type="button"
          className="inline-flex items-center ml-4 my-1 px-2 text-fv-charcoal-light border-gray-300 text-sm font-medium rounded-lg bg-gray-100 hover:bg-gray-200"
          onClick={resetSearch}
        >
          Clear Search
        </button>
      )}
    </div>
  )
}

// PROPTYPES
const { bool, string } = PropTypes
SearchDictionaryContainer.propTypes = {
  customBaseUrl: string,
  kids: bool,
  searchType: string,
}

export default SearchDictionaryContainer
