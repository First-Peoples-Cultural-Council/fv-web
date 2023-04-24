import React from 'react'
import PropTypes from 'prop-types'
/**
 * @summary Question
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function Question({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className={styling}
    >
      <path d="M32.001 2C-7.997 2.701-8.003 61.293 32 62c39.997-.701 40.003-59.293.001-60zM32 57c-33.336-.59-33.33-49.416.001-50 33.335.589 33.33 49.416-.001 50zm11.766-33.209c-.19 4.876-2.855 6.232-6.512 9.704a5.46 5.46 0 00-2.211 3.887 3.36 3.36 0 01-3.538 3.02 3.585 3.585 0 01-3.649-3.906 8.648 8.648 0 012.312-6.137c.895-1.04 3.539-3.255 4.517-4.227 3.684-3.743-2.13-7.12-5.184-4.509a8.62 8.62 0 00-1.676 3.152c-.774 2.572-2.454 3.118-3.726 3.118-4.51-.155-4.608-5.349-2.399-8.367a11.14 11.14 0 014.2-3.824 13.096 13.096 0 016.359-1.5 13.6 13.6 0 015.946 1.25 9.968 9.968 0 014.094 3.484 8.701 8.701 0 011.467 4.855zM31.743 49.83c-5.717-.013-5.707-8.425 0-8.5 5.63.083 5.612 8.46 0 8.5z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Question.propTypes = {
  styling: string,
}

export default Question
