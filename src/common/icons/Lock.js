import React from 'react'
import PropTypes from 'prop-types'

function Lock({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1200pt"
      width="1200pt"
      viewBox="0 0 1200 1200"
      className={styling}
    >
      <path d="M937.46 552h-13.465V338.37c-12-309.57-305.48-322.57-308.44-322.66l-.742-.023c-91.5 0-164.44 28.465-220.09 84.602-96.621 97.488-94.727 242.76-94.727 248.42v203.29h-26.062c-32.871 0-57.938 25.129-57.938 58.008v508.12c0 32.867 25.066 57.875 57.938 57.875h663.53c32.879 0 58.535-25.008 58.535-57.875v-508.12c0-32.88-25.656-58.008-58.535-58.008zM396 348.23c0-1.055 5.207-107.5 69.719-172.59 35.113-35.426 82.164-52.738 144.46-52.922 15.18.676 205.82 13.145 205.82 219.29v209.99h-420z" />
    </svg>
  )
}
const { string } = PropTypes
Lock.propTypes = {
  styling: string,
}

export default Lock
