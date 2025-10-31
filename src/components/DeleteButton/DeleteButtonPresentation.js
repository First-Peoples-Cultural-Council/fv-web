import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import Modal from 'components/Modal'
import useAuthCheck from 'common/hooks/useAuthCheck'
import { EDITOR } from 'common/constants'

function DeleteButtonPresentation({
  deleteHandler,
  label,
  disabled = false,
  message = 'Are you sure you want to delete this?',
  note = null,
  styling = 'btn-secondary btn-md',
}) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const { checkIfUserAtLeastRole } = useAuthCheck()
  const atLeastEditor = checkIfUserAtLeastRole(EDITOR)

  return (
    atLeastEditor && (
      <>
        <button
          data-testid="DeleteButton"
          type="button"
          onClick={() => setDeleteModalOpen(true)}
          className={styling}
          disabled={disabled}
        >
          {getIcon('Trash')}
          {label && <span>{label}</span>}
        </button>

        <Modal.Presentation
          isOpen={deleteModalOpen}
          closeHandler={() => setDeleteModalOpen(false)}
        >
          <div
            data-testid="DeleteModal"
            className="inline-block align-bottom space-y-8 bg-white rounded-3xl p-6 lg:py-11 lg:px-16 overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-xl sm:w-full"
          >
            <div className="space-y-5 text-blumine-900">
              <h3 className="text-center text-xl font-bold">{message}</h3>
              <p className="text-center text-pretty">
                {note ? `${note} ` : ''}You can&apos;t undo this action.
              </p>
            </div>
            <div className="w-full justify-center flex space-x-2">
              <button
                data-testid="delete-cancel"
                type="button"
                className="btn-secondary btn-md"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                data-testid="delete-confirm"
                type="button"
                className="btn-primary btn-md bg-scarlet-800 text-scarlet-50 hover:bg-scarlet-900 focus:outline-hidden focus:ring-2 focus:ring-scarlet-500"
                onClick={() => {
                  setDeleteModalOpen(false)
                  deleteHandler()
                }}
              >
                {getIcon('Trash')}
                <span>Delete</span>
              </button>
            </div>
          </div>
        </Modal.Presentation>
      </>
    )
  )
}
// PROPTYPES
const { bool, func, string } = PropTypes
DeleteButtonPresentation.propTypes = {
  deleteHandler: func,
  disabled: bool,
  label: string,
  message: string,
  note: string,
  styling: string,
}

export default DeleteButtonPresentation
