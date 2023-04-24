import React from 'react'

import WidgetStatsPresentation from 'components/WidgetStats/WidgetStatsPresentation'
import WidgetStatsData from 'components/WidgetStats/WidgetStatsData'

function WidgetStatsContainer() {
  const { data } = WidgetStatsData()
  return <WidgetStatsPresentation data={data} />
}

export default WidgetStatsContainer
