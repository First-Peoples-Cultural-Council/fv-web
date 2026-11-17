import React from 'react'

// FPCC
import DashboardContactPresentation from 'components/DashboardContact/DashboardContactPresentation'
import DashboardContactData from 'components/DashboardContact/DashboardContactData'
import LoadOrError from 'components/LoadOrError'
import DashboardLanding from 'components/DashboardLanding'

function DashboardContactContainer() {
  const { queryResponse, headerContent, site, page, setPage } =
    DashboardContactData()
  return (
    <div id="DashboardContactContainer">
      <DashboardLanding.Presentation headerContent={headerContent} site={site}>
        <LoadOrError queryResponse={queryResponse}>
          <DashboardContactPresentation
            queryResponse={queryResponse}
            site={site}
            page={page}
            setPage={setPage}
          />
        </LoadOrError>
      </DashboardLanding.Presentation>
    </div>
  )
}

export default DashboardContactContainer
