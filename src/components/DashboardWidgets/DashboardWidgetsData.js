import { useParams } from 'react-router'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { useWidgets } from 'common/dataHooks/useWidgets'

function DashboardWidgetsData() {
  const { site } = useSiteStore()
  const { sitename } = useParams()

  // Data fetch
  const queryResponse = useWidgets()

  const tileContent = [
    {
      icon: 'Create',
      name: 'Create a Widget',
      description: 'Add a new Widget to your site',
      href: `/${sitename}/dashboard/create/widget`,
      iconColor: 'blumine-800',
    },
  ]

  const headerContent = {
    title: 'Widgets',
    subtitle:
      'Manage, create, and edit the Widgets available to use across your site pages',
    icon: 'Widget',
  }

  return {
    queryResponse,
    headerContent,
    site,
    tileContent,
  }
}

export default DashboardWidgetsData
