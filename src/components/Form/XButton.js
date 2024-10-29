import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'

function XButton({ onClickHandler, label = 'Remove' }) {
  return (
    <div id="XButton">
      <button
        data-testid={`${label}-btn`}
        type="button"
        aria-label={label}
        className="has-tooltip border p-1 border-transparent inline-flex items-center rounded-lg text-sm"
        onClick={onClickHandler}
      >
        <span className="tooltip rounded shadow-lg p-1 bg-charcoal-50 text-charcoal-900 -mt-14">
          {label}
        </span>
        {getIcon('Close', 'fill-current h-5 w-5')}
      </button>
    </div>
  )
}

// Proptypes
const { func, string } = PropTypes
XButton.propTypes = {
  label: string,
  onClickHandler: func,
}

export default XButton
