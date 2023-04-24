import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

//FPCC
import getIcon from 'common/getIcon'
import SearchLanguageSelector from 'components/SearchLanguageSelector'
import SearchBox from 'components/SearchBox'

function SearchInputPresentation({
  searchLanguage,
  handleSearchSubmit,
  handleTextFieldChange,
  handleSearchLanguageChange,
  searchLanguageOptions,
  placeholder,
  searchValue,
}) {
  return (
    <Fragment>
      <SearchBox.Presentation
        onSubmit={handleSearchSubmit}
        setSearchTerm={handleTextFieldChange}
        searchTerm={searchValue}
        placeholder={placeholder}
      />

      <div className="relative inline-flex items-center px-2 py-1.5 text-fv-charcoal-light border-l-2 border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100">
        <SearchLanguageSelector.Presentation
          selected={searchLanguage}
          options={searchLanguageOptions}
          onSelect={handleSearchLanguageChange}
        />
        <button type="button" id="SearchSubmit" aria-label="Search/Go" onClick={handleSearchSubmit}>
          {getIcon('Search', 'fill-current h-7 w-7 ')}
        </button>
      </div>
    </Fragment>
  )
}

// PROPTYPES
const { func, object, string } = PropTypes
SearchInputPresentation.propTypes = {
  searchLanguage: string,
  handleSearchSubmit: func,
  handleTextFieldChange: func,
  handleSearchLanguageChange: func,
  searchLanguageOptions: object,
  placeholder: string,
  searchValue: string,
}

export default SearchInputPresentation
