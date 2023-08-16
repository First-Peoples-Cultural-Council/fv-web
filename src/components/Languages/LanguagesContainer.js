import React from 'react'

// FPCC
import LanguagesPresentation from 'components/Languages/LanguagesPresentation'
import LanguagesData from 'components/Languages/LanguagesData'

function LanguagesContainer() {
  const { allSitesList, userSitesList, parentLanguagesData } = LanguagesData()
  return (
    <LanguagesPresentation
      allSitesList={allSitesList}
      userSitesList={userSitesList}
      parentLanguagesData={parentLanguagesData}
    />
  )
}

export default LanguagesContainer
