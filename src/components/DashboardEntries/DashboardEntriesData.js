import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

// FPCC
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import useSearchType from 'common/hooks/useSearchType'
import {
  TYPES,
  TYPE_DICTIONARY,
  TYPE_PHRASE,
  TYPE_WORD,
  SEARCH_FILTERS,
} from 'common/constants'

function DashboardEntriesData({ advancedSearch }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchTerm = searchParams.get('q') || ''
  const urlSearchType = searchParams.get(TYPES) || TYPE_DICTIONARY
  const { searchType, setSearchTypeInUrl, getSearchTypeLabel } = useSearchType({
    initialSearchType: urlSearchType,
  })
  const isDictionary =
    urlSearchType === TYPE_WORD ||
    urlSearchType === TYPE_PHRASE ||
    urlSearchType === TYPE_DICTIONARY

  // Search fetch
  const { data, infiniteScroll, loadRef, isInitialLoading } = useSearchLoader({
    searchParams,
  })

  const [showAdvancedSearch, setShowAdvancedSearch] = useState(advancedSearch)

  useEffect(() => {
    const searchParamsString = searchParams.toString()
    const checkForFilter = (currentValue) =>
      searchParamsString.includes(currentValue)
    const hasFilters = SEARCH_FILTERS.some(checkForFilter)
    if (hasFilters && !showAdvancedSearch) {
      setShowAdvancedSearch(true)
    }
  }, [searchParams, showAdvancedSearch])

  const removeFilters = () => {
    if (searchTerm) {
      setSearchParams({
        q: searchTerm,
        [TYPES]: urlSearchType,
      })
    } else {
      setSearchParams({
        [TYPES]: urlSearchType,
      })
    }
  }

  return {
    emptyListMessage: searchTerm
      ? 'Sorry, there are no results for this search.'
      : 'Please enter your search above.',
    entryLabel: getSearchTypeLabel({ searchType }),
    infiniteScroll,
    initialSearchType: urlSearchType,
    isDictionary,
    isLoadingEntries: isInitialLoading,
    items: data,
    loadRef: searchTerm ? loadRef : null,
    removeFilters,
    searchType,
    setSearchType: setSearchTypeInUrl,
    setShowAdvancedSearch,
    showAdvancedSearch,
  }
}

export default DashboardEntriesData
