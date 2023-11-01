import React from 'react'

// FPCC
import JoinPresentation from 'components/Join/JoinPresentation'
import JoinData from 'components/Join/JoinData'

function JoinContainer() {
  const {
    alreadyMember,
    isAnonymous,
    site,
    stage,
    submitHandler,
    errorMessage,
  } = JoinData()

  return alreadyMember || isAnonymous ? (
    ''
  ) : (
    <JoinPresentation
      submitHandler={submitHandler}
      site={site}
      stage={stage}
      errorMessage={errorMessage}
    />
  )
}

export default JoinContainer
