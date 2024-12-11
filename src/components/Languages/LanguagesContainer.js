import React from 'react'

// FPCC
import LanguagesPresentation from 'components/Languages/LanguagesPresentation'
import LanguagesData from 'components/Languages/LanguagesData'
import DocHead from 'components/DocHead'

function LanguagesContainer() {
  const { languagesQueryResponse, user } = LanguagesData()
  return (
    <>
      <DocHead titleArray={['Explore Languages']} />
      <LanguagesPresentation
        user={user}
        languagesQueryResponse={languagesQueryResponse}
      />
    </>
  )
}

export default LanguagesContainer
