// FPCC
import { useStats } from '../../common/dataHooks/useStats'

function WidgetStatsData() {
  return {
    data: useStats().data,
  }
}

export default WidgetStatsData
