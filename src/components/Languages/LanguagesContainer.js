import React from 'react'

// FPCC
import LanguagesPresentation from 'components/Languages/LanguagesPresentation'
import LanguagesData from 'components/Languages/LanguagesData'
import Loading from 'components/Loading'

function LanguagesContainer() {
  const { allSitesList, userSitesList, parentLanguagesData, isLoading } =
    LanguagesData()
  return (
    <Loading.Container isLoading={isLoading}>
      <LanguagesPresentation
        allSitesList={allSitesList}
        userSitesList={userSitesList}
        parentLanguagesData={parentLanguagesData}
      />
    </Loading.Container>
  )
}

export default LanguagesContainer
