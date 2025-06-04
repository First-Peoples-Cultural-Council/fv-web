import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'

function FieldButton({ label, onClickHandler, iconId = 'Add' }) {
  return (
    <button
      data-testid={`${label}-btn`}
      type="button"
      onClick={onClickHandler}
      className="btn-secondary btn-md"
    >
      {getIcon(iconId, 'btn-icon')}
      <span>{label}</span>
    </button>
  )
}

// Proptypes
const { func, string } = PropTypes
FieldButton.propTypes = {
  label: string,
  onClickHandler: func,
  iconId: string,
}

export default FieldButton
