import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import useSearchBoxNavigation from 'common/hooks/useSearchBoxNavigation'
import SearchInputPresentation from 'components/SearchInput/SearchInputPresentation'
import { useParams } from 'react-router-dom'

function SiteSearchContainer({ kids, minimal }) {
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
  } = useSearchBoxNavigation({ customBaseUrl, kids })

  return (
    <div id="SiteSearchContainer" className="flex w-full rounded-lg">
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
SiteSearchContainer.propTypes = {
  minimal: bool,
  kids: bool,
}

SiteSearchContainer.defaultProps = {
  minimal: false,
  kids: null,
}

export default SiteSearchContainer
