import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import JoinPresentation from 'components/Join/JoinPresentation'
import JoinData from 'components/Join/JoinData'

function JoinContainer({ linkStyling, site }) {
  const { alreadyMember, isAnonymous, stage, submitHandler, errorMessage } =
    JoinData({ site })

  return alreadyMember || isAnonymous ? (
    ''
  ) : (
    <JoinPresentation
      submitHandler={submitHandler}
      site={site}
      stage={stage}
      errorMessage={errorMessage}
      linkStyling={linkStyling}
    />
  )
}

// PROPTYPES
const { object, string } = PropTypes
JoinContainer.propTypes = {
  site: object.isRequired,
  linkStyling: string,
}

export default JoinContainer
