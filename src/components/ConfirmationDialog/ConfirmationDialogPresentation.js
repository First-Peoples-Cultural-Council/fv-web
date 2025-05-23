import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Modal from 'components/Modal'

function ConfirmationDialogPresentation({
  onConfirmation,
  message = 'Are you sure you want to proceed?',
  isOpen,
  closeHandler,
}) {
  return (
    <Modal.Presentation isOpen={isOpen} closeHandler={closeHandler}>
      <div
        data-testid="ConfirmationDialogPresentation"
        className="inline-block align-bottom space-y-5 bg-white rounded-lg p-6 lg:p-8 overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm sm:w-full"
      >
        <div className="text-center space-y-2">
          <p className="text-2xl text-charcoal-900">{message}</p>
        </div>
        <div className="w-full justify-center flex space-x-2">
          <button
            data-testid="cancel"
            type="button"
            className="btn-outlined"
            onClick={() => closeHandler()}
          >
            Cancel
          </button>
          <button
            data-testid="confirm"
            type="button"
            className="btn-contained bg-scarlet-800"
            onClick={() => {
              onConfirmation()
              closeHandler()
            }}
          >
            OK
          </button>
        </div>
      </div>
    </Modal.Presentation>
  )
}
// PROPTYPES
const { bool, func, string } = PropTypes
ConfirmationDialogPresentation.propTypes = {
  onConfirmation: func,
  closeHandler: func,
  message: string,
  isOpen: bool,
}

export default ConfirmationDialogPresentation
