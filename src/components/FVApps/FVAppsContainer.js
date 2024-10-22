import React from 'react'

// FPCC
import FVAppsData from 'components/FVApps/FVAppsData'
import FVAppsPresentation from './FVAppsPresentation'

function FVAppsContainer() {
  const { sitesWithApps } = FVAppsData()

  return <FVAppsPresentation sitesWithApps={sitesWithApps} />
}

export default FVAppsContainer
