import React from 'react'

// FPCC
import DashboardJoinListData from 'components/DashboardJoinList/DashboardJoinListData'
import DashboardJoinListPresentation from 'components/DashboardJoinList/DashboardJoinListPresentation'

function DashboardJoinListContainer() {
  const { joinRequests, infiniteScroll, loadRef, isLoading, site } =
    DashboardJoinListData()
  return (
    <div id="DashboardJoinListContainer">
      <DashboardJoinListPresentation
        joinRequests={joinRequests}
        isLoading={isLoading}
        site={site}
        infiniteScroll={infiniteScroll}
        loadRef={loadRef}
      />
    </div>
  )
}

export default DashboardJoinListContainer
