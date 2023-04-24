import React from 'react'
import PropTypes from 'prop-types'

function Stop({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={styling}
    >
      <path d="M20.121 21.121H3.879c-.537-.021-.974-.349-1-1V3.879c.021-.539.349-.974 1-1h16.242l.078.003c.502.06.902.484.922.997v16.242c-.01.241-.034.28-.076.383-.15.362-.528.601-.924.617z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Stop.propTypes = {
  styling: string,
}

export default Stop
