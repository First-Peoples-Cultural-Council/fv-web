import React from 'react'

// FPCC
import Languages from 'components/Languages'

function LanguagesContainer() {
  const { allSitesList, userSitesList, parentLanguagesData } = Languages.Data()
  return (
    <Languages.Presentation
      allSitesList={allSitesList}
      userSitesList={userSitesList}
      parentLanguagesData={parentLanguagesData}
    />
  )
}

export default LanguagesContainer
