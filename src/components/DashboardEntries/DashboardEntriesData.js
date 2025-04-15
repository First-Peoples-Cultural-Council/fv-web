import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'

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
  const searchInfiniteQueryResponse = useSearchLoader({
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
    emptyListMessage: 'Sorry, no results match your search criteria.',
    entryLabel: getSearchTypeLabel({ searchType }),
    searchInfiniteQueryResponse,
    initialSearchType: urlSearchType,
    isDictionary,
    removeFilters,
    searchType,
    setSearchType: setSearchTypeInUrl,
    setShowAdvancedSearch,
    showAdvancedSearch,
  }
}

export default DashboardEntriesData
