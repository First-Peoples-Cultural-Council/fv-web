import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

// FPCC
import useSearchBoxNavigation from 'common/hooks/useSearchBoxNavigation'
import SearchInputPresentation from 'components/SearchInput/SearchInputPresentation'
import { TYPE_ENTRY } from 'common/constants'

function SearchSiteFormContainer({ kids, minimal }) {
  const { sitename } = useParams()
  const customBaseUrl = sitename ? `/${sitename}/search` : '/search'

  const {
    handleSearchNavigation,
    handleSearchLanguageNavigation,
    handleSearchTermChange,
    searchBoxPlaceholder,
    searchLanguage,
    searchLanguageOptions,
    displayedSearchTerm,
  } = useSearchBoxNavigation({
    customBaseUrl,
    kids,
    initialSearchType: TYPE_ENTRY,
  })

  return (
    <div id="SearchSiteFormContainer" className="flex w-full rounded-lg">
      <SearchInputPresentation
        handleSearchNavigation={handleSearchNavigation}
        handleSearchTermChange={handleSearchTermChange}
        handleSearchLanguageNavigation={handleSearchLanguageNavigation}
        searchLanguage={searchLanguage}
        searchLanguageOptions={searchLanguageOptions}
        displayedSearchTerm={displayedSearchTerm}
        searchBoxPlaceholder={searchBoxPlaceholder}
        minimal={minimal}
      />
    </div>
  )
}

// PROPTYPES
const { bool } = PropTypes
SearchSiteFormContainer.propTypes = {
  minimal: bool,
  kids: bool,
}

SearchSiteFormContainer.defaultProps = {
  minimal: false,
  kids: null,
}

export default SearchSiteFormContainer
