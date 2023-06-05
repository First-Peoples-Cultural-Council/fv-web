import React from 'react'

// FPCC
import Languages from 'components/Languages'

function LanguagesContainer() {
  const { allSitesList, userSitesList } = Languages.Data()
  return (
    <Languages.Presentation
      allSitesList={allSitesList}
      userSitesList={userSitesList}
    />
  )
}

export default LanguagesContainer
