import React from 'react'
import PropTypes from 'prop-types'

function StopCircle({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 96 96"
      className={styling}
    >
      <path d="M48 9.497c-20.704.356-38.866 17.244-38.5 38.5.355 20.703 17.244 38.865 38.5 38.5 20.704-.357 38.868-17.244 38.5-38.5-.366-21.254-17.245-38.134-38.5-38.5zm13.24 50.24c0 .816-.683 1.5-1.5 1.5H36.261c-.818 0-1.5-.684-1.5-1.5V36.258c0-.441.161-.777.402-1.017.012-.015.026-.028.039-.042.014-.014.027-.028.042-.04.24-.241.576-.402 1.017-.402H59.74c.817 0 1.5.682 1.5 1.501v23.479z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
StopCircle.propTypes = {
  styling: string,
}

export default StopCircle
