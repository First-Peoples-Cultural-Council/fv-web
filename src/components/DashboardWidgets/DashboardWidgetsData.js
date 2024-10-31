import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { useWidgets } from 'common/dataHooks/useWidgets'

function DashboardWidgetsData() {
  const { site } = useSiteStore()
  const navigate = useNavigate()
  const { sitename } = useParams()

  // Data fetch
  const response = useWidgets()

  const { error, isError, isInitialLoading, widgets } = response

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
    isLoading: isInitialLoading || isError,
    site,
    tileContent,
    widgets: widgets?.length > 0 ? widgets : [],
  }
}

export default DashboardWidgetsData
