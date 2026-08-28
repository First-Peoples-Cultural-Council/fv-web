import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'

// FPCC
import api from 'services/api'
import { useUserStore } from 'context/UserContext'
import { atLeastMember } from 'common/constants/roles'
import { isAtLeastRole } from 'common/utils/membershipHelpers'
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

  const { user } = useUserStore()
  const isMember = isAtLeastRole({
    user,
    sitename: sitename,
    roleRegex: atLeastMember,
  })

  const queryResponse = useQuery({
    queryKey: [STATS, sitename],
    queryFn: () => api.stats.get({ sitename }),
    select: (data) => statsAdaptor(data, isMember),
  })

  return queryResponse
}

const statsAdaptor = (data, isMember) => {
  const dataToReturn = Object.fromEntries(
    STATS_TYPES_FOR_WIDGET.map((type) => [
      type,
      {
        total: isMember
          ? data?.aggregate?.[type]?.members + data?.aggregate?.[type]?.public
          : data?.aggregate?.[type]?.public,
        recent: isMember
          ? data?.temporal?.[type]?.[SIX_MONTHS]?.members +
            data?.temporal?.[type]?.[SIX_MONTHS]?.public
          : data?.temporal?.[type]?.[SIX_MONTHS]?.public,
      },
    ]),
  )

  return dataToReturn
}
