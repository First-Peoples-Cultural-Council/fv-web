import { useQuery } from '@tanstack/react-query'

// FPCC
import { STATS } from 'common/constants'
import api from 'services/api'
import { useParams } from 'react-router-dom'

export function useStats() {
  const { sitename } = useParams()
  const response = useQuery([STATS, sitename], () =>
    api.stats.get({ sitename }),
  )
  const types = [
    'words',
    'phrases',
    'songs',
    'stories',
    'images',
    'audio',
    'video',
  ]
  const temporal = response?.data?.temporal
  const aggregate = response?.data?.aggregate

  const getPeriodTotalForType = (period, modelType) =>
    temporal?.[modelType]?.[period]?.created

  const getPeriodTotal = (period) => {
    let total = 0
    types.forEach((type) => {
      total += getPeriodTotalForType(period, type)
    })
    return total
  }

  const getPeriodTotalsForAllTypes = (period) => {
    const totals = {}
    types.forEach((type) => {
      totals[type] = getPeriodTotalForType(period, type)
    })
    return totals
  }

  const formattedStats = () => {
    const weekTotal = getPeriodTotal('last7Days')
    const monthTotal = getPeriodTotal('lastMonth')

    if (weekTotal > 4) {
      return {
        ...getPeriodTotalsForAllTypes('last7Days'),
        header: 'NEW THIS WEEK',
      }
    }
    if (monthTotal > 4) {
      return {
        ...getPeriodTotalsForAllTypes('lastMonth'),
        header: 'NEW THIS MONTH',
      }
    }
    return {
      words: aggregate?.words?.total,
      phrases: aggregate?.phrases?.total,
      songs: aggregate?.songs?.total,
      stories: aggregate?.stories?.total,
      header: 'ON THIS SITE',
    }
  }

  return {
    ...response,
    data: formattedStats(),
  }
}
