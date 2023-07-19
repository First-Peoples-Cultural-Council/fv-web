import { useQuery } from '@tanstack/react-query'

// FPCC
import { WIDGETS } from 'common/constants'
import api from 'services/api'
import {
  getObjectFromSettingsArray,
  getEditableWidgetsForUser,
} from 'common/utils/widgetHelpers'
import { getWidgetTypeLabel } from 'common/utils/stringHelpers'
import { useUserStore } from 'context/UserContext'

export default function useWidgets({ sitename }) {
  const { user } = useUserStore()
  const { isSuperAdmin } = user
  const editableWidgets = getEditableWidgetsForUser(isSuperAdmin)

  const response = useQuery(
    [WIDGETS, sitename],
    () => api.widgets.getWidgets({ sitename }),
    { enabled: !!sitename },
  )
  const formattedWidgets = response?.data?.results?.map((widget) => ({
    format: widget?.format,
    settings: getObjectFromSettingsArray(widget?.settings),
    nickname: widget?.title,
    type: widget?.type,
    id: widget?.id,
    typeLabel: getWidgetTypeLabel(widget?.type),
    editable: editableWidgets.includes(widget?.type),
    widget,
  }))
  return {
    ...response,
    widgets: formattedWidgets,
  }
}
