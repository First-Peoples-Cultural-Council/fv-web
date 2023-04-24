import React from 'react'
import PropTypes from 'prop-types'

function Lines({ styling }) {
  return (
    <svg
      className={styling}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M96.801 60.414h-93.6a3.2 3.2 0 100 6.4h93.6a3.2 3.2 0 000-6.4zm-17.019 9.157H20.219a2.553 2.553 0 100 5.106h59.563a2.553 2.553 0 100-5.106zm17.019-44.248h-93.6V50.85h93.6V25.323zm-6.254 19.275H9.453V31.577h81.094v13.021z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Lines.propTypes = {
  styling: string,
}

export default Lines
