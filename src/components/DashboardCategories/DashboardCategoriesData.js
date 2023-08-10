import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import api from 'services/api'
import { LANGUAGE_ADMIN } from 'common/constants/roles'

function DashboardCategoriesData() {
  const { site } = useSiteStore()
  const navigate = useNavigate()
  const { sitename } = useParams()

  // Data fetch
  const { data, error, isError, isInitialLoading } = useQuery(
    ['categories', site?.uid],
    () => api.category.get({ siteId: site?.uid }),
    {
      // The query will not execute until the uid exists
      enabled: !!site?.uid,
    },
  )

  useEffect(() => {
    if (isError) {
      navigate(
        `/${sitename}/error?status=${error?.response?.status}&statusText=${error?.response?.statusText}&url=${error?.response?.url}`,
        { replace: true },
      )
    }
  }, [isError])

  const tileContent = [
    {
      icon: 'Create',
      name: 'Add a Category',
      description: 'Add a new category to your dictionary',
      href: `/${sitename}/dashboard/create/category`,
      iconColor: 'wordText',
      auth: LANGUAGE_ADMIN,
    },
  ]

  const headerContent = {
    title: 'Categories',
    subtitle: 'Edit the categories for words and phrases in your dictionary',
    icon: 'Categories',
  }

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

  return {
    headerContent,
    isLoading: isInitialLoading || isError,
    site,
    sitename,
    tileContent,
    categories: data?.categories?.length > 0 ? categoriesDataAdaptor(data) : [],
  }
}

export default DashboardCategoriesData
