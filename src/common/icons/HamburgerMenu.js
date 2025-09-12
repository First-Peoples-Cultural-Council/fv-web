import React from 'react'
import PropTypes from 'prop-types'

function HamburgerMenu({ styling }) {
  return (
    <svg
      className={styling}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
HamburgerMenu.propTypes = {
  styling: string,
}

export default HamburgerMenu
