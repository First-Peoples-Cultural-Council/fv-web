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

function DashboardEntriesData() {
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get('q') || ''
  const urlSearchType = searchParams.get(TYPES) || TYPE_DICTIONARY
  const { searchType, setSearchTypeInUrl, getSearchTypeLabel } =
    useSearchBoxNavigation({
      initialSearchType: urlSearchType,
    })
  const showTypeSelector =
    urlSearchType === TYPE_WORD ||
    urlSearchType === TYPE_PHRASE ||
    urlSearchType === TYPE_DICTIONARY

  // Search fetch
  const { data, infiniteScroll, loadRef, isInitialLoading } = useSearchLoader({
    searchParams,
  })

  return {
    isLoadingEntries: isInitialLoading,
    items: data,
    infiniteScroll,
    loadRef: searchTerm ? loadRef : null,
    searchType,
    setSearchType: setSearchTypeInUrl,
    entryLabel: getSearchTypeLabel({ searchType }),
    emptyListMessage: searchTerm
      ? 'Sorry, there are no results for this search.'
      : 'Please enter your search above.',
    showTypeSelector,
    initialSearchType: urlSearchType,
  }
}

export default DashboardEntriesData
