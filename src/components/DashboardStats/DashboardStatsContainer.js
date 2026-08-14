import React from 'react'

import DashboardStatsPresentation from 'components/DashboardStats/DashboardStatsPresentation'
import { useStats } from 'common/dataHooks/useStats'
import LoadOrError from 'components/LoadOrError'

function DashboardStatsContainer() {
  const queryResponse = useStats()
  return (
    <LoadOrError queryResponse={queryResponse}>
      <DashboardStatsPresentation data={queryResponse?.data} />
    </LoadOrError>
  )
}

export default DashboardStatsContainer
