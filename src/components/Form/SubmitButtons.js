import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'

function SubmitButtons({
  cancelIcon,
  cancelLabel,
  submitIcon,
  submitLabel,
  onCancelClick,
  onSubmitClick,
}) {
  return (
    <>
      {onCancelClick && (
        <button
          type="button"
          onClick={() => onCancelClick()}
          className="bg-white border border-gray-300 rounded-lg shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-fv-charcoal hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-light"
        >
          {cancelIcon && getIcon(cancelIcon, 'fill-current -ml-1 mr-2 h-5 w-5')}
          <span>{cancelLabel}</span>
        </button>
      )}
      <button
        type="button"
        onClick={onSubmitClick}
        className="ml-5 bg-secondary border border-transparent rounded-lg shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-secondary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-light"
      >
        {submitIcon && getIcon(submitIcon, 'fill-current -ml-1 mr-2 h-5 w-5')}
        <span>{submitLabel}</span>
      </button>
    </>
  )
}

// PROPTYPES
const { func, string } = PropTypes

SubmitButtons.propTypes = {
  cancelIcon: string,
  cancelLabel: string,
  submitIcon: string,
  submitLabel: string,
  onCancelClick: func,
  onSubmitClick: func,
}

export default SubmitButtons
