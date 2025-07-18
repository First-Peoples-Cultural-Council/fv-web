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
          Search FirstVoices
        </label>
        <input
          data-testid="SearchInput"
          id="SearchInput"
          aria-labelledby="SearchLabel"
          className="block w-full placeholder:text-charcoal-400 text-charcoal-700 rounded-none rounded-l-md pl-4 py-4 overflow-visible truncate border-0"
          type="text"
          placeholder={searchBoxPlaceholder}
          onInput={handleSearchTermChange}
          value={displayedSearchTerm}
        />
      </form>

      <div className="relative inline-flex items-center px-2 py-1.5 text-charcoal-500 border-charcoal-200 rounded-r-md bg-charcoal-50 hover:bg-charcoal-50">
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
          {getIcon('Search', 'fill-current h-7 w-7')}
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
