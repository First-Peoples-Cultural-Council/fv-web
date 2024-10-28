import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'

function SearchFormMinimal({
  handleSearchNavigation,
  handleSearchTermChange,
  displayedSearchTerm,
}) {
  return (
    <div id="SearchFormMinimal-Minimal">
      <div className="w-full flex rounded-full h-10">
        <form
          onSubmit={handleSearchNavigation}
          className="flex items-stretch grow"
        >
          <label id="SearchLabel" htmlFor="SearchInput" className="sr-only">
            Search Bar Input
          </label>
          <input
            data-testid="SearchInput"
            id="SearchInput"
            aria-labelledby="SearchLabel"
            className="w-full text-sm text-charcoal-500 rounded-none rounded-l-full pl-4 focus:outline-none truncate"
            type="text"
            placeholder="Search"
            onChange={handleSearchTermChange}
            value={displayedSearchTerm}
          />
        </form>
        <button
          type="button"
          data-testid="SearchSubmit"
          aria-label="Search/Go"
          onClick={handleSearchNavigation}
          className="relative inline-flex items-center px-2 py-1.5 text-charcoal-500 rounded-r-full bg-gray-50 hover:bg-gray-100"
        >
          {getIcon('Search', 'fill-current h-5 w-5 ')}
        </button>
      </div>
    </div>
  )
}

// PROPTYPES
const { func, string } = PropTypes
SearchFormMinimal.propTypes = {
  handleSearchNavigation: func,
  handleSearchTermChange: func,
  displayedSearchTerm: string,
}

export default SearchFormMinimal
