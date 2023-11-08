import React from 'react'

// FPCC
import DashboardJoinRequestsData from 'components/DashboardJoinRequests/DashboardJoinRequestsData'
import DashboardJoinRequestsPresentation from 'components/DashboardJoinRequests/DashboardJoinRequestsPresentation'

function DashboardJoinRequestsContainer() {
  const { joinRequests, infiniteScroll, loadRef, isLoading, site } =
    DashboardJoinRequestsData()
  return (
    <div id="DashboardJoinRequestsContainer">
      <DashboardJoinRequestsPresentation
        joinRequests={joinRequests}
        isLoading={isLoading}
        site={site}
        infiniteScroll={infiniteScroll}
        loadRef={loadRef}
      />
    </div>
  )
}

export default DashboardJoinRequestsContainer
