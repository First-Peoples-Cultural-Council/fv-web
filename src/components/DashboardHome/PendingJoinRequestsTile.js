import React from 'react'
import { Link } from 'react-router'

// FPCC
import { useJoinRequests } from 'common/dataHooks/useJoinRequests'
import LoadOrError from 'components/LoadOrError'
import getIcon from 'common/utils/getIcon'
import { useSiteStore } from 'context/SiteContext'

function PendingJoinRequestsTile() {
  const joinRequestsInfiniteQueryResponse = useJoinRequests()
  const { site } = useSiteStore()

  return (
    <Link
      id="PendingJoinRequestsTile"
      to={`/${site?.sitename}/dashboard/memberships/requests`}
      className="rounded-lg bg-white shadow py-4 px-6 space-y-6 hover:bg-blumine-100"
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
    </Link>
  )
}

export default PendingJoinRequestsTile
