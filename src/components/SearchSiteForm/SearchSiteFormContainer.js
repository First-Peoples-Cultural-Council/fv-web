import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

// FPCC
import useSearchBoxNavigation from 'common/hooks/useSearchBoxNavigation'
import SearchForm from 'components/SearchForm'
import SearchFormMinimal from 'components/SearchFormMinimal'
import { TYPE_ENTRY } from 'common/constants'

function SearchSiteFormContainer({ kids = null, minimal = false }) {
  const { sitename } = useParams()
  const customBaseUrl = sitename ? `/${sitename}/search` : '/search'

  const {
    handleSearchNavigation,
    displayedSearchTerm,
    handleSearchTermChange,
    searchBoxPlaceholder,
    searchDomain,
    handleSearchDomainChange,
    searchDomainOptions,
    submitSearchClearParams,
  } = useSearchBoxNavigation({
    customBaseUrl,
    kids,
    initialSearchType: TYPE_ENTRY,
  })

  return (
    <div id="SearchSiteFormContainer" className="flex w-full rounded-lg">
      {minimal ? (
        <SearchFormMinimal
          displayedSearchTerm={displayedSearchTerm}
          handleSearchNavigation={submitSearchClearParams}
          handleSearchTermChange={handleSearchTermChange}
        />
      ) : (
        <SearchForm
          displayedSearchTerm={displayedSearchTerm}
          handleSearchNavigation={handleSearchNavigation}
          handleSearchTermChange={handleSearchTermChange}
          searchBoxPlaceholder={searchBoxPlaceholder}
          searchDomain={searchDomain}
          handleSearchDomainChange={handleSearchDomainChange}
          searchDomainOptions={searchDomainOptions}
        />
      )}
    </div>
  )
}

// PROPTYPES
const { bool } = PropTypes
SearchSiteFormContainer.propTypes = {
  minimal: bool,
  kids: bool,
}

export default SearchSiteFormContainer
