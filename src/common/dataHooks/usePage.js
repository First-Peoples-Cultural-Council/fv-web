import { useQuery } from '@tanstack/react-query'

// FPCC
import { PAGES } from 'common/constants'
import api from 'services/api'
import { getObjectFromSettingsArray } from 'common/utils/widgetHelpers'

export default function usePage({ sitename, pageSlug }) {
  const response = useQuery(
    [PAGES, sitename, pageSlug],
    () => api.pages.getPage({ sitename, pageSlug }),
    { enabled: !!pageSlug },
  )

  const widgets = response?.data?.widgets?.map((widget) => ({
    format: widget?.format,
    settings: getObjectFromSettingsArray(widget?.settings),
    nickname: widget?.title,
    type: widget?.type,
    id: widget?.id,
  }))

  return { ...response, data: { ...response?.data, widgets } }
}
