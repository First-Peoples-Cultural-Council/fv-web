import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import { PAGES } from 'common/constants'
import api from 'services/api'
import { getCustomPageHref } from 'common/utils/urlHelpers'
import { widgetListAdaptor } from 'common/dataAdaptors'

export function usePage({ pageSlug }) {
  const { sitename } = useParams()
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

export function usePages() {
  const { sitename } = useParams()

  const response = useQuery(
    [PAGES, sitename],
    () => api.pages.getPages({ sitename }),
    { enabled: !!sitename },
  )

  const formattedPages = response?.data?.results?.map((page) => ({
    id: page?.id,
    title: page?.title,
    subtitle: page?.subtitle,
    url: page?.slug,
    href: getCustomPageHref({
      sitename,
      pageSlug: page?.slug,
    }),
  }))

  return { ...response, data: { ...response?.data, results: formattedPages } }
}
