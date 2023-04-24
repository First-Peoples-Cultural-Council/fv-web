import React from 'react'
import PropTypes from 'prop-types'
/**
 * @summary Jigsaw
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function Jigsaw({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      className={styling}
    >
      <title>Jigsaw</title>
      <path d="M22.358 17.968a2.605 2.605 0 001.701 1.882c.884.292 1.754.11 2.401-.357.226-.163.54.012.54.29v5.318a1.9 1.9 0 01-1.9 1.9h-5.594c-.28 0-.45-.315-.287-.543.308-.43.491-.958.491-1.527a2.634 2.634 0 00-3.34-2.537 2.602 2.602 0 00-1.813 1.748 2.626 2.626 0 00.378 2.316c.164.227-.008.543-.288.543H9.6a1.9 1.9 0 01-1.9-1.9v-6.13a2.632 2.632 0 01-2.82.917 2.588 2.588 0 01-1.776-1.78c-.492-1.771.824-3.387 2.516-3.387.85 0 1.6.4 2.08 1.02v-6.13c0-1.05.851-1.9 1.9-1.9h6.14c-.8-.62-1.24-1.7-.9-2.86.24-.86.96-1.55 1.83-1.77 1.76-.43 3.31.89 3.31 2.55 0 .85-.4 1.6-1.02 2.08h6.14c1.05 0 1.9.85 1.9 1.9v5.32c0 .28-.315.45-.542.286a2.63 2.63 0 00-1.538-.496 2.641 2.641 0 00-2.562 3.247z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Jigsaw.propTypes = {
  styling: string,
}

export default Jigsaw
