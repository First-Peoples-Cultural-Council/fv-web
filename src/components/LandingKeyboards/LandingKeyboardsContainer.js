import React from 'react'

// FPCC
import LandingKeyboards from 'components/LandingKeyboards'

function LandingKeyboardsContainer() {
  const data = LandingKeyboards.Data()
  return <LandingKeyboards.Presentation data={data} />
}

export default LandingKeyboardsContainer
