import { useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import PropTypes from 'prop-types'

//FPCC
import { useSiteStore } from 'context/SiteContext'
import useSearchBox from 'components/SearchBox/useSearchBox'
import useSearchLanguage from 'components/SearchLanguageSelector/useSearchLanguage'
import useSearchType from 'components/SearchTypeSelector/useSearchType'
import { makeTitleCase } from 'common/stringHelpers'

/**
 * Provides functions for navigating to search urls and managing url-based search parameter state.
 * Search parameters are pulled from URL parameters. Search type can also be set by passing in a
 * parameter, if it is not present as a URL query parameter.
 */
function useSearchBoxNavigation({ customBaseUrl, searchType, kids = false }) {
  // initial search settings
  const { site } = useSiteStore()
  const searchBox = useSearchBox()
  const searchTypeData = useSearchType({ initialSearchType: searchType })
  const entryLabel = makeTitleCase(searchTypeData.getSearchLabel({ searchType: searchTypeData.searchType }))
  const searchLanguageData = useSearchLanguage({ entryLabel })
  const placeholderSearchType = searchType || searchTypeData.searchType
  const searchBoxPlaceholder =
    placeholderSearchType && placeholderSearchType != 'ALL'
      ? `Search ${searchTypeData.getSearchLabel({ searchType: placeholderSearchType, plural: true })} in ${site.title}`
      : `Search ${site.title}`

  // update search settings when url changes
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const query = searchParams.get('q') || ''
    if (query !== searchBox.submittedSearchTerm) {
      searchBox.setSubmittedSearchTerm(query)
    }
    if (!searchBox.displayedSearchTerm) {
      searchBox.setDisplayedSearchTerm(query)
    }

    searchLanguageData.setSearchLanguage(searchParams.get('domain') || 'BOTH')
    searchTypeData.setSearchType(searchParams.get('docType') || searchType)
  }, [searchParams, searchType])

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

  const doSearchNavigation = ({ searchTerm, searchLanguage, searchType: searchDocType, kidFlag }) => {
    const params = {
      q: searchTerm,
      domain: searchLanguage,
      docType: searchDocType,
      kidsOnly: kidFlag,
    }
    _doSearchNavigation(params)
  }

  const handleSearchNavigation = (event) => {
    // search with current state
    event.preventDefault()
    searchBox.setSubmittedSearchTerm(searchBox.displayedSearchTerm)
    doSearchNavigation({
      searchTerm: searchBox.displayedSearchTerm,
      searchLanguage: searchLanguageData.searchLanguage,
      searchType: searchTypeData.searchType,
      kidFlag: kids,
    })
  }

  const getCurrentSearchState = () => {
    return {
      searchTerm: searchBox.displayedSearchTerm,
      searchLanguage: searchLanguageData.searchLanguage,
      searchType: searchTypeData.searchType,
      kidFlag: kids,
    }
  }

  const getCurrentSearchUrlState = () => {
    return {
      searchTerm: searchParams.get('q') || '',
      searchLanguage: searchParams.get('domain') || 'BOTH',
      searchType: searchParams.get('docType') || searchTypeData.searchType,
      kidFlag: kids,
    }
  }

  const doSearchWithParam = (name, value) => {
    const newParams = getCurrentSearchState()
    if (name) {
      newParams[name] = value
    }

    doSearchNavigation(newParams)
  }

  const handleSearchLanguageNavigation = (event, value) => {
    searchLanguageData.handleSearchLanguageChange(event, value)
    doSearchWithParam('searchLanguage', value)
  }

  const handleSearchTypeNavigation = (event, value) => {
    searchTypeData.handleSearchTypeChange(event, value)
    doSearchWithParam('searchType', value)
  }

  const setSearchTypeInUrl = (value) => {
    const oldParams = getCurrentSearchUrlState()
    const newParams = Object.assign({}, oldParams)

    newParams.searchType = value
    doSearchNavigation(newParams)
  }

  return {
    handleSearchNavigation,
    handleSearchLanguageNavigation,
    handleSearchTypeNavigation,
    setSearchTypeInUrl,
    doSearchNavigation,
    searchBoxPlaceholder,
    ...searchLanguageData,
    ...searchTypeData,
    ...searchBox,
  }
}

// PROPTYPES
const { bool, string } = PropTypes
useSearchBoxNavigation.propTypes = {
  customBaseUrl: string,
  kids: bool,
  searchType: string,
}

export default useSearchBoxNavigation
