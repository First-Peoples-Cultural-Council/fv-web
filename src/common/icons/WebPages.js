import React from 'react'
import PropTypes from 'prop-types'

function WebPages({ styling }) {
  return (
    <svg
      className={styling}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 1200"
    >
      <title>WebPages</title>
      <g>
        <path d="M1133.2 231.21c-.703-31.641-20.273-59.297-49.688-70.664-9.375-3.633-19.453-4.805-29.414-4.805h-909.37c-42.539.117-77.578 33.398-78.047 76.29-.117 10.663 0 21.21 0 31.874v97.97h1066.483V231.213zm-900.12 37.734c-1.523 17.109-13.828 32.461-31.406 35.391-16.055 2.695-32.227-4.219-40.547-18.398-8.203-14.062-6.445-32.109 3.984-44.531 10.195-12.07 27.773-16.875 42.656-11.25 14.531 5.625 23.906 18.516 25.312 33.75.118.82.235 1.64.118 2.46 0 .938 0 1.759-.118 2.579zm116.6-.352c-1.523 17.11-13.828 32.461-31.406 35.391-16.055 2.696-32.227-4.218-40.547-18.398-8.203-14.062-6.445-32.109 3.984-44.53 10.195-12.07 27.773-16.876 42.656-11.25 14.531 5.624 23.906 18.515 25.312 33.75.118.82.235 1.64.118 2.46 0 .938 0 1.758-.118 2.578zm116.6.352c-1.523 17.109-13.828 32.461-31.406 35.391-16.055 2.695-32.227-4.219-40.547-18.398-8.203-14.062-6.445-32.109 3.984-44.531 10.195-12.07 27.773-16.875 42.656-11.25 14.531 5.625 23.906 18.516 25.312 33.75.118.82.235 1.64.118 2.46 0 .938 0 1.759-.118 2.579zM1133.2 957.77V408.98H66.8v552.3c0 3.281-.117 6.68.117 9.96 1.524 31.642 22.617 59.18 52.617 69.142 13.242 4.453 27.188 3.75 40.898 3.75h883.36c19.57 0 38.438-1.172 55.43-12.773 21.211-14.414 33.867-38.086 34.102-63.75-.117-3.164-.117-6.563-.117-9.844zM652.38 823.82H263.67c-13.125 0-22.852-10.781-23.438-23.438s11.133-23.438 23.438-23.438h388.71c13.125 0 22.852 10.781 23.438 23.438.586 12.656-11.133 23.438-23.438 23.438zm283.95-175.78h-1.172c-27.305.586-54.609 0-81.797 0h-589.69c-13.125 0-22.852-10.781-23.438-23.438s11.133-23.438 23.438-23.438h1.172c27.305-.586 54.609 0 81.797 0h589.69c13.125 0 22.852 10.781 23.438 23.438s-11.133 23.438-23.438 23.438z" />
      </g>
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
WebPages.propTypes = {
  styling: string,
}

export default WebPages
