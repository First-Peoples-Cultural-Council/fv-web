import React from 'react'
import PropTypes from 'prop-types'
/**
 * @summary Family
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function Family({ styling }) {
  return (
    <svg
      className={styling}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 100 100"
      stroke="currentColor"
    >
      <title>Family</title>
      <path d="M19.19 11.155C19.19 4.994 24.185 0 30.345 0S41.5 4.994 41.5 11.155 36.505 22.31 30.345 22.31 19.19 17.316 19.19 11.155zm59.365 33.96a7.88 7.88 0 10-7.88-7.88 7.88 7.88 0 007.88 7.88zm-25.119 8.629a4.448 4.448 0 016.058-1.172l-6.802-14.017C48.584 30.06 45.816 24.23 37.634 24.23H23.063c-8.181 0-10.95 5.83-15.058 14.325L.468 54.089A4.608 4.608 0 002.6 60.253a4.632 4.632 0 006.189-2.125l10.423-20.133v56.952a5.014 5.014 0 1010.028 0V65.754h2.245v29.231a5.014 5.014 0 1010.029 0v-56.99l10.394 20.133a4.621 4.621 0 003.672 2.566l-1.066-.751a4.448 4.448 0 01-1.078-6.199zm46.23 13.821l-5.324-10.973c-2.902-6.002-4.858-10.12-10.638-10.12H73.41c-5.689 0-7.674 3.993-10.503 9.843l-3.919-2.758a3.385 3.385 0 00-3.896 5.536l7.239 5.094a3.383 3.383 0 004.715-.82c.597-.844 3.643-7.171 3.643-7.171V96.43a3.543 3.543 0 007.086 0V75.807h1.585v20.651a3.542 3.542 0 007.085 0V56.196l7.343 14.224c.565 1.158 2.234 2.483 4.372 1.501 1.637-.753 2.297-2.735 1.506-4.356z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Family.propTypes = {
  styling: string,
}

export default Family
