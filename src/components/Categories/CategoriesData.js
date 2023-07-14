import { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

// FPCC
import useSearchBoxNavigation from 'common/hooks/useSearchBoxNavigation'
import useCategories from 'common/dataHooks/useCategories'
import { TYPES, TYPE_DICTIONARY } from 'common/constants'

function CategoriesData() {
  // const { site } = useSiteStore()
  const { sitename } = useParams()
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const urlSearchType = searchParams.get(TYPES) || TYPE_DICTIONARY
  const { searchType, setSearchTypeInUrl, getSearchTypeLabel } =
    useSearchBoxNavigation({
      initialSearchType: urlSearchType,
    })

  // Data fetch
  const { fetchStatus, isInitialLoading, error, isError, data } =
    useCategories()

  useEffect(() => {
    if (isError) {
      navigate(
        `/${sitename}/error?status=${error?.response?.status}&statusText=${error?.response?.statusText}&url=${error?.response?.url}`,
        { replace: true },
      )
    }
  }, [isError])

  return {
    categories: data?.results,
    searchType,
    setSearchTypeInUrl,
    entryLabelPlural: getSearchTypeLabel({ searchType, plural: true }),
    isLoading: isInitialLoading || fetchStatus === 'idle' || isError,
    sitename,
  }
}

export default CategoriesData
