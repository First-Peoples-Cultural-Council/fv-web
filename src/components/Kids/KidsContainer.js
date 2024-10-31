import React from 'react'

// FPCC
import KidsPresentation from 'components/Kids/KidsPresentation'
import KidsData from 'components/Kids/KidsData'

function KidsContainer() {
  const { links, sitename, site } = KidsData()
  return <KidsPresentation links={links} sitename={sitename} site={site} />
}

export default KidsContainer
