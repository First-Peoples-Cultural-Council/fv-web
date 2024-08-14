import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import SearchDomainSelector from 'components/SearchDomainSelector'

function SearchForm({
  handleSearchNavigation,
  handleSearchTermChange,
  displayedSearchTerm,
  searchBoxPlaceholder,
  searchDomain,
  handleSearchDomainChange,
  searchDomainOptions,
}) {
  return (
    <div id="SearchForm" className="flex w-full rounded-lg">
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
          className="block w-full md:text-xl lg:text-2xl text-fv-charcoal-light rounded-none rounded-l-md pl-4 truncate border-0"
          type="text"
          placeholder={searchBoxPlaceholder}
          onChange={handleSearchTermChange}
          value={displayedSearchTerm}
        />
      </form>

      <div className="relative inline-flex items-center px-2 py-1.5 text-fv-charcoal-light border-l-2 border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100">
        <SearchDomainSelector.Presentation
          searchDomain={searchDomain}
          handleSearchDomainChange={handleSearchDomainChange}
          searchDomainOptions={searchDomainOptions}
        />
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
const { func, object, string } = PropTypes
SearchForm.propTypes = {
  handleSearchNavigation: func,
  handleSearchTermChange: func,
  displayedSearchTerm: string,
  searchBoxPlaceholder: string,
  searchDomain: string,
  handleSearchDomainChange: func,
  searchDomainOptions: object,
}

export default SearchForm
