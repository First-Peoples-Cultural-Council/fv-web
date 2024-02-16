import React from 'react'
import PropTypes from 'prop-types'
/**
 * @summary Canoe
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function Canoe({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 1200"
      className={styling}
    >
      <title>Canoe</title>
      <g fill="#fff">
        <path d="m648.25 439.25-233.12 233h-218.5c-49.684-1.2344-97.062-21.223-132.61-55.953-35.547-34.734-56.637-81.633-59.027-131.27-2.3906-49.641 14.094-98.352 46.145-136.34 32.047-37.988 77.285-62.438 126.62-68.438 3.9688-0.40234 7.8906 1.1094 10.559 4.0742 2.668 2.9648 3.7578 7.0234 2.9414 10.926-1.7148 7.9258-2.5547 16.016-2.5 24.125 0.03125 31.914 12.727 62.516 35.293 85.082 22.566 22.566 53.168 35.262 85.082 35.293z" />
        <path d="m1200 475.62c-0.066406 52.148-20.82 102.14-57.707 139.01-36.887 36.863-86.895 57.586-139.04 57.617h-482l232.88-233h136.75c31.914-0.03125 62.516-12.727 85.082-35.293 22.566-22.566 35.262-53.168 35.293-85.082 0-8.1055-0.83984-16.191-2.5-24.125-0.62891-3.8047 0.53125-7.6836 3.1445-10.52 2.6133-2.832 6.3867-4.3008 10.23-3.9805 48.684 4.4922 93.926 27.027 126.84 63.18 32.914 36.152 51.117 83.305 51.035 132.2z" />
        <path d="m919 239.12-524 524-12.5 77.25c-2.2109 15.277-9.2109 29.457-20 40.5l-80 80c-18.598 17.359-44.898 23.766-69.395 16.902-24.5-6.8672-43.641-26.008-50.508-50.508-6.8633-24.496-0.45703-50.797 16.902-69.395l80-80.125c10.988-10.949 25.168-18.129 40.5-20.5l77.125-11.75 524.25-524c4.875-4.8477 12.75-4.8477 17.625 0 4.8477 4.875 4.8477 12.75 0 17.625z" />
      </g>
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Canoe.propTypes = {
  styling: string,
}

export default Canoe
