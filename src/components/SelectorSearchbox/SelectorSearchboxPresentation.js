import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'

function SelectorSearchboxPresentation({
  onSearchChange,
  onSearchSubmit,
  searchPlaceholder,
  searchValue,
  clearSearchTerm,
  submittedSearchTerm,
}) {
  return (
    <div
      data-testid="SelectorSearchboxPresentation"
      className="flex w-full rounded-lg"
    >
      <div className="flex w-full rounded-lg">
        <form onSubmit={onSearchSubmit} className="flex items-stretch grow">
          <div className="relative w-full text-charcoal-500 focus-within:text-charcoal-700">
            <input
              name="search-field"
              id="search-field"
              className="block w-full placeholder:text-charcoal-400 text-charcoal-700 rounded-none rounded-l-md pl-4 py-4 overflow-visible truncate border-0"
              type="text"
              placeholder={searchPlaceholder}
              onInput={onSearchChange}
              value={searchValue}
            />
          </div>
        </form>
        <div className="relative inline-flex items-center px-2 py-1.5 text-charcoal-500 border-charcoal-200 rounded-r-md bg-charcoal-50 hover:bg-charcoal-50">
          <button
            data-testid="search-submit-btn"
            type="submit"
            aria-label="Search"
          >
            {getIcon('Search', 'fill-current shrink-0 h-5 w-5')}
          </button>
        </div>
      </div>

      {submittedSearchTerm && (
        <button
          data-testid="reset-search"
          type="button"
          className="inline-flex items-center ml-4 my-1 px-2 text-charcoal-500 border-charcoal-200 text-sm font-medium rounded-lg bg-charcoal-50 hover:bg-charcoal-100"
          onClick={clearSearchTerm}
        >
          Clear Search
        </button>
      )}
    </div>
  )
}

// PROPTYPES
const { func, string } = PropTypes
SelectorSearchboxPresentation.propTypes = {
  onSearchChange: func,
  onSearchSubmit: func,
  searchPlaceholder: string,
  searchValue: string,
  clearSearchTerm: func,
  submittedSearchTerm: string,
}

export default SelectorSearchboxPresentation
