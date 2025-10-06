import { useQuery } from '@tanstack/react-query'

// FPCC
import { MY_SITES } from 'common/constants'
import api from 'services/api'
import { sitesListAdaptor } from 'common/dataAdaptors/siteAdaptors'

export function useMySites() {
  const queryResponse = useQuery({
    queryKey: [MY_SITES],
    queryFn: () => api.mySites.get(),
    select: (data) =>
      sitesListAdaptor({
        sitesData: data?.results,
      }),
  })

  return queryResponse
}
