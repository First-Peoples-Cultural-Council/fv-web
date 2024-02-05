import React from 'react'

// FPCC
import LanguagesPresentation from 'components/Languages/LanguagesPresentation'
import LanguagesData from 'components/Languages/LanguagesData'

function LanguagesContainer() {
  const { allSitesList, userSitesList, isLoading, user } = LanguagesData()
  return (
    <LanguagesPresentation
      allSitesList={allSitesList}
      userSitesList={userSitesList}
      user={user}
      isLoading={isLoading}
    />
  )
}

export default LanguagesContainer
