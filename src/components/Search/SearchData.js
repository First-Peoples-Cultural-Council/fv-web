import { useParams, useSearchParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import useSearchType from 'common/hooks/useSearchType'
import { TYPE_ENTRY } from 'common/constants'

function SearchData() {
  const { site } = useSiteStore()
  const { title } = site
  const { sitename } = useParams()
  const [searchParams] = useSearchParams()

  const {
    searchTypeInUrl,
    setSearchTypeInUrl,
    getSearchTypeLabel,
    typeFilters,
  } = useSearchType({
    initialSearchType: TYPE_ENTRY,
  })

  // fetch results
  const { data, infiniteScroll, loadRef, isInitialLoading } = useSearchLoader({
    searchParams,
  })

  return {
    searchType: searchTypeInUrl,
    siteTitle: title || 'FirstVoices',
    filters: typeFilters,
    handleFilter: (filter) => {
      setSearchTypeInUrl(filter)
    },
    infiniteScroll,
    isLoading: isInitialLoading,
    items: data,
    loadRef,
    actions: ['copy'],
    moreActions: ['share', 'qrcode'],
    sitename,
    entryLabel: getSearchTypeLabel({ searchTypeInUrl }),
  }
}

export default SearchData
