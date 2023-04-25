import React from 'react'

// FPCC
import KidsPresentation from 'components/Kids/KidsPresentation'
import KidsData from 'components/Kids/KidsData'

function KidsContainer() {
  const { links, sitename, siteTitle } = KidsData()
  return (
    <KidsPresentation links={links} sitename={sitename} siteTitle={siteTitle} />
  )
}

export default KidsContainer
