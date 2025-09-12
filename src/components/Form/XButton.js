import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import Tooltip from 'components/Tooltip'

function XButton({ onClickHandler, label = 'Remove' }) {
  return (
    <div id="XButton">
      <Tooltip message={label}>
        <button
          data-testid={`${label}-btn`}
          type="button"
          aria-label={label}
          className="btn-md-icon"
          onClick={onClickHandler}
        >
          {getIcon('Close')}
        </button>
      </Tooltip>
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
