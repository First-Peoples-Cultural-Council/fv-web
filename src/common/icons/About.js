import React from 'react'
import PropTypes from 'prop-types'

function About({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={styling}
    >
      <circle
        cx={50.00006}
        cy={27.55846}
        r={19.96977}
        transform="rotate(-67.5 50 27.558)"
      />
      <path d="M5.009 88.757a3.387 3.387 0 003.36 3.654H91.63a3.388 3.388 0 003.361-3.654c-1.36-19.25-13.848-34.307-44.99-34.307S6.37 69.506 5.008 88.757z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
About.propTypes = {
  styling: string,
}

export default About
