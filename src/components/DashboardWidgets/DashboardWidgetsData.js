import { useParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { useWidgets } from 'common/dataHooks/useWidgets'

function DashboardWidgetsData() {
  const { site } = useSiteStore()
  const { sitename } = useParams()

  // Data fetch
  const widgetsQueryResponse = useWidgets()

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
    headerContent,
    widgetsQueryResponse,
    site,
    tileContent,
    widgets:
      widgetsQueryResponse?.widgets?.length > 0
        ? widgetsQueryResponse?.widgets
        : [],
  }
}

export default DashboardWidgetsData
