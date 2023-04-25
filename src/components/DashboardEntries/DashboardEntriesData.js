import { useSearchParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import api from 'services/api'
import useSearchLoader from 'common/search/useSearchLoader'
import useSearchBoxNavigation from 'common/search/useSearchBoxNavigation'

function DashboardEntriesData() {
  const { site } = useSiteStore()
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

  let searchAPI
  if (
    urlSearchType === 'WORD' ||
    urlSearchType === 'PHRASE' ||
    urlSearchType === 'WORD_AND_PHRASE'
  ) {
    searchAPI = api.dictionary
  } else if (urlSearchType === 'SONG') {
    searchAPI = api.song
  } else if (urlSearchType === 'STORY') {
    searchAPI = api.story
  } else {
    searchAPI = api.search
  }

  // Search fetch
  const { searchResults, infiniteScroll, loadRef, isLoading } = useSearchLoader(
    {
      searchApi: searchAPI,
      queryKey: 'search',
      siteUid: site?.uid,
      searchParams,
    },
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
