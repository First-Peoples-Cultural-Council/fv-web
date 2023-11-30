import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import Modal from 'components/Modal'
import { SECONDARY_BUTTON_STYLE } from 'common/constants/styles'

function DeleteButtonPresentation({ deleteHandler, label, message, styling }) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        id="DeleteButton"
        onClick={() => setDeleteModalOpen(true)}
        className={styling}
      >
        {getIcon('Trash', 'fill-current -ml-1 mr-2 h-5 w-5')}
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
            <p className="text-fv-charcoal-light">
              You can&apos;t undo this action.
            </p>
          </div>
          <div className="w-full justify-center flex space-x-2">
            <button
              type="button"
              className="inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-secondary text-base font-medium text-white hover:bg-secondary-light sm:text-sm"
              onClick={() => setDeleteModalOpen(false)}
            >
              Cancel
            </button>
            <button
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
const { func, string } = PropTypes
DeleteButtonPresentation.propTypes = {
  deleteHandler: func,
  label: string,
  message: string,
  styling: string,
}

DeleteButtonPresentation.defaultProps = {
  label: 'Delete',
  message: 'Are you sure you want to delete this?',
  styling: SECONDARY_BUTTON_STYLE,
}

export default DeleteButtonPresentation
