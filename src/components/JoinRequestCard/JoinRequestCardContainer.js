import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import JoinRequestCardPresentation from 'components/JoinRequestCard/JoinRequestCardPresentation'
import {
  useJoinRequestApprove,
  useJoinRequestIgnore,
} from 'common/dataHooks/useJoinRequests'

function JoinRequestCardContainer({ joinRequest }) {
  const { onSubmit: ignoreRequest } = useJoinRequestIgnore()
  const { onSubmit: approveRequest } = useJoinRequestApprove()

  return (
    <JoinRequestCardPresentation
      joinRequest={joinRequest}
      handleIgnore={() => ignoreRequest(joinRequest?.id)}
      handleApprove={(roleToAssign) => {
        approveRequest({ id: joinRequest.id, role: roleToAssign })
      }}
    />
  )
}

// PROPTYPES
const { object } = PropTypes
JoinRequestCardContainer.propTypes = {
  joinRequest: object,
}

export default JoinRequestCardContainer
