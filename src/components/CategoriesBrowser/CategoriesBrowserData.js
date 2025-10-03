import { useState } from 'react'
import { useParams } from 'react-router'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { useCategoriesFlat } from 'common/dataHooks/useCategories'

function CategoriesBrowserData() {
  const { site } = useSiteStore()
  const { sitename } = useParams()

  // Data fetch
  const categoriesQueryResponse = useCategoriesFlat()

  const [currentCategory, setCurrentCategory] = useState()

  const [query, setQuery] = useState('')

  const filteredCategories =
    query === ''
      ? categoriesQueryResponse?.data?.results
      : categoriesQueryResponse?.data?.results?.filter(
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
