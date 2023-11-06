import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import JoinPresentation from 'components/Join/JoinPresentation'
import JoinData from 'components/Join/JoinData'

function JoinContainer({ site, closeModalCallback }) {
  const { siteToJoin, stage, submitHandler, errorMessage, errorTitle } =
    JoinData({ site })

  return (
    <JoinPresentation
      submitHandler={submitHandler}
      site={siteToJoin}
      stage={stage}
      closeModalCallback={closeModalCallback}
      errorMessage={errorMessage}
      errorTitle={errorTitle}
    />
  )
}
// PROPTYPES
const { func, object } = PropTypes
JoinContainer.propTypes = {
  site: object,
  closeModalCallback: func,
}

export default JoinContainer
