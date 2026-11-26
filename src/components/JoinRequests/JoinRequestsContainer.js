import React, { useState } from 'react'

// FPCC
import JoinRequestsPresentation from 'components/JoinRequests/JoinRequestsPresentation'
import { useJoinRequests } from 'common/dataHooks/useJoinRequests'
import LoadOrError from 'components/LoadOrError'

function JoinRequestsContainer() {
  const [page, setPage] = useState(1)
  const queryResponse = useJoinRequests({ page })

  return (
    <div id="JoinRequestsContainer">
      <LoadOrError queryResponse={queryResponse}>
        <JoinRequestsPresentation
          queryResponse={queryResponse}
          page={page}
          setPage={setPage}
        />
      </LoadOrError>
    </div>
  )
}

export default JoinRequestsContainer
