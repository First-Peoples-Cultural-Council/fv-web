import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import { PRIMARY_BUTTON_STYLE } from 'common/constants/styles'

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
          data-testid="form-cancel"
          type="button"
          onClick={() => onCancelClick()}
          className="btn-outlined"
        >
          {cancelIcon && getIcon(cancelIcon, 'btn-icon')}
          <span>{cancelLabel}</span>
        </button>
      )}
      <button
        data-testid="form-submit"
        type="button"
        onClick={onSubmitClick}
        className={PRIMARY_BUTTON_STYLE}
      >
        {submitIcon && getIcon(submitIcon, 'btn-icon')}
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
