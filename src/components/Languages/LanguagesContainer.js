import React from 'react'

// FPCC
import LanguagesPresentation from 'components/Languages/LanguagesPresentation'
import LanguagesData from 'components/Languages/LanguagesData'
import Loading from 'components/Loading'

function LanguagesContainer() {
  const { allSitesList, userSitesList, isLoading, user } = LanguagesData()
  return (
    <Loading.Container isLoading={isLoading}>
      <LanguagesPresentation
        allSitesList={allSitesList}
        userSitesList={userSitesList}
        user={user}
      />
    </Loading.Container>
  )
}

export default LanguagesContainer
