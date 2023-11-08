import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { localDateMDYT } from 'common/utils/stringHelpers'
import {
  MEMBER,
  ASSISTANT,
  EDITOR,
  LANGUAGE_ADMIN,
} from 'common/constants/roles'
import getIcon from 'common/utils/getIcon'

function DashboardJoinCardPresentation({
  joinRequest,
  handleIgnore,
  handleApprove,
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedRole, setSelectedRole] = useState(MEMBER)

  const nameOfUser =
    joinRequest?.user?.firstName || joinRequest?.user?.lastName
      ? `${joinRequest?.user?.firstName} ${joinRequest?.user?.lastName}`
      : null
  return (
    <li key={joinRequest?.id} className="flex justify-between gap-x-6">
      <div className="p-5">
        <div className="flex gap-x-3">
          <p className="font-semibold leading-6 text-fv-charcoal">
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
      <div className="p-5 inline-flex">
        <div className="space-x-1">
          <label htmlFor="role-to-assign" className="sr-only">
            Select message type
          </label>
          <select
            id="role-to-assign"
            name="role-to-assign"
            onChange={(e) => setSelectedRole(e.target.value)}
            className="rounded-lg py-1.5 pl-3 pr-9 text-sm text-primary border border-primary shadow-sm hover:bg-gray-50"
          >
            <option value={MEMBER}>Member</option>
            <option value={ASSISTANT}>Assistant</option>
            <option value={EDITOR}>Editor</option>
            <option value={LANGUAGE_ADMIN}>Language Admin</option>
          </select>

          <label htmlFor="approve-request" className="sr-only">
            Approve and assign role
          </label>
          <button
            id="approve-request"
            name="approve-request"
            type="button"
            onClick={() => handleApprove(selectedRole)}
            className="inline-flex items-center gap-x-2 rounded-lg px-2.5 py-1.5 text-sm bg-primary text-white shadow-sm hover:bg-primary-dark"
          >
            Approve
            <span className="sr-only">, {nameOfUser}</span>
            {getIcon('CheckCircleSolid', 'h-4 w-4 fill-current')}
          </button>
        </div>
        <div className="ml-5">
          <label htmlFor="igore-request" className="sr-only">
            Ignore request
          </label>
          <button
            type="button"
            id="igore-request"
            name="igore-request"
            onClick={() => handleIgnore()}
            className="inline-flex items-center gap-x-2 rounded-lg px-2.5 py-1.5 text-sm text-secondary border border-secondary shadow-sm hover:bg-gray-50"
          >
            Ignore
            <span className="sr-only">, {nameOfUser}</span>
            {getIcon('TimesCircleSolid', 'h-4 w-4 fill-current')}
          </button>
        </div>
      </div>
    </li>
  )
}
// PROPTYPES
const { func, object } = PropTypes
DashboardJoinCardPresentation.propTypes = {
  joinRequest: object,
  handleIgnore: func,
  handleApprove: func,
}

export default DashboardJoinCardPresentation
