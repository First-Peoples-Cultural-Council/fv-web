import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import { WIDGETS } from 'common/constants'
import api from 'services/api'
import { getEditableWidgetsForUser } from 'common/utils/widgetHelpers'
import { useUserStore } from 'context/UserContext'
import { widgetAdaptor } from 'common/dataAdaptors'

export function useWidget({ id }) {
  const { sitename } = useParams()

  const response = useQuery(
    [WIDGETS, sitename, id],
    () => api.widgets.getWidget({ sitename, id }),
    { enabled: !!id },
  )
  return {
    ...response,
    data: widgetAdaptor({ widgetData: response?.data, sitename }),
  }
}

export function useWidgets() {
  const { sitename } = useParams()
  const { user } = useUserStore()
  const { isSuperAdmin } = user
  const editableWidgets = getEditableWidgetsForUser(isSuperAdmin)

  const response = useQuery(
    [WIDGETS, sitename],
    () => api.widgets.getWidgets({ sitename }),
    { enabled: !!sitename },
  )
  const formattedWidgets = response?.data?.results?.map((widget) => {
    const formattedWidget = widgetAdaptor({ widgetData: widget, sitename })
    return {
      ...formattedWidget,
      editable: editableWidgets.includes(widget?.type),
    }
  })
  return {
    ...response,
    widgets: formattedWidgets,
  }
}
