import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'

function FieldButton({ label, onClickHandler }) {
  return (
    <button
      data-testid={`${label}-btn`}
      type="button"
      onClick={onClickHandler}
      className="btn-outlined"
    >
      {getIcon('Add', 'btn-icon')}
      <span>{label}</span>
    </button>
  )
}

// Proptypes
const { func, string } = PropTypes
FieldButton.propTypes = {
  label: string,
  onClickHandler: func,
}

export default FieldButton
