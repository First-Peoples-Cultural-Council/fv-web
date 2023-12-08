import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

// FPCC
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import useSearchBoxNavigation from 'common/hooks/useSearchBoxNavigation'
import {
  TYPES,
  TYPE_DICTIONARY,
  TYPE_PHRASE,
  TYPE_WORD,
} from 'common/constants'

function DashboardEntriesData({ advancedSearch }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchTerm = searchParams.get('q') || ''
  const urlSearchType = searchParams.get(TYPES) || TYPE_DICTIONARY
  const { searchType, setSearchTypeInUrl, getSearchTypeLabel } =
    useSearchBoxNavigation({
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
    if (Array.from(searchParams).length > 1 && !showAdvancedSearch) {
      setShowAdvancedSearch(true)
    }
  }, [searchParams, showAdvancedSearch])

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
    resetSearch: () => {
      setSearchParams({ [TYPES]: urlSearchType })
    },
    searchType,
    setSearchType: setSearchTypeInUrl,
    setShowAdvancedSearch,
    showAdvancedSearch,
  }
}

export default DashboardEntriesData
