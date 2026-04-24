import React from 'react'

import WidgetStatsPresentation from 'components/WidgetStats/WidgetStatsPresentation'
import { useStats } from 'common/dataHooks/useStats'

function WidgetStatsContainer() {
  const queryResponse = useStats()
  return <WidgetStatsPresentation data={queryResponse?.data} />
}

export default WidgetStatsContainer
