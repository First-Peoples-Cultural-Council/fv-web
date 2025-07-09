import React from 'react'
import SiteDocHead from 'components/SiteDocHead'

// FPCC
import DashboardImmersionData from 'components/DashboardImmersion/DashboardImmersionData'
import DashboardImmersionPresentation from 'components/DashboardImmersion/DashboardImmersionPresentation'

function DashboardImmersionContainer() {
  const {
    queryResponse,
    headerContent,

    site,
    tileContent,
    submitHandler,
    currentLabel,
    setCurrentLabel,
  } = DashboardImmersionData()
  return (
    <>
      <SiteDocHead titleArray={['Immersion Labels']} />
      <DashboardImmersionPresentation
        queryResponse={queryResponse}
        headerContent={headerContent}
        tileContent={tileContent}
        site={site}
        submitHandler={submitHandler}
        currentLabel={currentLabel}
        setCurrentLabel={setCurrentLabel}
      />
    </>
  )
}

export default DashboardImmersionContainer
