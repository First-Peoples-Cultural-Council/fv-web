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
      className="w-full relative z-10 flex items-center h-16 mx-auto bg-white border-b border-charcoal-100 shadow-sm px-6"
    >
      <form onSubmit={onSearchSubmit} className="w-full flex">
        <div className="relative w-full text-charcoal-500 focus-within:text-charcoal-700">
          <button
            data-testid="search-submit-btn"
            type="submit"
            className="absolute inset-y-0 left-0 flex items-center"
          >
            {getIcon('Search', 'fill-current flex-shrink-0 h-5 w-5')}
          </button>
          <input
            name="search-field"
            id="search-field"
            className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-charcoal-900 placeholder-charcoal-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-charcoal-300 sm:block"
            placeholder={searchPlaceholder}
            type="text"
            onInput={onSearchChange}
            value={searchValue}
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
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
        </div>
      </form>
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
