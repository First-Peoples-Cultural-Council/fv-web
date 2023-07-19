import { useQuery } from '@tanstack/react-query'

// FPCC
import { PAGES } from 'common/constants'
import api from 'services/api'

export default function usePage({ sitename, pageSlug }) {
  const response = useQuery(
    [PAGES, sitename, pageSlug],
    () => api.pages.getPage({ sitename, pageSlug }),
    { enabled: !!pageSlug },
  )
  return response
}
