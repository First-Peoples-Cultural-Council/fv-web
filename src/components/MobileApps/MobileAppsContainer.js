import React from 'react'

// FPCC
import DocHead from 'components/DocHead'
import MobileAppsData from 'components/MobileApps/MobileAppsData'
import MobileAppsPresentation from 'components/MobileApps//MobileAppsPresentation'

function MobileAppsContainer() {
  const { sitesWithApps } = MobileAppsData()

  return (
    <>
      <DocHead titleArray={['Apps']} />
      <MobileAppsPresentation sitesWithApps={sitesWithApps} />
    </>
  )
}

export default MobileAppsContainer
