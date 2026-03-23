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
      className="flex w-full rounded-lg space-x-2"
    >
      <div className="flex w-full rounded-lg bg-white">
        <form
          onSubmit={onSearchSubmit}
          className="flex items-stretch grow space-x-1"
        >
          <div className="relative w-full text-charcoal-500 focus-within:text-charcoal-700">
            <input
              name="search-field"
              id="search-field"
              className="block w-full placeholder:text-charcoal-400 text-charcoal-700 rounded-lg pl-4 py-4 truncate border-0"
              type="text"
              placeholder={searchPlaceholder}
              onInput={onSearchChange}
              value={searchValue}
            />
          </div>
          <div className="relative inline-flex items-center px-4 py-2 text-charcoal-500 border-charcoal-200 rounded-r-md bg-charcoal-50">
            <button
              data-testid="search-submit-btn"
              type="submit"
              aria-label="Search"
            >
              {getIcon('Search', 'fill-current shrink-0 h-5 w-5')}
            </button>
          </div>
        </form>
      </div>

      {submittedSearchTerm && (
        <div className="flex items-center justify-center">
          <button
            data-testid="reset-search"
            type="button"
            className="btn-tertiary btn-sm"
            onClick={clearSearchTerm}
          >
            <span>Clear Search</span>
          </button>
        </div>
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
