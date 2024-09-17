import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'

function SelectorSearchboxPresentation({
  onSearchChange,
  onSearchSubmit,
  searchPlaceholder,
  searchValue,
}) {
  return (
    <div
      data-testid="SelectorSearchboxPresentation"
      className="w-full relative z-10 flex items-center h-16 mx-auto bg-white border-b border-gray-200 shadow-sm px-6"
    >
      <form onSubmit={onSearchSubmit} className="w-full flex">
        <div className="relative w-full text-gray-400 focus-within:text-gray-600">
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
            className="h-full w-full border-transparent py-2 pl-8 pr-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:block"
            placeholder={searchPlaceholder}
            type="search"
            onChange={onSearchChange}
            value={searchValue}
          />
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
}

export default SelectorSearchboxPresentation
