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
    displayedSearchTerm,
    handleSearchTermChange,
    searchBoxPlaceholder,
    searchType,
  } = useSearchBoxNavigation({
    customBaseUrl,
    kids,
    initialSearchType: TYPE_ENTRY,
  })

  return (
    <div id="SearchSiteFormContainer" className="flex w-full rounded-lg">
      <SearchInputPresentation
        displayedSearchTerm={displayedSearchTerm}
        handleSearchNavigation={handleSearchNavigation}
        handleSearchTermChange={handleSearchTermChange}
        searchBoxPlaceholder={searchBoxPlaceholder}
        searchType={searchType}
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
