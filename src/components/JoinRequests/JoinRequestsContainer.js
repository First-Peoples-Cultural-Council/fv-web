import React from 'react'

// FPCC
import JoinRequestsPresentation from 'components/JoinRequests/JoinRequestsPresentation'
import { useJoinRequests } from 'common/dataHooks/useJoinRequests'
import LoadOrError from 'components/LoadOrError'

function JoinRequestsContainer() {
  const joinRequestsInfiniteQueryResponse = useJoinRequests()
  return (
    <div id="JoinRequestsContainer">
      <LoadOrError queryResponse={joinRequestsInfiniteQueryResponse}>
        <JoinRequestsPresentation
          joinRequestsInfiniteQueryResponse={joinRequestsInfiniteQueryResponse}
        />
      </LoadOrError>
    </div>
  )
}

export default JoinRequestsContainer
