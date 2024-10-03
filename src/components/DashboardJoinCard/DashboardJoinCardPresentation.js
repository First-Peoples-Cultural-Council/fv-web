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
                {localDateMDYTwords(joinRequest?.created)}
              </time>
            </p>
          </div>

          <button
            data-testid="expand-btn"
            type="button"
            className={`${
              isExpanded ? 'hidden' : 'inline-block'
            } mt-2 text-sm leading-6 text-primary-light hover:text-primary active:text-primary-dark`}
            onClick={() => setIsExpanded(!isExpanded)}
          >
            Show more
          </button>
        </div>
        <div className="p-5 col-span-1">
          <div className="lg:inline-flex justify-between w-full">
            <div className="lg:space-x-1 lg:inline-flex items-center">
              <label htmlFor="role-to-assign" className="sr-only">
                Select message type
              </label>
              <select
                id="role-to-assign"
                data-testid="role-to-assign"
                onChange={(e) =>
                  setSelectedRole(e.target.value.split(' ').join('_'))
                }
                className="btn-outlined text-primary border-primary"
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
                data-testid="approve-request"
                type="button"
                onClick={() => handleApprove(selectedRole)}
                className="btn-contained"
              >
                {getIcon('CheckCircleSolid', 'btn-icon')}
                <span>OK</span>
              </button>
            </div>
            <div className="mt-1 lg:mt-0">
              <label htmlFor="igore-request" className="sr-only">
                Ignore request
              </label>
              <button
                id="igore-request"
                data-testid="igore-request"
                type="button"
                onClick={() => handleIgnore()}
                className="btn-outlined text-secondary border-secondary"
              >
                {getIcon('TimesCircleSolid', 'btn-icon')}
                <span>Ignore</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={isExpanded ? 'block px-5 pb-5' : 'hidden'}>
        <dl className="space-y-5">
          <div>
            <dt className="text-sm font-semibold leading-4 text-fv-charcoal">
              {joinRequest?.reasons?.length === 1
                ? 'Reason for request'
                : 'Reasons for request'}
            </dt>
            <dd className="mt-2 text-base leading-4 text-fv-charcoal capitalize">
              {joinRequest?.reasons?.map((reason) => reason?.reason).join(', ')}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-semibold leading-4 text-fv-charcoal">
              Message from the user
            </dt>
            <dd className="mt-2 text-base leading-4 text-fv-charcoal">
              {joinRequest?.reasonNote}
            </dd>
          </div>
          <button
            data-testid="show-less"
            type="button"
            className={`${
              isExpanded ? 'inline-block' : 'hidden'
            } mt-2 text-sm leading-6 text-primary-light hover:text-primary active:text-primary-dark`}
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
