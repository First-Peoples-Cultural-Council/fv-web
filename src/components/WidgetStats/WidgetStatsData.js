// FPCC
import { useStats } from '../../common/dataHooks/useStats'

function WidgetStatsData() {
  const stats = useStats()
  return {
    data: stats.data,
  }
}

export default WidgetStatsData
