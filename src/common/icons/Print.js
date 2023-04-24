import React from 'react'
import PropTypes from 'prop-types'
/**
 * @summary Print
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function Print({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={styling}
    >
      <title>Print</title>
      <path d="M35.203 67.521h29.594a1.5 1.5 0 100-3H35.203a1.5 1.5 0 100 3zM34.21 76.359h31.58a1.5 1.5 0 100-3H34.21a1.5 1.5 0 100 3zM66.783 82.197H33.217a1.5 1.5 0 100 3h33.566a1.5 1.5 0 000-3z" />
      <path d="M85.484 23.86H77V7a2 2 0 00-2-2H25a2 2 0 00-2 2v16.86h-8.484A9.516 9.516 0 005 33.374v27.968a9.516 9.516 0 009.516 9.516h7.257l-3.81 21.797A2 2 0 0019.933 95h60.134a2 2 0 001.97-2.344l-3.81-21.797h7.257A9.516 9.516 0 0095 61.343V33.375a9.516 9.516 0 00-9.516-9.516zM27 9h46v14.86H27zm-4.688 82l6.026-34.47h43.323L77.687 91zm62.153-53.07A3.535 3.535 0 1188 34.395a3.535 3.535 0 01-3.535 3.535z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Print.propTypes = {
  styling: string,
}

export default Print
