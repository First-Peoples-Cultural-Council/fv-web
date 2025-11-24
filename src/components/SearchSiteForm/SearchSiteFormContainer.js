import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'

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
    submittedSearchTerm,
    clearSearchTerm,
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
          placeholder={sitename ? 'Search language site' : 'Search FirstVoices'}
        />
      ) : (
        <>
          <SearchForm
            displayedSearchTerm={displayedSearchTerm}
            handleSearchNavigation={handleSearchNavigation}
            handleSearchTermChange={handleSearchTermChange}
            searchBoxPlaceholder={searchBoxPlaceholder}
            searchDomain={searchDomain}
            handleSearchDomainChange={handleSearchDomainChange}
            searchDomainOptions={searchDomainOptions}
          />
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
        </>
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
