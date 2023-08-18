import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// FPCC
import { useCategories } from 'common/dataHooks/useCategories'

function CategoriesData() {
  const { sitename } = useParams()
  const navigate = useNavigate()

  // Data fetch
  const { isInitialLoading, error, isError, data } = useCategories()

  useEffect(() => {
    if (isError) {
      navigate(
        `/${sitename}/error?status=${error?.response?.status}&statusText=${error?.response?.statusText}&url=${error?.response?.url}`,
        { replace: true },
      )
    }
  }, [error, isError, navigate, sitename])

  return {
    categories: data?.results,
    isLoading: isInitialLoading,
    sitename,
  }
}

export default CategoriesData
