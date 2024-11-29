import React from 'react'

// FPCC
import LanguagesPresentation from 'components/Languages/LanguagesPresentation'
import LanguagesData from 'components/Languages/LanguagesData'
import DocHead from 'components/DocHead'

function LanguagesContainer() {
  const { allSitesList, userSitesList, isLoading, user } = LanguagesData()
  return (
    <>
      <DocHead titleArray={['Explore Languages']} />
      <LanguagesPresentation
        allSitesList={allSitesList}
        userSitesList={userSitesList}
        user={user}
        isLoading={isLoading}
      />
    </>
  )
}

export default LanguagesContainer
