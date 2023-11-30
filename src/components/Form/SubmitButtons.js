import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import {
  PRIMARY_BUTTON_STYLE,
  SECONDARY_BUTTON_STYLE,
} from 'common/constants/styles'

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
          className={SECONDARY_BUTTON_STYLE}
        >
          {cancelIcon && getIcon(cancelIcon, 'fill-current -ml-1 mr-2 h-5 w-5')}
          <span>{cancelLabel}</span>
        </button>
      )}
      <button
        type="button"
        onClick={onSubmitClick}
        className={PRIMARY_BUTTON_STYLE}
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
