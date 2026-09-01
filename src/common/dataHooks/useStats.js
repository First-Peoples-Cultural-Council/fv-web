import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'

// FPCC
import api from 'services/api'
import { SIX_MONTHS, STATS, STATS_TYPES_FOR_WIDGET } from 'common/constants'

export function useStats() {
  const { sitename } = useParams()
  const queryResponse = useQuery({
    queryKey: [STATS, sitename],
    queryFn: () => api.stats.get({ sitename }),
  })

  return queryResponse
}

export function useStatsForWidget() {
  const { sitename } = useParams()

  const queryResponse = useQuery({
    queryKey: [STATS, sitename],
    queryFn: () => api.stats.get({ sitename }),
    select: (data) => statsAdaptor(data),
  })

  return queryResponse
}

const statsAdaptor = (data) => {
  const dataToReturn = Object.fromEntries(
    STATS_TYPES_FOR_WIDGET.map((type) => [
      type,
      {
        total: data?.aggregate?.[type]?.total ?? 0,
        recent: data?.temporal?.[type]?.[SIX_MONTHS]?.created?.total ?? 0,
      },
    ]),
  )

  return dataToReturn
}
