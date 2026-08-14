import React from 'react'

import WidgetStatsPresentation from 'components/WidgetStats/WidgetStatsPresentation'
import { useStatsForWidget } from 'common/dataHooks/useStats'

function WidgetStatsContainer() {
  const queryResponse = useStatsForWidget()
  return <WidgetStatsPresentation data={queryResponse?.data} />
}

export default WidgetStatsContainer
