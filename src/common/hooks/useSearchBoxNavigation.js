import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import useSearchTerm from 'common/hooks/useSearchTerm'
import useSearchLanguage from 'common/hooks/useSearchLanguage'
import useSearchType from 'common/hooks/useSearchType'
import { updateSearchParams } from 'common/utils/urlHelpers'
import { DOMAIN, TYPES, TYPE_ENTRY, KIDS, SORT } from 'common/constants'

/**
 * Provides functions for navigating to search urls and managing url-based search parameter state.
 * Search parameters are pulled from URL parameters. Search type can also be set by passing in a
 * parameter, if it is not present as a URL query parameter.
 */
function useSearchBoxNavigation({ customBaseUrl, initialSearchType, kids }) {
  // initial search settings
  const { site } = useSiteStore()
  const [searchParams] = useSearchParams()

  // State and methods from other hooks
  const {
    displayedSearchTerm,
    handleSearchTermChange,
    setDisplayedSearchTerm,
    submittedSearchTerm,
    setSubmittedSearchTerm,
  } = useSearchTerm()

  const {
    getSearchTypeLabel,
    searchType: _searchType,
    setSearchTypeInUrl,
  } = useSearchType({
    initialSearchType,
  })

  const {
    searchLanguage: _searchLanguage,
    setSearchLanguage,
    searchLanguageInUrl,
    setSearchLanguageInUrl,
    searchLanguageOptions,
  } = useSearchLanguage({ searchType: _searchType })

  const placeholderSearchType = initialSearchType || _searchType

  const searchBoxPlaceholderSuffix = site.title
    ? `${site.title}`
    : 'all languages on FirstVoices'

  const searchBoxPlaceholder =
    placeholderSearchType && placeholderSearchType !== TYPE_ENTRY
      ? `Search ${getSearchTypeLabel({
          searchType: placeholderSearchType,
          plural: true,
        })} in ${searchBoxPlaceholderSuffix}`
      : `Search ${searchBoxPlaceholderSuffix}`

  // provide navigation functions for search urls
  const { pathname } = useLocation()
  let baseUrl = customBaseUrl
  if (!baseUrl) {
    baseUrl = pathname
  }

  const navigate = useNavigate()

  const _doSearchNavigation = (params) => {
    navigate(`${baseUrl}?${new URLSearchParams(params).toString()}`)
  }

  const doSearchNavigation = ({
    searchTerm,
    searchLanguage,
    searchType,
    kidFlag,
  }) => {
    const newParams = {
      q: searchTerm,
      [DOMAIN]: searchLanguage,
      [TYPES]: searchType,
      [SORT]: '',
    }
    if (kidFlag) {
      newParams[KIDS] = kidFlag
    }
    const fullParams = updateSearchParams(searchParams, newParams)
    _doSearchNavigation(fullParams)
  }

  const handleSearchNavigation = (event) => {
    // search with current state
    event.preventDefault()
    setSubmittedSearchTerm(displayedSearchTerm)
    doSearchNavigation({
      searchTerm: displayedSearchTerm,
      searchLanguage: _searchLanguage,
      searchType: _searchType,
      kidFlag: kids,
    })
  }

  const handleSearchLanguageNavigation = (event, value) => {
    setSearchLanguage(value)
    setSearchLanguageInUrl(value)
  }

  return {
    handleSearchNavigation,
    handleSearchLanguageNavigation,
    doSearchNavigation,
    searchBoxPlaceholder,
    // From useSearchType
    searchType: _searchType,
    setSearchTypeInUrl,
    getSearchTypeLabel,
    // From useSearchLanguage
    searchLanguage: _searchLanguage,
    searchLanguageInUrl,
    setSearchLanguageInUrl,
    searchLanguageOptions,
    // from useSearchTerm
    displayedSearchTerm,
    handleSearchTermChange,
    setDisplayedSearchTerm,
    submittedSearchTerm,
  }
}

// PROPTYPES
const { bool, string } = PropTypes
useSearchBoxNavigation.propTypes = {
  customBaseUrl: string,
  kids: bool,
  searchType: string,
}

useSearchBoxNavigation.defaultProps = {
  kids: null,
}

export default useSearchBoxNavigation
