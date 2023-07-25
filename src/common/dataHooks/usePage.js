import { useQuery } from '@tanstack/react-query'

// FPCC
import { PAGES } from 'common/constants'
import api from 'services/api'
import { widgetListAdaptor } from 'common/dataAdaptors'

export default function usePage({ sitename, pageSlug }) {
  const response = useQuery(
    [PAGES, sitename, pageSlug],
    () => api.pages.getPage({ sitename, pageSlug }),
    { enabled: !!pageSlug },
  )

  const widgets = widgetListAdaptor({
    widgetList: response?.data?.widgets,
    sitename,
  })

  return { ...response, data: { ...response?.data, widgets } }
}
