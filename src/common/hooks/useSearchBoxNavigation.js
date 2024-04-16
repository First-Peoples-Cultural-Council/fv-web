import {
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import useSearchTerm from 'common/hooks/useSearchTerm'
import useSearchLanguage from 'common/hooks/useSearchLanguage'
import useSearchType from 'common/hooks/useSearchType'
import { updateSearchParams } from 'common/utils/urlHelpers'
import { DOMAIN, TYPES, TYPE_ENTRY, KIDS } from 'common/constants'

/**
 * Provides functions for navigating to search urls and managing url-based search parameter state.
 * Search parameters are pulled from URL parameters. Search type can also be set by passing in a
 * parameter, if it is not present as a URL query parameter.
 */
function useSearchBoxNavigation({ customBaseUrl, initialSearchType, kids }) {
  const { sitename } = useParams()
  const { site } = useSiteStore()
  const [searchParams] = useSearchParams()

  // State and methods from other hooks
  const {
    displayedSearchTerm,
    handleSearchTermChange,
    setDisplayedSearchTerm,
    submittedSearchTerm,
    setSubmittedSearchTerm,
    removeSearchTermInUrl,
  } = useSearchTerm()

  const { getSearchTypeLabel, searchType, setSearchTypeInUrl } = useSearchType({
    initialSearchType,
  })

  const {
    searchLanguage,
    setSearchLanguage,
    searchLanguageInUrl,
    setSearchLanguageInUrl,
    searchLanguageOptions,
  } = useSearchLanguage({ searchType })

  const searchBoxPlaceholderSuffix = sitename
    ? `${site.title}`
    : 'all languages on FirstVoices'

  const searchBoxPlaceholder =
    searchType && searchType !== TYPE_ENTRY
      ? `Search ${getSearchTypeLabel({
          searchType,
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

  const handleSearchNavigation = (event) => {
    // search with current state
    event.preventDefault()
    setSubmittedSearchTerm(displayedSearchTerm)
    const newParams = {
      q: displayedSearchTerm,
      [DOMAIN]: searchLanguage,
      [TYPES]: searchType,
    }
    if (kids) {
      newParams[KIDS] = kids
    }
    const fullParams = updateSearchParams(searchParams, newParams)
    navigate(`${baseUrl}?${new URLSearchParams(fullParams).toString()}`)
  }

  const handleSearchLanguageNavigation = (event, value) => {
    setSearchLanguage(value)
    setSearchLanguageInUrl(value)
  }

  const clearSearchTerm = (event) => {
    event.preventDefault()
    setDisplayedSearchTerm('')
    removeSearchTermInUrl()
  }

  return {
    handleSearchNavigation,
    handleSearchLanguageNavigation,
    clearSearchTerm,
    searchBoxPlaceholder,
    // From useSearchType
    searchType,
    setSearchTypeInUrl,
    getSearchTypeLabel,
    // From useSearchLanguage
    searchLanguage,
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
