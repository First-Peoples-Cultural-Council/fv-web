import { useQuery } from '@tanstack/react-query'

// FPCC
import { PAGES } from 'common/constants'
import api from 'services/api'
import { getCustomPageHref } from 'common/utils/urlHelpers'

export default function usePages({ sitename }) {
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
