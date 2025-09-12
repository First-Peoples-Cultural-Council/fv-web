import React from 'react'
import PropTypes from 'prop-types'

function Fullscreen({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={styling}
    >
      <path d="M499.8 256h-30.5c-5.6 0-10.2 4.5-10.2 10.2v193H52.8V52.8h193c5.6 0 10.2-4.5 10.2-10.2V12.2C256 6.5 251.5 2 245.8 2H27.4C13.4 2 2 13.4 2 27.4v457.2c0 14 11.4 25.4 25.4 25.4h457.2c14 0 25.4-11.4 25.4-25.4V266.2c0-5.7-4.5-10.2-10.2-10.2z" />
      <path d="M484.6 2H367.8c-5.6 0-10.2 4.5-10.2 10.2v30.5c0 5.6 4.5 10.2 10.2 10.2h55.5L182.8 293.3c-4 4-4 10.4 0 14.4l21.5 21.5c4 4 10.4 4 14.4 0L459.2 88.7v55.5c0 5.6 4.5 10.2 10.2 10.2h30.5c5.6 0 10.2-4.5 10.2-10.2V27.4C510 13.4 498.6 2 484.6 2z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Fullscreen.propTypes = {
  styling: string,
  title: string,
}

export default Fullscreen
