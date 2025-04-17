import React from 'react'
import PropTypes from 'prop-types'

function DownloadRed({ styling }) {
  return (
    <svg
      viewBox="0 0 24 26"
      xmlns="http://www.w3.org/2000/svg"
      className={styling}
    >
      <g clipPath="url(#clip0_1420_108)" fill="#9D2E24">
        <path d="M23.296 19.619a.694.694 0 00-.703.684v3.644a.695.695 0 01-.704.684H2.112a.695.695 0 01-.704-.684v-3.644a.694.694 0 00-.704-.684.694.694 0 00-.704.684v3.644C0 25.079.947 26 2.111 26H21.89C23.053 26 24 25.08 24 23.947v-3.644a.694.694 0 00-.704-.684z" />
        <path d="M11.503 19.675c.138.134.318.2.498.2s.36-.066.498-.2l7.127-6.931a.67.67 0 000-.968.718.718 0 00-.995 0l-5.935 5.771V.677A.686.686 0 0012.001 0a.686.686 0 00-.695.676v16.871l-5.935-5.77a.718.718 0 00-.995 0 .67.67 0 000 .967l7.127 6.931z" />
      </g>
      <defs>
        <clipPath id="clip0_1420_108">
          <path fill="#fff" d="M0 0H24V26H0z" />
        </clipPath>
      </defs>
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
DownloadRed.propTypes = {
  styling: string,
}

export default DownloadRed
