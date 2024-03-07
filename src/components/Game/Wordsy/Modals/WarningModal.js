import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Modal from 'components/Modal'
import getIcon from 'common/utils/getIcon'

function WarningModal({ isOpen, closeHandler, message }) {
  return (
    <Modal.Presentation isOpen={isOpen} closeHandler={closeHandler}>
      <div className="bg-white space-y-2 rounded-lg p-6 lg:p-8 shadow-lg transform transition-all sm:align-middle sm:max-w-sm sm:w-full">
        {getIcon(
          'ExclamationTriangleSolid',
          'fill-current text-wordsy-present h-6 w-6 mx-auto',
        )}
        <h3 className="text-center font-medium text-fv-charcoal">{message}</h3>
      </div>
    </Modal.Presentation>
  )
}

const { bool, func, string } = PropTypes

WarningModal.propTypes = {
  isOpen: bool,
  closeHandler: func,
  message: string,
}

export default WarningModal
