import React from 'react'

// FPCC
import DashboardImmersionData from 'components/DashboardImmersion/DashboardImmersionData'
import DashboardImmersionPresentation from 'components/DashboardImmersion/DashboardImmersionPresentation'

function DashboardImmersionContainer() {
  const {
    labels,
    headerContent,
    isLoading,
    site,
    tileContent,
    submitHandler,
    currentLabel,
    setCurrentLabel,
  } = DashboardImmersionData()
  return (
    <DashboardImmersionPresentation
      headerContent={headerContent}
      tileContent={tileContent}
      labels={labels}
      isLoading={isLoading}
      site={site}
      submitHandler={submitHandler}
      currentLabel={currentLabel}
      setCurrentLabel={setCurrentLabel}
    />
  )
}

export default DashboardImmersionContainer
