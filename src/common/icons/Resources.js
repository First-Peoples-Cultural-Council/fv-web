import React from 'react'
import PropTypes from 'prop-types'
/**
 * @summary Resources
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function Resources({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      className={styling}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M74.305 25.35l8.676-5.009a1.645 1.645 0 012.246.603l7.551 13.08a1.647 1.647 0 01-.602 2.247l-8.332 4.81c-6.6 3.809-6.561 14.056.008 17.846l8.324 4.805a1.652 1.652 0 01.604 2.248l-7.553 13.08a1.65 1.65 0 01-2.246.601l-7.977-4.604c-3.186-1.842-6.857-1.8-10.006.11-.268.16-.531.314-.803.47-3.173 1.788-4.998 4.915-4.998 8.556v9.201c0 .904-.74 1.642-1.645 1.642H42.447a1.646 1.646 0 01-1.642-1.642v-9.201c0-3.639-1.828-6.765-4.999-8.556-.27-.15-.538-.31-.803-.47-3.15-1.912-6.819-1.952-10.009-.11l-7.976 4.604a1.647 1.647 0 01-2.246-.604l-7.55-13.078a1.643 1.643 0 01.604-2.245l8.325-4.808c6.591-3.806 6.617-14.026.008-17.843L7.826 36.27a1.646 1.646 0 01-.604-2.245l7.554-13.082a1.647 1.647 0 012.245-.603l8.677 5.01c6.578 3.799 15.107-1.118 15.107-8.721V6.609c0-.906.74-1.645 1.645-1.645h15.104c.905 0 1.645.738 1.645 1.645v10.02c-.002 7.603 8.53 12.518 15.106 8.721zm-24.304 8.52c-9.136 0-16.543 7.407-16.543 16.541s7.407 16.541 16.543 16.541c9.135 0 16.542-7.407 16.542-16.541 0-9.135-7.406-16.541-16.542-16.541z"
      />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Resources.propTypes = {
  styling: string,
}

export default Resources
