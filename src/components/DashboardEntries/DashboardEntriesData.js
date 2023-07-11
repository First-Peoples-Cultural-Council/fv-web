import { useSearchParams } from 'react-router-dom'

// FPCC
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import useSearchBoxNavigation from 'common/search/useSearchBoxNavigation'
import { TYPE_DICTIONARY, TYPE_PHRASE, TYPE_WORD } from 'common/constants'

function DashboardEntriesData() {
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get('q') || ''
  const urlSearchType = searchParams.get('type') || TYPE_DICTIONARY
  const { searchType, setSearchTypeInUrl, getSearchLabel } =
    useSearchBoxNavigation({
      searchType: urlSearchType,
    })
  const showTypeSelector =
    urlSearchType === TYPE_WORD ||
    urlSearchType === TYPE_PHRASE ||
    urlSearchType === TYPE_DICTIONARY

  // Search fetch
  const { data, infiniteScroll, loadRef, isLoading } = useSearchLoader({
    searchParams,
  })

  return {
    isLoadingEntries: isLoading,
    items: data,
    infiniteScroll,
    loadRef: searchTerm ? loadRef : null,
    searchType,
    setSearchType: setSearchTypeInUrl,
    entryLabel: getSearchLabel({ searchType }),
    emptyListMessage: searchTerm
      ? 'Sorry, there are no results for this search.'
      : 'Please enter your search above.',
    showTypeSelector,
    initialSearchType: urlSearchType,
  }
}

export default DashboardEntriesData
