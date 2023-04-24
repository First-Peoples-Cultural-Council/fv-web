import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import SearchInputPresentation from 'components/SearchInput/SearchInputPresentation'
import useSearchBoxNavigation from 'common/search/useSearchBoxNavigation'

function SearchInputContainer({ kids, customBaseUrl, searchDocType }) {
  const {
    handleSearchNavigation,
    handleSearchLanguageNavigation,
    handleSearchTermChange,
    searchBoxPlaceholder,
    searchLanguage,
    searchLanguageOptions,
    displayedSearchTerm,
  } = useSearchBoxNavigation({ customBaseUrl, searchDocType, kids })

  return (
    <div id="SearchInputContainer" className="flex w-full rounded-lg">
      <SearchInputPresentation
        searchLanguage={searchLanguage}
        handleSearchSubmit={handleSearchNavigation}
        handleTextFieldChange={handleSearchTermChange}
        handleSearchLanguageChange={handleSearchLanguageNavigation}
        searchLanguageOptions={searchLanguageOptions}
        searchValue={displayedSearchTerm}
        placeholder={searchBoxPlaceholder}
      />
    </div>
  )
}

// PROPTYPES
const { bool, string } = PropTypes
SearchInputContainer.propTypes = {
  customBaseUrl: string,
  kids: bool,
  searchDocType: string,
}

export default SearchInputContainer
