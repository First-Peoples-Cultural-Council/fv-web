import React from 'react'
import PropTypes from 'prop-types'
/**
 * @summary Berries
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function Berries({ styling }) {
  return (
    <svg
      className={styling}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 48 48"
      stroke="currentColor"
    >
      <title>Berries</title>
      <path d="M36.031 29.087c-.477-3.876-3.278-6.722-6.255-6.355-.081.01-.158.031-.239.045-1.168-3.186-3.844-5.296-5.48-5.99.281-5.763-1.637-9.711-1.058-11.787h-1.177c-.109 0-.124.747-.083 1.31-2.108 1.598-3.672 4.135-4.381 6.918-2.729-.117-5.136 2.235-5.43 5.443-.301 3.292 1.737 6.14 4.553 6.397 2.813.258 5.34-2.217 5.64-5.509.298-3.239-1.672-6.076-4.416-6.413.576-1.928 1.893-4.646 4.12-6.292.378 2.602 1.579 6.157 1.065 11.038-.449 4.276-.976 6.671-1.875 9.175-3.384-.53-6.733 2.564-7.51 6.97-.783 4.446 1.349 8.54 4.764 9.142 3.414.602 6.818-2.514 7.602-6.961.079-.448.121-.892.143-1.329-.838-1.2-1.426-2.697-1.633-4.364a10.266 10.266 0 01-.072-1.48c-.666-.826-1.506-1.433-2.465-1.762 1.042-2.583 1.649-4.993 2.11-9.391.011-.085.017-.169.024-.254 1.161.203 3.533 1.562 4.989 5.287-2.523.833-4.151 3.98-3.719 7.493.479 3.877 3.278 6.723 6.256 6.355s5.004-3.809 4.527-7.686z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Berries.propTypes = {
  styling: string,
}

export default Berries
