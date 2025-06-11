import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { localDateMDYTwords } from 'common/utils/stringHelpers'
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
    <li data-testid="DashboardJoinCard" key={joinRequest?.id}>
      <div className="grid grid-cols-2">
        <div className="p-5 col-span-1">
          <div className="flex gap-x-3">
            <p className="font-semibold leading-6 text-charcoal-900">
              {nameOfUser || joinRequest?.user?.email}
            </p>
          </div>
          <div className="mt-1 flex items-center gap-x-2 text-sm leading-5 text-charcoal-500">
            <p className="whitespace-nowrap">{joinRequest?.user?.email}</p>
            <svg viewBox="0 0 2 2" className="h-1 w-1 fill-current">
              <circle cx={1} cy={1} r={1} />
            </svg>
            <p className="whitespace-nowrap">
              Requested on{' '}
              <time dateTime={joinRequest?.created}>
                {localDateMDYTwords(joinRequest?.created)}
              </time>
            </p>
          </div>

          <button
            data-testid="expand-btn"
            type="button"
            className={`${
              isExpanded ? 'hidden' : 'inline-block'
            } mt-2 text-sm leading-6 text-blumine-600 hover:text-blumine-800 active:text-blumine-900`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            Show more
          </button>
        </div>
        <div className="p-5 col-span-1">
          <div className="lg:inline-flex justify-between w-full">
            <div className="lg:space-x-1 lg:inline-flex items-center">
              <label htmlFor="role-to-assign" className="sr-only">
                Select role to assign
              </label>
              <select
                id="role-to-assign"
                data-testid="role-select"
                onChange={(e) =>
                  setSelectedRole(e.target.value.split(' ').join('_'))
                }
                className="btn-secondary btn-sm"
              >
                <option value={MEMBER}>Approve as Member</option>
                <option value={ASSISTANT}>Approve as Assistant</option>
                <option value={EDITOR}>Approve as Editor</option>
                <option value={LANGUAGE_ADMIN}>
                  Approve as Language Admin
                </option>
              </select>

              <label htmlFor="approve-request" className="sr-only">
                Approve and assign role
              </label>
              <button
                id="approve-request"
                data-testid="approve-request-btn"
                type="button"
                onClick={() => handleApprove(selectedRole)}
                className="btn-primary btn-sm"
              >
                {getIcon('CheckCircleSolid')}
                <span>OK</span>
              </button>
            </div>
            <div className="mt-1 lg:mt-0">
              <label htmlFor="igore-request" className="sr-only">
                Ignore request
              </label>
              <button
                id="igore-request"
                data-testid="igore-request-btn"
                type="button"
                onClick={() => handleIgnore()}
                className="btn-secondary btn-sm text-scarlet-800 border-scarlet-800"
              >
                {getIcon('TimesCircleSolid')}
                <span>Ignore</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={isExpanded ? 'block px-5 pb-5' : 'hidden'}>
        <dl className="space-y-5">
          <div>
            <dt className="text-sm font-semibold leading-4 text-charcoal-900">
              {joinRequest?.reasons?.length === 1
                ? 'Reason for request'
                : 'Reasons for request'}
            </dt>
            <dd className="mt-2 text-base leading-4 text-charcoal-900 capitalize">
              {joinRequest?.reasons?.map((reason) => reason?.reason).join(', ')}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold leading-4 text-charcoal-900">
              Message from the user
            </dt>
            <dd className="mt-2 text-base leading-4 text-charcoal-900">
              {joinRequest?.reasonNote}
            </dd>
          </div>
          <button
            data-testid="show-less"
            type="button"
            className={`${
              isExpanded ? 'inline-block' : 'hidden'
            } mt-2 text-sm leading-6 text-blumine-600 hover:text-blumine-800 active:text-blumine-900`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            Show less
          </button>
        </dl>
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
