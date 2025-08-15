import React from 'react'
import { Route, Routes } from 'react-router'

// FPCC
import DashboardMembershipPresentation from 'components/DashboardMembership/DashboardMembershipPresentation'
import DashboardMembershipData from 'components/DashboardMembership/DashboardMembershipData'

function DashboardMembershipContainer() {
  const {
    queryResponse,
    deleteMembership,
    headerContent,
    site,
    page,
    setPage,
  } = DashboardMembershipData()
  return (
    <div id="DashboardMembershipContainer">
      <Routes>
        <Route
          path=""
          element={
            <DashboardMembershipPresentation
              queryResponse={queryResponse}
              deleteMembership={deleteMembership}
              headerContent={headerContent}
              site={site}
              page={page}
              setPage={setPage}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default DashboardMembershipContainer
