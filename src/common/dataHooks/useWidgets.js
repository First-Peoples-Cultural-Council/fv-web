import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

// FPCC
import { WIDGETS } from 'common/constants'
import api from 'services/api'
import { getEditableWidgetsForUser } from 'common/utils/widgetHelpers'
import { useUserStore } from 'context/UserContext'
import { widgetAdaptor } from 'common/dataAdaptors'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'

export function useWidget({ id }) {
  const { sitename } = useParams()

  const queryResponse = useQuery({
    queryKey: [WIDGETS, sitename, id],
    queryFn: () => api.widgets.get({ sitename, id }),
    select: (data) => widgetAdaptor({ widgetData: data, sitename }),
    enabled: !!id,
  })

  return queryResponse
}

export function useWidgets() {
  const { sitename } = useParams()
  const { user } = useUserStore()
  const { isSuperAdmin } = user
  const editableWidgets = getEditableWidgetsForUser(isSuperAdmin)

  const widgetAdaptorWithEditable = (widget) => ({
    ...widgetAdaptor({ widgetData: widget, sitename }),
    editable: editableWidgets.includes(widget?.type),
  })

  const queryResponse = useQuery({
    queryKey: [WIDGETS, sitename],
    queryFn: () => api.widgets.getAll({ sitename }),
    select: (data) => ({
      ...data,
      results: data?.results?.map((widget) =>
        widgetAdaptorWithEditable(widget),
      ),
    }),
    enabled: !!sitename,
  })

  return queryResponse
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
