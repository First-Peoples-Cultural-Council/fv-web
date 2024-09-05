import { useQuery } from '@tanstack/react-query'

// FPCC
import { MY_SITES } from 'common/constants'
import api from 'services/api'
import { sitesListAdaptor } from 'common/dataAdaptors/siteAdaptors'

export function useMySites() {
  const response = useQuery({
    queryKey: [MY_SITES],
    queryFn: () => api.mySites.get(),
  })
  const formattedUserSitesData = sitesListAdaptor({
    sitesData: response?.data?.results,
  })
  return {
    ...response,
    mySitesData: formattedUserSitesData,
  }
}
