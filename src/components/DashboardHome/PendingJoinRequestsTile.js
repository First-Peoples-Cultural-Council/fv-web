import React from 'react'
import { Link } from 'react-router'

// FPCC
import { useJoinRequests } from 'common/dataHooks/useJoinRequests'
import LoadOrError from 'components/LoadOrError'
import getIcon from 'common/utils/getIcon'
import { useSiteStore } from 'context/SiteContext'

function PendingJoinRequestsTile() {
  const queryResponse = useJoinRequests({ page: 1 })
  const { site } = useSiteStore()

  return (
    <Link
      id="PendingJoinRequestsTile"
      to={`/${site?.sitename}/dashboard/memberships/requests`}
      className="rounded-lg bg-white shadow py-4 px-6 space-y-6 hover:bg-blumine-100"
    >
      <LoadOrError queryResponse={queryResponse}>
        <div>
          <div className="flex items-center space-x-4">
            <div
              className={`flex shrink-none items-center justify-center rounded-md p-3 bg-ochre-700 size-16`}
            >
              {getIcon(
                queryResponse?.data?.count > 0
                  ? 'ExclamationTriangleSolid'
                  : 'Checkmark',
                'size-8 fill-current text-white',
              )}
            </div>
            <div className=" text-charcoal-500">New join requests</div>
            <div className="text-3xl font-bold text-charcoal-900">
              {queryResponse?.data?.count || 0}
            </div>
          </div>
        </div>
      </LoadOrError>
    </Link>
  )
}

export default PendingJoinRequestsTile
