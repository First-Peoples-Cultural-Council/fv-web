import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { localDateMDYTwords } from 'common/utils/stringHelpers'
import {
  LANGUAGE_ADMIN,
  EDITOR,
  ASSISTANT,
  MEMBER,
  LANGUAGE_ADMIN_ENUM_NAME,
  EDITOR_ENUM_NAME,
  ASSISTANT_ENUM_NAME,
  MEMBER_ENUM_NAME,
} from 'common/constants'
import getIcon from 'common/utils/getIcon'
import CustomListbox from 'components/CustomListbox'
import Modal from 'components/Modal'

function DashboardJoinCardPresentation({
  joinRequest,
  handleIgnore,
  handleApprove,
}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedRole, setSelectedRole] = useState('')
  const [approveModalOpen, setApproveModalOpen] = useState(false)
  const [ignoreModalOpen, setIgnoreModalOpen] = useState(false)

  const nameOfUser =
    joinRequest?.user?.firstName || joinRequest?.user?.lastName
      ? `${joinRequest?.user?.firstName} ${joinRequest?.user?.lastName}`
      : null

  const options = [
    { value: '', label: 'Select a role' },
    {
      value: MEMBER_ENUM_NAME,
      label: 'Approve as Member',
      role: MEMBER,
      article: 'a',
      abilities: 'view public and members only content',
    },
    {
      value: ASSISTANT_ENUM_NAME,
      label: 'Approve as Assistant',
      role: ASSISTANT,
      article: 'an',
      abilities: 'upload and edit private entries',
    },
    {
      value: EDITOR_ENUM_NAME,
      label: 'Approve as Editor',
      role: EDITOR,
      article: 'an',
      abilities: 'upload, edit, delete, and hide/publish all entries',
    },
    {
      value: LANGUAGE_ADMIN_ENUM_NAME,
      label: 'Approve as Language Admin',
      role: LANGUAGE_ADMIN,
      article: 'a',
      abilities:
        'upload, edit, delete, and hide/publish all site content, and manage memberships',
    },
  ]

  const displayName = nameOfUser || joinRequest?.user?.email
  const selectedOption = options.find((option) => option.value === selectedRole)

  return (
    <li data-testid="DashboardJoinCard" key={joinRequest?.id}>
      <div className="grid grid-cols-2">
        <div className="p-5 col-span-1">
          <div className="flex gap-x-3">
            <p className="font-semibold leading-6 text-charcoal-900">
              {displayName}
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
              <CustomListbox
                selectedValue={selectedRole}
                onChange={(role) => setSelectedRole(role)}
                options={options}
                buttonStyling="w-full btn-secondary btn-sm"
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
                onClick={() => setApproveModalOpen(true)}
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
                onClick={() => setIgnoreModalOpen(true)}
                className="btn-secondary btn-sm text-scarlet-800 border-scarlet-800 hover:bg-scarlet-50"
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

      <Modal.Presentation
        isOpen={approveModalOpen}
        closeHandler={() => setApproveModalOpen(false)}
      >
        <div
          data-testid="ApproveRequestModal"
          className="inline-block align-bottom space-y-8 bg-white rounded-3xl p-6 lg:p-8 overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-xl sm:w-full"
        >
          <div className="space-y-5 text-blumine-900  text-left">
            <h3 className="text-xl font-bold">
              Approve {displayName} as {selectedOption?.role}?
            </h3>
            <div className="text-pretty space-y-2">
              <p>
                They will be added to your site as {selectedOption?.article}{' '}
                <strong>{selectedOption?.role}</strong> and will be able to{' '}
                {selectedOption?.abilities}.
              </p>
              <p>They will receive an email to let them know.</p>
              <p>
                {selectedRole === LANGUAGE_ADMIN_ENUM_NAME
                  ? 'Once approved, only FirstVoices Support can change or remove a Language Admin.'
                  : 'You can change their role or remove them later in Member Management.'}
              </p>
            </div>
          </div>
          <div className="w-full justify-end flex space-x-2">
            <button
              data-testid="approve-cancel"
              type="button"
              className="btn-secondary btn-md"
              onClick={() => setApproveModalOpen(false)}
            >
              Cancel
            </button>
            <button
              data-testid="approve-confirm"
              type="button"
              className="btn-primary btn-md"
              onClick={() => {
                setApproveModalOpen(false)
                handleApprove(selectedRole)
              }}
            >
              {getIcon('CheckCircleSolid')}
              <span>Approve</span>
            </button>
          </div>
        </div>
      </Modal.Presentation>

      <Modal.Presentation
        isOpen={ignoreModalOpen}
        closeHandler={() => setIgnoreModalOpen(false)}
      >
        <div
          data-testid="IgnoreRequestModal"
          className="inline-block align-bottom space-y-8 bg-white rounded-3xl p-6 lg:p-8 overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-xl sm:w-full"
        >
          <div className="space-y-5 text-blumine-900 text-left">
            <h3 className="text-xl font-bold">Ignore this request?</h3>
            <div className="text-pretty space-y-2">
              <p>The request will be removed from this list.</p>
              <p>
                <strong>{displayName}</strong> will not be notified and can send
                a new request later.
              </p>
            </div>
          </div>
          <div className="w-full justify-end flex space-x-2">
            <button
              data-testid="ignore-cancel"
              type="button"
              className="btn-secondary btn-md"
              onClick={() => setIgnoreModalOpen(false)}
            >
              Cancel
            </button>
            <button
              data-testid="ignore-confirm"
              type="button"
              className="btn-primary btn-md bg-scarlet-800 text-scarlet-50 hover:bg-scarlet-900 focus:outline-hidden focus:ring-2 focus:ring-scarlet-500"
              onClick={() => {
                setIgnoreModalOpen(false)
                handleIgnore()
              }}
            >
              {getIcon('TimesCircleSolid')}
              <span>Ignore</span>
            </button>
          </div>
        </div>
      </Modal.Presentation>
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
