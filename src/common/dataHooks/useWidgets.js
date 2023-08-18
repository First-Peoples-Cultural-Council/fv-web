import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import { WIDGETS } from 'common/constants'
import api from 'services/api'
import { getEditableWidgetsForUser } from 'common/utils/widgetHelpers'
import { useUserStore } from 'context/UserContext'
import { widgetAdaptor } from 'common/dataAdaptors'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'

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

export function useWidgetsCreate() {
  const { sitename } = useParams()

  const createWidget = async (formData) =>
    api.widgets.create({ sitename, formData })

  const mutation = useMutationWithNotification({
    mutationFn: createWidget,
    redirectTo: `/${sitename}/dashboard/edit/widgets`,
    queryKeyToInvalidate: [WIDGETS, sitename],
    actionWord: 'created',
    type: 'widget',
  })

  const onSubmit = (formData) => mutation.mutate(formData)

  return { onSubmit }
}

export function useWidgetsUpdate() {
  const { sitename } = useParams()

  const updateWidget = async (formData) => {
    api.widgets.update({
      sitename,
      widgetId: formData?.id,
      formData,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: updateWidget,
    redirectTo: `/${sitename}/dashboard/edit/widgets`,
    queryKeyToInvalidate: [WIDGETS, sitename],
    actionWord: 'updated',
    type: 'widget',
  })

  const onSubmit = (formData) => mutation.mutate(formData)

  return { onSubmit }
}

export function useWidgetsDelete() {
  const { sitename } = useParams()

  const deleteWidget = async (widgetId) =>
    api.widgets.delete({ sitename, widgetId })

  const mutation = useMutationWithNotification({
    mutationFn: deleteWidget,
    redirectTo: `/${sitename}/dashboard/edit/widgets`,
    queryKeyToInvalidate: [WIDGETS, sitename],
    actionWord: 'deleted',
    type: 'widget',
  })

  const onSubmit = (widgetId) => mutation.mutate(widgetId)

  return { onSubmit }
}
