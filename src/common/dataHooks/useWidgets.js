import { useQuery } from '@tanstack/react-query'
import { useParams, useNavigate } from 'react-router'

// FPCC
import api from 'services/api'
import useMutationWithNotification from 'common/dataHooks/useMutationWithNotification'
import useInfiniteScroll from 'common/dataHooks/useInfiniteScroll'
import { useUserStore } from 'context/UserContext'
import { HOME, ID_TO_ADD, WIDGETS } from 'common/constants'
import {
  widgetForApi,
  widgetForEditing,
  widgetForViewing,
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
  const infiniteQueryResponse = useInfiniteScroll({
    queryKey: [WIDGETS, sitename],
    queryFn: ({ pageParam = 1 }) =>
      api.widgets.getAll({
        sitename,
        pageParam,
      }),
    resultAdaptor: (result) => widgetForViewing({ item: result, isSuperAdmin }),
  })

  return infiniteQueryResponse
}

export function useWidgetCreate({ destination }) {
  const { sitename } = useParams()
  const navigate = useNavigate()

  const createWidget = async (formData) => {
    const properties = widgetForApi({ formData })
    return api.widgets.create({
      sitename,
      properties,
    })
  }

  const onSuccessCallback = (response) => {
    if (destination === HOME) {
      navigate(`/${sitename}/dashboard/edit/home?${ID_TO_ADD}=${response?.id}`)
    } else if (destination) {
      navigate(
        `/${sitename}/dashboard/edit/page?slug=${destination}&${ID_TO_ADD}=${response?.id}`,
      )
    } else {
      navigate(`/${sitename}/dashboard/edit/widgets`)
    }
  }

  const mutation = useMutationWithNotification({
    mutationFn: createWidget,
    onSuccessCallback,
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
