import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

// FPCC
import { SITES } from 'common/constants'
import api from 'services/api'

import { siteAdaptor, languagesListAdaptor } from 'common/dataAdaptors'

export function useSite() {
  const { sitename } = useParams()
  const response = useQuery(
    [SITES, sitename],
    () => api.site.get({ sitename }),
    {
      // The query will not execute until the sitename exists
      enabled: !!sitename,
    },
  )

  const formattedSiteData = siteAdaptor({ siteData: response?.data || [] })

  return { ...response, data: formattedSiteData }
}

export function useSites() {
  const allSitesResponse = useQuery([SITES], () => api.site.getSites())
  const formattedSitesData = languagesListAdaptor({
    languagesData: allSitesResponse?.data,
  })

  return {
    ...allSitesResponse,
    allSitesData: formattedSitesData,
  }
}
