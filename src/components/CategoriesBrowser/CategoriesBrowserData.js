import { useState } from 'react'
import { useParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import useCategories from 'common/dataHooks/useCategories'

function CategoriesBrowserData() {
  const { site } = useSiteStore()
  const { sitename } = useParams()

  // Data fetch
  const { isInitialLoading, isError, allCategories } = useCategories()

  const [currentCategory, setCurrentCategory] = useState()

  const [query, setQuery] = useState('')

  const filteredCategories =
    query === ''
      ? allCategories
      : allCategories?.filter((category) =>
          category.title
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        )

  return {
    isLoading: isInitialLoading || isError,
    site,
    sitename,
    currentCategory,
    setCurrentCategory,
    filteredCategories: filteredCategories || [],
    setQuery,
  }
}
export default CategoriesBrowserData
