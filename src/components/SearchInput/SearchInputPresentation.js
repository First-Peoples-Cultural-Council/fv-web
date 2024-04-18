import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import SearchLanguageSelector from 'components/SearchLanguageSelector'
import SearchBox from 'components/SearchBox'

function SearchInputPresentation({
  handleSearchNavigation,
  handleSearchTermChange,
  searchBoxPlaceholder,
  searchType,
  displayedSearchTerm,
  minimal,
}) {
  return minimal ? (
    <div id="SearchInputPresentation-Minimal">
      <div className="w-full flex rounded-full h-10">
        <SearchBox.Presentation
          onSubmit={handleSearchNavigation}
          setSearchTerm={handleSearchTermChange}
          searchTerm={displayedSearchTerm}
          placeholder="Search"
          minimal
        />
        <button
          type="button"
          data-testid="SearchSubmit"
          aria-label="Search/Go"
          onClick={handleSearchNavigation}
          className="relative inline-flex items-center px-2 py-1.5 text-fv-charcoal-light rounded-r-full bg-gray-50 hover:bg-gray-100"
        >
          {getIcon('Search', 'fill-current h-5 w-5 ')}
        </button>
      </div>
    </div>
  ) : (
    <div id="SearchInputPresentation" className="flex w-full rounded-lg">
      <SearchBox.Presentation
        onSubmit={handleSearchNavigation}
        setSearchTerm={handleSearchTermChange}
        searchTerm={displayedSearchTerm}
        placeholder={searchBoxPlaceholder}
      />

      <div className="relative inline-flex items-center px-2 py-1.5 text-fv-charcoal-light border-l-2 border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100">
        <SearchLanguageSelector.Presentation searchType={searchType} />
        <button
          type="button"
          data-testid="SearchSubmit"
          aria-label="Search/Go"
          onClick={handleSearchNavigation}
        >
          {getIcon('Search', 'fill-current h-7 w-7 ')}
        </button>
      </div>
    </div>
  )
}

// PROPTYPES
const { bool, func, string } = PropTypes
SearchInputPresentation.propTypes = {
  handleSearchNavigation: func,
  handleSearchTermChange: func,
  searchBoxPlaceholder: string,
  searchType: string,
  displayedSearchTerm: string,
  minimal: bool,
}

export default SearchInputPresentation
