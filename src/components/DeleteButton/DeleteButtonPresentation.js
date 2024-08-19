import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import Modal from 'components/Modal'
import useAuthCheck from 'common/hooks/useAuthCheck'
import { EDITOR } from 'common/constants'

function DeleteButtonPresentation({
  deleteHandler,
  label = 'Delete',
  message = 'Are you sure you want to delete this?',
  note = null,
  styling = 'btn-outlined',
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
        >
          {getIcon('Trash', 'btn-icon')}
          <span>{label}</span>
        </button>

        <Modal.Presentation
          isOpen={deleteModalOpen}
          closeHandler={() => setDeleteModalOpen(false)}
        >
          <div
            data-testid="DeleteModal"
            className="inline-block align-bottom space-y-5 bg-white rounded-lg p-6 lg:p-8 overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm sm:w-full"
          >
            <div className="text-center space-y-2">
              <p className="text-2xl text-fv-charcoal">{message}</p>
              {note && <p className="text-fv-charcoal-light">{note}</p>}
              <p className="text-fv-charcoal-light">
                You can&apos;t undo this action.
              </p>
            </div>
            <div className="w-full justify-center flex space-x-2">
              <button
                data-testid="delete-cancel"
                type="button"
                className="btn-outlined"
                onClick={() => setDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                data-testid="delete-confirm"
                type="button"
                className="btn-contained bg-secondary"
                onClick={() => {
                  setDeleteModalOpen(false)
                  deleteHandler()
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </Modal.Presentation>
      </>
    )
  )
}
// PROPTYPES
const { func, string } = PropTypes
DeleteButtonPresentation.propTypes = {
  deleteHandler: func,
  label: string,
  message: string,
  note: string,
  styling: string,
}

export default DeleteButtonPresentation
