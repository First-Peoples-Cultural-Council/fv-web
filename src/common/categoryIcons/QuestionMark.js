import React from 'react'
import PropTypes from 'prop-types'
/**
 * @summary QuestionMark
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function QuestionMark({ styling }) {
  return (
    <svg
      className={styling}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 100 100"
      stroke="currentColor"
    >
      <title>QuestionMark</title>
      <path d="M76.7 24.8c-1.9-11-10.9-20-21.9-21.9-8.1-1.5-16.2.7-22.3 5.9-6.2 5.2-9.7 12.8-9.7 20.8 0 3.8 3.1 6.8 6.8 6.8 3.8 0 6.8-3 6.8-6.8 0-4 1.8-7.8 4.8-10.4 3.1-2.6 7.1-3.6 11.2-2.9 5.3.9 9.9 5.5 10.8 10.8 1.4 7.7-3.6 13.6-9.1 15.4-6.6 2.1-11 8.3-11 15.5v8.7c0 3.8 3.1 6.8 6.8 6.8 3.8 0 6.8-3 6.8-6.8V58c0-1.2.7-2.2 1.6-2.5 13.1-4.2 20.8-17.1 18.4-30.7zM50 80.2c-4.8 0-8.6 3.9-8.6 8.6 0 4.8 3.9 8.6 8.6 8.6 4.8 0 8.6-3.9 8.6-8.6.1-4.7-3.8-8.6-8.6-8.6z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
QuestionMark.propTypes = {
  styling: string,
}

export default QuestionMark
