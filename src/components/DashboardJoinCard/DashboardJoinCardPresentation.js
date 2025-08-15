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
import Listbox from 'components/Listbox'

function DashboardJoinCardPresentation({
  joinRequest,
  handleIgnore,
  handleApprove,
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedRole, setSelectedRole] = useState('')

  const nameOfUser =
    joinRequest?.user?.firstName || joinRequest?.user?.lastName
      ? `${joinRequest?.user?.firstName} ${joinRequest?.user?.lastName}`
      : null

  const options = [
    { value: '', label: 'Select a role' },
    { value: MEMBER, label: 'Approve as Member' },
    { value: ASSISTANT, label: 'Approve as Assistant' },
    { value: EDITOR, label: 'Approve as Editor' },
    { value: LANGUAGE_ADMIN, label: 'Approve as Language Admin' },
  ]

  return (
    <li data-testid="DashboardJoinCard" key={joinRequest?.id}>
      <div className="grid grid-cols-2">
        <div className="p-5 col-span-1">
          <div className="flex gap-x-3">
            <p className="font-semibold leading-6 text-charcoal-900">
              {nameOfUser || joinRequest?.user?.email}
            </p>
          </div>
          <div className="mt-1 xl:flex xl:items-center gap-x-2 text-sm leading-5 text-charcoal-500">
            <p>{joinRequest?.user?.email}</p>
            <p>
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
          <div className="inline-flex items-center justify-end space-x-1 w-full">
            <div data-testid="role-select" className="w-72">
              <Listbox.Presentation
                selectedValue={selectedRole}
                options={options}
                setValue={(role) => setSelectedRole(role.split(' ').join('_'))}
              />
            </div>

            <div>
              <label htmlFor="approve-request" className="sr-only">
                Approve and assign role
              </label>
              <button
                id="approve-request"
                data-testid="approve-request-btn"
                type="button"
                disabled={!selectedRole}
                onClick={() => handleApprove(selectedRole)}
                className="btn-primary btn-sm"
              >
                {getIcon('CheckCircleSolid')}
                <span>OK</span>
              </button>
            </div>

            <div>
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
