import { useState } from 'react'
import { useParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { useCategories } from 'common/dataHooks/useCategories'

function CategoriesBrowserData() {
  const { site } = useSiteStore()
  const { sitename } = useParams()

  // Data fetch
  const categoriesQueryResponse = useCategories()

  const [currentCategory, setCurrentCategory] = useState()

  const [query, setQuery] = useState('')

  const filteredCategories =
    query === ''
      ? categoriesQueryResponse?.allCategories
      : categoriesQueryResponse?.allCategories?.filter(
          (category) =>
            category.title
              .toLowerCase()
              .replace(/\s+/g, '')
              .includes(query.toLowerCase().replace(/\s+/g, '')) ||
            category?.parentTitle
              ?.toLowerCase()
              ?.replace(/\s+/g, '')
              ?.includes(query.toLowerCase().replace(/\s+/g, '')),
        )

  return {
    categoriesQueryResponse,
    site,
    sitename,
    currentCategory,
    setCurrentCategory,
    filteredCategories: filteredCategories || [],
    setQuery,
  }
}
export default CategoriesBrowserData
