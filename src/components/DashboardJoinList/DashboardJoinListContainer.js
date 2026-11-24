import React from 'react'

// FPCC
import DashboardJoinListPresentation from 'components/DashboardJoinList/DashboardJoinListPresentation'
import { useJoinRequests } from 'common/dataHooks/useJoinRequests'
import LoadOrError from 'components/LoadOrError'

function DashboardJoinListContainer() {
  const joinRequestsInfiniteQueryResponse = useJoinRequests()
  return (
    <div id="DashboardJoinListContainer">
      <LoadOrError queryResponse={joinRequestsInfiniteQueryResponse}>
        <DashboardJoinListPresentation
          joinRequestsInfiniteQueryResponse={joinRequestsInfiniteQueryResponse}
        />
      </LoadOrError>
    </div>
  )
}

export default DashboardJoinListContainer
