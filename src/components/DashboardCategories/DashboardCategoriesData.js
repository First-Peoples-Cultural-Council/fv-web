import { useParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { useCategories } from 'common/dataHooks/useCategories'
import { LANGUAGE_ADMIN } from 'common/constants/roles'

function DashboardCategoriesData() {
  const { site } = useSiteStore()
  const { sitename } = useParams()

  // Data fetch

  const queryResponse = useCategories()

  const tileContent = [
    {
      testid: 'create-category-link',
      icon: 'Create',
      name: 'Add a Category',
      description: 'Add a new category to your dictionary',
      href: `/${sitename}/dashboard/create/category`,
      iconColor: 'blumine-900',
      auth: LANGUAGE_ADMIN,
    },
  ]

  const headerContent = {
    title: 'Categories',
    subtitle: 'Edit the categories for words and phrases in your dictionary',
    icon: 'Categories',
  }

  return {
    headerContent,
    queryResponse,
    site,
    tileContent,
  }
}

export default DashboardCategoriesData
