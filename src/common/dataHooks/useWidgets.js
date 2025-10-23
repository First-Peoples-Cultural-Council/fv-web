import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router'

// FPCC
import api from 'services/api'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import { useUserStore } from 'context/UserContext'
import { WIDGETS } from 'common/constants'
import {
  widgetForApi,
  widgetForEditing,
  widgetForViewing,
  widgetListAdaptor,
} from 'common/dataAdaptors'

export function useWidget({ id, edit = false }) {
  const { sitename } = useParams()

  const queryResponse = useQuery({
    queryKey: [WIDGETS, sitename, id],
    queryFn: () => api.widgets.get({ sitename, id }),
    select: (data) =>
      edit
        ? widgetForEditing({ item: data })
        : widgetForViewing({ item: data }),
    enabled: !!id,
  })

  return queryResponse
}

export function useWidgets() {
  const { sitename } = useParams()
  const { user } = useUserStore()
  const { isSuperAdmin } = user

  const queryResponse = useQuery({
    queryKey: [WIDGETS, sitename],
    queryFn: () => api.widgets.getAll({ sitename }),
    select: (data) => ({
      ...data,
      results: widgetListAdaptor({ widgetList: data?.results, isSuperAdmin }),
    }),
    enabled: !!sitename,
  })

  return queryResponse
}

export function useWidgetCreate() {
  const { sitename } = useParams()

  const createWidget = async (formData) => {
    const properties = widgetForApi({ formData })
    return api.widgets.create({
      sitename,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: createWidget,
    redirectTo: `/${sitename}/dashboard/edit/widgets`,
    queryKeyToInvalidate: [WIDGETS, sitename],
    actionWord: 'created',
    type: 'widget',
  })

  return mutation
}

export function useWidgetUpdate() {
  const { sitename } = useParams()

  const updateWidget = async (formData) => {
    const properties = widgetForApi({ formData })
    api.widgets.update({
      sitename,
      id: formData?.id,
      properties,
    })
  }

  const mutation = useMutationWithNotification({
    mutationFn: updateWidget,
    redirectTo: `/${sitename}/dashboard/edit/widgets`,
    queryKeyToInvalidate: [WIDGETS, sitename],
    actionWord: 'updated',
    type: 'widget',
  })

  return mutation
}

export function useWidgetDelete() {
  const { sitename } = useParams()

  const mutation = useMutationWithNotification({
    mutationFn: async (id) => api.widgets.delete({ sitename, id }),
    redirectTo: `/${sitename}/dashboard/edit/widgets`,
    queryKeyToInvalidate: [WIDGETS, sitename],
    actionWord: 'deleted',
    type: 'widget',
  })

  return mutation
}
