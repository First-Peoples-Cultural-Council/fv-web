import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { useUserStore } from 'context/UserContext'
import api from 'services/api'
import { getWidgetsList } from 'common/utils/widgetAccessHelpers'
import { getWidgetTypeLabel } from 'common/utils/stringHelpers'

function DashboardWidgetsData() {
  const { site } = useSiteStore()
  const navigate = useNavigate()
  const { sitename } = useParams()
  const { user } = useUserStore()
  const { isSuperAdmin } = user

  // Data fetch
  const response = useQuery(
    ['widgets', site?.uid],
    () => api.widget.getWidgets({ siteId: site?.uid }),
    {
      // The query will not execute until the uid exists
      enabled: !!site?.uid,
    },
  )

  const { data, error, isError, isLoading } = response

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
      iconColor: 'wordText',
    },
  ]

  const headerContent = {
    title: 'Widgets',
    subtitle:
      'Manage, create, and edit the Widgets available to use across your site pages',
    icon: 'Widget',
  }

  const adminWidgets = getWidgetsList(isSuperAdmin)

  const widgetsDataAdaptor = (dataArray) => {
    const widgetsData = []
    dataArray.forEach((widget) => {
      widgetsData.push({
        id: widget?.['ecm:uuid'],
        name: widget?.['ecm:name'],
        type: widget?.['widget:type'],
        typeLabel: getWidgetTypeLabel(widget?.['widget:type']),
        format: widget?.['widget:format'],
        editable: adminWidgets.includes(widget?.['widget:type']),
        widget,
      })
    })
    return widgetsData
  }

  return {
    headerContent,
    isLoading: isLoading || isError,
    site,
    tileContent,
    widgets: data?.entries?.length > 0 ? widgetsDataAdaptor(data.entries) : [],
  }
}

export default DashboardWidgetsData
