import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'

function WarningModal({ text }) {
  return (
    <div className="bg-white space-y-2 rounded-lg p-6 lg:p-8 shadow-lg transform transition-all sm:align-middle sm:max-w-sm sm:w-full">
      {getIcon(
        'ExclamationTriangleSolid',
        'fill-current text-wordsy-present h-6 w-6 mx-auto',
      )}
      <h3 className="text-center font-medium text-charcoal-900">{text}</h3>
    </div>
  )
}

const { string } = PropTypes

WarningModal.propTypes = {
  text: string,
}

export default WarningModal
