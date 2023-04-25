import React from 'react'
import PropTypes from 'prop-types'

function SearchBoxPresentation({
  onSubmit,
  setSearchTerm,
  placeholder,
  searchTerm,
  minimal = false,
}) {
  const largeStyle =
    'block w-full focus md:text-xl lg:text-2xl text-fv-charcoal-light rounded-none rounded-l-md pl-4 truncate'
  const minimalStyle =
    'w-full text-sm text-fv-charcoal-light rounded-none rounded-l-full pl-4 focus:outline-none truncate'

  return (
    <form onSubmit={onSubmit} className="flex items-stretch grow">
      <label id="SearchLabel" htmlFor="SearchInput" className="sr-only">
        Search Bar Input
      </label>
      <input
        data-testid="SearchInput"
        id="SearchInput"
        aria-labelledby="SearchLabel"
        className={minimal ? minimalStyle : largeStyle}
        type="text"
        placeholder={placeholder}
        onChange={setSearchTerm}
        value={searchTerm}
      />
    </form>
  )
}
// PROPTYPES
const { bool, func, string } = PropTypes
SearchBoxPresentation.propTypes = {
  onSubmit: func,
  setSearchTerm: func,
  placeholder: string,
  searchTerm: string,
  minimal: bool,
}

export default SearchBoxPresentation
