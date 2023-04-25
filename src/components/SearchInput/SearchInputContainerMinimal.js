import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/getIcon'
import SearchBox from 'components/SearchBox'
import useSearchBoxNavigation from 'common/search/useSearchBoxNavigation'

function SearchInputContainerMinimal({ kids, customBaseUrl, searchDocType }) {
  const {
    handleSearchNavigation,
    displayedSearchTerm,
    handleSearchTermChange,
  } = useSearchBoxNavigation({
    kids,
    customBaseUrl,
    searchDocType,
  })

  return (
    <div id="SearchInputContainerMinimal">
      <div className="w-full flex rounded-full h-10">
        <SearchBox.Presentation
          onSubmit={handleSearchNavigation}
          setSearchTerm={handleSearchTermChange}
          searchTerm={displayedSearchTerm}
          placeholder="Search"
          minimal
        />

        <label className="sr-only">Search/Go</label>
        <button
          type="button"
          onClick={handleSearchNavigation}
          className="relative inline-flex items-center px-2 py-1.5 text-fv-charcoal-light rounded-r-full bg-gray-50 hover:bg-gray-100"
        >
          {getIcon('Search', 'fill-current h-5 w-5 ')}
        </button>
      </div>
    </div>
  )
}

// PROPTYPES
const { bool, string } = PropTypes
SearchInputContainerMinimal.propTypes = {
  customBaseUrl: string,
  kids: bool,
  searchDocType: string,
}

export default SearchInputContainerMinimal
