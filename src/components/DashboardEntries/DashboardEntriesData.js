import { useSearchParams } from 'react-router-dom'

// FPCC
import useSearchLoader from 'common/search/useSearchLoader'
import useSearchBoxNavigation from 'common/search/useSearchBoxNavigation'

function DashboardEntriesData() {
  const [searchParams] = useSearchParams()
  const searchTerm = searchParams.get('q') || ''
  const urlSearchType = searchParams.get('docType') || 'ALL'
  const { searchType, setSearchTypeInUrl, getSearchLabel } =
    useSearchBoxNavigation({
      searchType: urlSearchType,
    })
  const showTypeSelector =
    urlSearchType === 'WORD' ||
    urlSearchType === 'PHRASE' ||
    urlSearchType === 'WORD_AND_PHRASE'

  // Search fetch
  const { searchResults, infiniteScroll, loadRef, isLoading } = useSearchLoader(
    { searchParams },
  )

  return {
    isLoadingEntries: isLoading,
    items: searchResults,
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
