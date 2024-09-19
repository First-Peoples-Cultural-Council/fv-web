import React from 'react'

// FPCC
import SiteKeyboardsPresentation from 'components/SiteKeyboards/SiteKeyboardsPresentation'
import SiteKeyboardsData from 'components/SiteKeyboards/SiteKeyboardsData'

function SiteKeyboardsContainer() {
  const { title, widgets } = SiteKeyboardsData()

  return <SiteKeyboardsPresentation title={title} widgets={widgets} />
}

export default SiteKeyboardsContainer
