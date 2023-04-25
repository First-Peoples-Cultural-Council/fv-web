import { useQuery } from 'react-query'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import api from 'services/api'

function WidgetStatsData() {
  const { site } = useSiteStore()
  const { data } = useQuery(
    ['stats', site?.uid],
    () => api.widget.getStats({ siteId: site?.uid }),
    {
      // The query will not execute until the site?.uid exists
      enabled: !!site?.uid,
      refetchOnWindowFocus: false,
    },
  )

  const types = ['words', 'phrases', 'songs', 'stories']
  const temporal = data?.temporal
  const aggreggate = data?.aggregate

  const getPeriodTotalForType = (period, docType) =>
    temporal?.[docType]?.[period]?.created

  const getPeriodTotal = (period) => {
    let total = 0
    types.forEach((type) => (total += getPeriodTotalForType(period, type)))
    return total
  }

  const getPeriodTotalsForAllTypes = (period) => {
    const totals = {}
    types.forEach(
      (type) => (totals[type] = getPeriodTotalForType(period, type)),
    )
    return totals
  }

  const statsDataAdaptor = () => {
    const weekTotal = getPeriodTotal('last_7_days')
    const monthTotal = getPeriodTotal('last_month')

    if (weekTotal > 4) {
      return {
        ...getPeriodTotalsForAllTypes('last_7_days'),
        header: 'NEW THIS WEEK',
      }
    }
    if (monthTotal > 4) {
      return {
        ...getPeriodTotalsForAllTypes('last_month'),
        header: 'NEW THIS MONTH',
      }
    }
    return {
      words: aggreggate?.words?.total,
      phrases: aggreggate?.phrases?.total,
      songs: aggreggate?.songs?.total,
      stories: aggreggate?.stories?.total,
      header: 'ON THIS SITE',
    }
  }

  return {
    data: statsDataAdaptor(),
  }
}

export default WidgetStatsData
