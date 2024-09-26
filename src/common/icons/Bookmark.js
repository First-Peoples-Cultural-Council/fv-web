import React from 'react'
import PropTypes from 'prop-types'

function Bookmark({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={styling}
      viewBox="0 0 14 21"
    >
      <path d="M11.925 2.5v14.967L7.74 15.662l-.783-.338-.784.338-4.185 1.805V2.5h9.938zm0-2H1.989A2 2 0 000 2.5v18l6.957-3 6.956 3v-18a2 2 0 00-1.988-2z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Bookmark.propTypes = {
  styling: string,
}

export default Bookmark
