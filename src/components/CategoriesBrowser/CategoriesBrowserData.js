import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import api from 'services/api'

function CategoriesBrowserData() {
  const { site } = useSiteStore()
  const { sitename } = useParams()

  // Data fetch
  const { data, isInitialLoading, isError } = useQuery(
    ['categories', site?.uid],
    () => api.category.get({ siteId: site?.uid }),
    {
      // The query will not execute until the uid exists
      enabled: !!site?.uid,
    },
  )

  const getParent = (parentId) => {
    const parent = data?.categories?.filter(
      (category) => category?.id === parentId,
    )
    return parent?.[0]?.title || ''
  }

  const categoriesDataAdaptor = (dataArray) => {
    const categoriesData = []
    dataArray?.categories?.forEach((category) => {
      categoriesData.push({
        id: category?.id,
        title: category?.title,
        parentCategory: getParent(category?.parentId),
        href: `/${site?.sitename}/categories/${category?.id}?docType=WORD_AND_PHRASE`,
        category,
      })
    })
    return categoriesData
  }

  const [currentCategory, setCurrentCategory] = useState()

  const [query, setQuery] = useState('')

  const filteredCategories = () => {
    const formattedCategories = categoriesDataAdaptor(data)
    return query === ''
      ? formattedCategories
      : formattedCategories.filter((category) =>
          category.title
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, '')),
        )
  }

  return {
    isLoading: isInitialLoading || isError,
    site,
    sitename,
    currentCategory,
    setCurrentCategory,
    filteredCategories:
      data?.categories?.length > 0 ? filteredCategories() : [],
    setQuery,
  }
}
export default CategoriesBrowserData
