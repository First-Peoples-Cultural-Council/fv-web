import React from 'react'
import PropTypes from 'prop-types'
/**
 * @summary Login
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function Login({ styling }) {
  return (
    <svg
      viewBox="0 0 1200 1200"
      xmlns="http://www.w3.org/2000/svg"
      className={styling}
    >
      <path d="M1140 0H600c-36 0-60 24-60 60s24 60 60 60h480v960H600c-36 0-60 24-60 60s24 60 60 60h540c36 0 60-24 60-60V60c0-36-24-60-60-60z" />
      <path d="M714 582L522 366c-18-12-42-6-42 18v96H24c-12 0-24 12-24 24v192c0 12 12 24 24 24h456v96c0 24 24 36 42 18l192-216c6-12 6-24 0-36z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Login.propTypes = {
  styling: string,
}

export default Login
