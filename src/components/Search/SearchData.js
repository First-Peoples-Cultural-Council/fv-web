import { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import useSearchLoader from 'common/search/useSearchLoader'
import api from 'services/api'
import { makePlural } from 'common/utils/urlHelpers'
import useSearchType from 'components/SearchTypeSelector/useSearchType'

function SearchData() {
  const { site } = useSiteStore()
  const { title } = site
  const navigate = useNavigate()
  const { sitename } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const searchTerm = searchParams.get('q') || ''
  const domain = searchParams.get('domain') || 'BOTH'

  const { getSearchLabel } = useSearchType({})
  const searchType = searchParams.get('docType') || 'ALL'
  const entryLabel = getSearchLabel({ searchType })

  // Dictionary fetch
  const { searchResults, infiniteScroll, loadRef, isLoading, isError, error } =
    useSearchLoader({
      searchApi: api.search,
      queryKey: 'search',
      siteUid: site?.uid,
      searchParams,
    })

  useEffect(() => {
    if (isError) {
      navigate(
        `/${sitename}/error?status=${error?.response?.status}&statusText=${error?.response?.statusText}&url=${error?.response?.url}`,
        { replace: true },
      )
    }
  }, [isError])

  // Get Filters
  const filters = [
    {
      type: 'ALL',
      label: searchType === 'ALL' ? 'All Results' : 'Back to all results',
      count: searchResults?.pages?.[0]?.statistics.resultCount,
    },
  ]
  const countsByType = searchResults?.pages?.[0]?.statistics.countsByType
    ? searchResults?.pages?.[0]?.statistics.countsByType
    : {}

  for (const [key, value] of Object.entries(countsByType)) {
    filters.push({
      type: key?.toUpperCase(),
      label: makePlural(key),
      count: value,
    })
  }

  const handleFilter = (filter) => {
    const params = {
      q: searchTerm,
      domain,
      docType: filter,
    }
    setSearchParams(params)
  }

  return {
    searchType,
    siteTitle: title || 'FirstVoices',
    filters,
    handleFilter,
    infiniteScroll,
    isLoading,
    items: searchResults,
    loadRef,
    actions: ['copy'],
    moreActions: ['share', 'qrcode'],
    sitename,
    entryLabel,
  }
}

export default SearchData
