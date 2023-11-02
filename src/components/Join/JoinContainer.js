import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import JoinPresentation from 'components/Join/JoinPresentation'
import JoinData from 'components/Join/JoinData'

function JoinContainer({ site }) {
  const { siteToJoin, stage, submitHandler, errorMessage } = JoinData({ site })

  return (
    <JoinPresentation
      submitHandler={submitHandler}
      site={siteToJoin}
      stage={stage}
      errorMessage={errorMessage}
    />
  )
}
// PROPTYPES
const { object } = PropTypes
JoinContainer.propTypes = {
  site: object,
}

export default JoinContainer
