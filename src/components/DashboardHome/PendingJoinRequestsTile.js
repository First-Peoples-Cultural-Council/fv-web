import React from 'react'

// FPCC
import { useJoinRequests } from 'common/dataHooks/useJoinRequests'
import LoadOrError from 'components/LoadOrError'
import getIcon from 'common/utils/getIcon'

function PendingJoinRequestsTile() {
  const joinRequestsInfiniteQueryResponse = useJoinRequests()
  return (
    <div
      id="PendingJoinRequestsTile"
      className="rounded-lg bg-white shadow py-4 px-6 space-y-6"
    >
      <LoadOrError queryResponse={joinRequestsInfiniteQueryResponse}>
        <div>
          <div className="flex items-center space-x-4">
            <div
              className={`flex shrink-none items-center justify-center rounded-md p-3 bg-blumine-500 size-16`}
            >
              {getIcon(
                'ExclamationTriangleSolid',
                'size-8 fill-current text-white',
              )}
            </div>
            <div className=" text-charcoal-500">Pending join requests</div>
            <div className="text-3xl font-bold text-charcoal-900">
              {Math.max(
                joinRequestsInfiniteQueryResponse?.data?.pages?.[0]?.count,
                0,
              )}
            </div>
          </div>
        </div>
      </LoadOrError>
    </div>
  )
}

export default PendingJoinRequestsTile
