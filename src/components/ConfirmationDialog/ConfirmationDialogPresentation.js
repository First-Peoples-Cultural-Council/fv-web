import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Modal from 'components/Modal'

function ConfirmationDialogPresentation({
  onConfirmation,
  message,
  isOpen,
  closeHandler,
}) {
  return (
    <Modal.Presentation isOpen={isOpen} closeHandler={closeHandler}>
      <div
        id="RemoveWidgetModalContent"
        className="inline-block align-bottom space-y-5 bg-white rounded-lg p-6 lg:p-8 overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm sm:w-full"
      >
        <div className="text-center space-y-2">
          <p className="text-2xl text-fv-charcoal">{message}</p>
        </div>
        <div className="w-full justify-center flex space-x-2">
          <button
            type="button"
            type="button"
            className="inline-flex justify-center rounded-lg border-2 border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-fv-charcoal hover:bg-gray-100 sm:text-sm"
            onClick={() => closeHandler()}
          >
            Cancel
          </button>
          <button
            type="button"
            type="button"
            className="inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-secondary text-base font-medium text-white hover:bg-secondary-light sm:text-sm"
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

ConfirmationDialogPresentation.defaultProps = {
  message: 'Are you sure you want to proceed?',
}

export default ConfirmationDialogPresentation
