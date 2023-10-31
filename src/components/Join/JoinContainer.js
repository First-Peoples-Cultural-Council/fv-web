import React from 'react'

// FPCC
import JoinPresentation from 'components/Join/JoinPresentation'
import JoinData from 'components/Join/JoinData'

function JoinContainer() {
  const { site, stage, submitHandler } = JoinData()

  return (
    <JoinPresentation submitHandler={submitHandler} site={site} stage={stage} />
  )
}

export default JoinContainer
