import React from 'react'

// FPCC

import MobileAppsData from 'components/MobileApps/MobileAppsData'
import MobileAppsPresentation from 'components/MobileApps//MobileAppsPresentation'

function MobileAppsContainer() {
  const { sitesWithApps } = MobileAppsData()

  return <MobileAppsPresentation sitesWithApps={sitesWithApps} />
}

export default MobileAppsContainer
