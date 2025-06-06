import React from 'react'
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
    <div className="space-x-2">
      {onCancelClick && (
        <button
          data-testid="form-cancel"
          type="button"
          onClick={() => onCancelClick()}
          className="btn-secondary btn-md"
        >
          {cancelIcon && getIcon(cancelIcon)}
          <span>{cancelLabel}</span>
        </button>
      )}
      <button
        data-testid="form-submit"
        type="button"
        onClick={onSubmitClick}
        className="btn-primary btn-md"
      >
        {submitIcon && getIcon(submitIcon)}
        <span>{submitLabel}</span>
      </button>
    </div>
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
