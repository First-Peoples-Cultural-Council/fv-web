import React from 'react'
import PropTypes from 'prop-types'

function Star({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 1200"
      className={styling}
    >
      <path d="M931.5 739.88a43.504 43.504 0 00-10.5 34.125l31.125 262.5a77.993 77.993 0 01-32.25 72.75 79.116 79.116 0 01-45 14.25 75.02 75.02 0 01-34.125-8.25l-221.62-109.5a45.38 45.38 0 00-37.5 0l-222.38 111a76.913 76.913 0 01-40.398 8 76.882 76.882 0 01-38.727-14 78.004 78.004 0 01-26.102-31.953 78.03 78.03 0 01-6.149-40.797L279 775.505a43.504 43.504 0 00-10.5-34.125L94.88 544.5a77.993 77.993 0 01-15.816-76.352 77.998 77.998 0 0158.191-51.898l244.88-49.5a42.75 42.75 0 0030.375-22.125l119.25-228a77.981 77.981 0 0141.383-36.574 77.986 77.986 0 0155.234 0 77.983 77.983 0 0141.383 36.574l117.75 228a42.76 42.76 0 0029.625 22.125l244.5 49.5a77.977 77.977 0 0145.527 27.926 77.997 77.997 0 01-2.777 100.324z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Star.propTypes = {
  styling: string,
}

export default Star