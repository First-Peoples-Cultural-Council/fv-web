import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'

function SearchFormMinimal({
  handleSearchNavigation,
  handleSearchTermChange,
  displayedSearchTerm,
  placeholder,
}) {
  return (
    <div id="SearchFormMinimal" className="w-full flex rounded-full h-10">
      <form
        onSubmit={handleSearchNavigation}
        className="flex items-stretch grow"
      >
        <label id="SearchLabel" htmlFor="SearchInput" className="sr-only">
          Search FirstVoices
        </label>
        <input
          data-testid="SearchInput"
          id="SearchInput"
          aria-labelledby="SearchLabel"
          className="w-full text-sm placeholder:text-charcoal-500 text-charcoal-700 rounded-none rounded-l-full pl-4 focus:outline-hidden truncate"
          type="text"
          placeholder={placeholder || 'Search'}
          onInput={handleSearchTermChange}
          value={displayedSearchTerm}
        />
      </form>
      <button
        type="button"
        data-testid="SearchSubmit"
        aria-label="Search/Go"
        onClick={handleSearchNavigation}
        className="relative inline-flex items-center px-2 py-1.5 text-charcoal-500 rounded-r-full bg-charcoal-50 hover:bg-charcoal-200 border border-charcoal-500"
      >
        {getIcon('Search', 'fill-current h-5 w-5 ')}
      </button>
    </div>
  )
}

// PROPTYPES
const { func, string } = PropTypes
SearchFormMinimal.propTypes = {
  handleSearchNavigation: func,
  handleSearchTermChange: func,
  displayedSearchTerm: string,
  placeholder: string,
}

export default SearchFormMinimal
