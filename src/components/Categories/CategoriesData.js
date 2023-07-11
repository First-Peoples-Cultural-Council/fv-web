import { useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'

// FPCC
import useSearchBoxNavigation from 'common/search/useSearchBoxNavigation'
import useCategories from 'common/dataHooks/useCategories'

function CategoriesData() {
  // const { site } = useSiteStore()
  const { sitename } = useParams()
  const navigate = useNavigate()

  const [searchParams] = useSearchParams()
  const urlSearchType = searchParams.get('docType') || 'WORD_AND_PHRASE'
  const { searchType, setSearchTypeInUrl, getSearchLabel } =
    useSearchBoxNavigation({
      searchType: urlSearchType,
    })

  // Data fetch
  const { status, isLoading, error, isError, data } = useCategories()

  useEffect(() => {
    if (isError) {
      navigate(
        `/${sitename}/error?status=${error?.response?.status}&statusText=${error?.response?.statusText}&url=${error?.response?.url}`,
        { replace: true },
      )
    }
  }, [isError])

  return {
    categories: data,
    searchType,
    setSearchTypeInUrl,
    entryLabelPlural: getSearchLabel({ searchType, plural: true }),
    isLoading: isLoading || status === 'idle' || isError,
    sitename,
  }
}

export default CategoriesData
