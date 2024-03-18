import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import Modal from 'components/Modal'

function DeleteButtonMediaPresentation({ docType, usage, deleteHandler }) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        data-testid="DeleteButton"
        onClick={() => setDeleteModalOpen(true)}
        className="btn-outlined"
      >
        {getIcon('Trash', 'btn-icon')}
        <span>Delete</span>
      </button>

      <Modal.Presentation
        isOpen={deleteModalOpen}
        closeHandler={() => setDeleteModalOpen(false)}
      >
        <div
          data-testid="DeleteModal"
          className="inline-block align-bottom space-y-5 bg-white rounded-lg p-6 overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm sm:w-full"
        >
          <div className="text-center space-y-2">
            <p className="text-xl text-fv-charcoal">
              Are you sure you want to delete this {docType} from your site ?
            </p>
            <p>
              This {docType} file is being used on your site in{' '}
              <span className="font-bold">{usage?.total}</span> places. Deleting
              it will remove it from all of them. Are you sure you want to
              delete it?
            </p>
            <p className="text-fv-charcoal-light">
              You can&apos;t undo this action.
            </p>
          </div>
          <div className="w-full justify-center flex space-x-2">
            <button
              data-testid="delete-cancel"
              type="button"
              className="inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-secondary text-base font-medium text-white hover:bg-secondary-light sm:text-sm"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </button>
            <button
              data-testid="delete-confirm"
              type="button"
              className="inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-secondary text-base font-medium text-white hover:bg-secondary-light sm:text-sm"
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
}
// PROPTYPES
const { func, object, string } = PropTypes
DeleteButtonMediaPresentation.propTypes = {
  docType: string,
  usage: object,
  deleteHandler: func,
}

export default DeleteButtonMediaPresentation
