import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { useCategories } from 'common/dataHooks/useCategories'

function DashboardCategoriesData() {
  const { site } = useSiteStore()
  const navigate = useNavigate()
  const { sitename } = useParams()

  // Data fetch

  const { allCategories, isError, error, isInitialLoading } = useCategories()

  useEffect(() => {
    if (isError) {
      navigate(
        `/${sitename}/error?status=${error?.response?.status}&statusText=${error?.response?.statusText}&url=${error?.response?.url}`,
        { replace: true },
      )
    }
  }, [isError, error, sitename, navigate])

  const tileContent = [
    {
      icon: 'Create',
      name: 'Add a Category',
      description: 'Add a new category to your dictionary',
      href: `/${sitename}/dashboard/create/category`,
      iconColor: 'wordText',
      auth: 'Admin',
    },
  ]

  const headerContent = {
    title: 'Categories',
    subtitle: 'Edit the categories for words and phrases in your dictionary',
    icon: 'Categories',
  }

  return {
    headerContent,
    isLoading: isInitialLoading,
    site,
    sitename,
    tileContent,
    categories: allCategories || [],
  }
}

export default DashboardCategoriesData
