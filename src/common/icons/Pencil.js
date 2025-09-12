import React from 'react'
import PropTypes from 'prop-types'

function Pencil({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 1200"
      className={styling}
    >
      <path
        d="M1008.4 191.55C930.521 113.597 872 125.273 872 125.273l-692.86 692.82-54.551 257.24 257.28-54.562 692.88-692.72c-.07 0 11.676-58.488-66.348-136.5zM366.58 989.86l-87.73 18.898c-8.438-15.816-18.637-31.645-37.285-50.34-18.637-18.707-34.523-28.789-50.34-37.32l18.898-87.672 25.402-25.344s47.699.984 101.62 54.875c53.855 53.809 54.875 101.63 54.875 101.63l-25.441 25.273z"
        fillRule="evenodd"
      />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Pencil.propTypes = {
  styling: string,
}

export default Pencil
