import React from 'react'

// FPCC
import SiteKeyboardsPresentation from 'components/SiteKeyboards/SiteKeyboardsPresentation'
import SiteKeyboardsData from 'components/SiteKeyboards/SiteKeyboardsData'

function SiteKeyboardsContainer() {
  const { title, widgets } = SiteKeyboardsData()

  return (
    <div>
      <SiteKeyboardsPresentation title={title} widgets={widgets} />
    </div>
  )
}

export default SiteKeyboardsContainer
