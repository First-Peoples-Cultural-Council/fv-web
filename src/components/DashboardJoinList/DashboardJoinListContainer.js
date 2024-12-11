import React from 'react'

// FPCC
import DashboardJoinListPresentation from 'components/DashboardJoinList/DashboardJoinListPresentation'
import { useJoinRequests } from 'common/dataHooks/useJoinRequests'

function DashboardJoinListContainer() {
  const joinRequestsInfiniteQueryResponse = useJoinRequests()
  return (
    <div id="DashboardJoinListContainer">
      <DashboardJoinListPresentation
        joinRequestsInfiniteQueryResponse={joinRequestsInfiniteQueryResponse}
      />
    </div>
  )
}

export default DashboardJoinListContainer
