import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { localDateMDYT } from 'common/utils/stringHelpers'

function DashboardJoinRequestCard({ joinRequest }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const nameOfUser =
    joinRequest?.user?.firstName || joinRequest?.user?.lastName
      ? `${joinRequest?.user?.firstName} ${joinRequest?.user?.lastName}`
      : null
  return (
    <li key={joinRequest?.id} className="flex justify-between gap-x-6">
      <div className="p-5">
        <div className="flex gap-x-3">
          <p className="font-semibold leading-6 text-gray-900">
            {nameOfUser || joinRequest?.user?.email}
          </p>
        </div>
        <div className="mt-1 flex items-center gap-x-2 text-sm leading-5 text-fv-charcoal-light">
          <p className="whitespace-nowrap">{joinRequest?.user?.email}</p>
          <svg viewBox="0 0 2 2" className="h-1 w-1 fill-current">
            <circle cx={1} cy={1} r={1} />
          </svg>
          <p className="whitespace-nowrap">
            Requested on{' '}
            <time dateTime={joinRequest?.created}>
              {localDateMDYT(joinRequest?.created)}
            </time>
          </p>
        </div>

        <div className={isExpanded ? 'block' : 'hidden'}>
          <div className="mt-1 flex items-center gap-x-2 text-sm leading-5 text-fv-charcoal-light">
            Reason/s for request:{' '}
            {joinRequest?.reasons?.map((reason) => (
              <p key={reason?.reason} className="inline-flex capitalize">
                {reason?.reason}
              </p>
            ))}
          </div>
          <div className="mt-1 flex items-center gap-x-2 text-sm leading-5 text-fv-charcoal-light">
            <p className="truncate">Message: {joinRequest?.reasonNote}</p>
          </div>
        </div>
        <button
          type="button"
          className="mt-2 hidden text-sm leading-6 text-primary-light hover:text-primary active:text-primary-dark lg:inline-block"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      </div>

      <div className="space-x-2 p-5">
        <button
          type="button"
          onClick={() => {}}
          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Ignore
          <span className="sr-only">, {nameOfUser}</span>
        </button>
        <button
          type="button"
          onClick={() => {}}
          className="rounded-md px-2.5 py-1.5 text-sm font-semibold bg-secondary text-white shadow-sm hover:bg-secondary-dark"
        >
          Approve
          <span className="sr-only">, {nameOfUser}</span>
        </button>
      </div>
    </li>
  )
}
// PROPTYPES
const { object } = PropTypes
DashboardJoinRequestCard.propTypes = {
  joinRequest: object,
}

export default DashboardJoinRequestCard
