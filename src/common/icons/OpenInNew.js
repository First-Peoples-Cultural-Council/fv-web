import React from 'react'
import PropTypes from 'prop-types'

function OpenInNew({ styling }) {
  return (
    <svg
      viewBox="0 0 1200 1200"
      xmlns="http://www.w3.org/2000/svg"
      className={styling}
    >
      <path
        d="M584.05 90v78.117H253.39c-56.848.047-85.27 28.688-85.27 85.922v692.58c0 56.836 28.422 85.266 85.27 85.266h692.58c57.211 0 85.859-28.43 85.922-85.266v-356.06h78.117v356.06c.059 108.91-54.613 163.38-164.04 163.38h-692.58c-108.93 0-163.38-54.469-163.38-163.38v-692.58c0-109.43 54.457-164.11 163.38-164.04zm126.28 78.117V90H1110v387.94h-78.117V230.93l-638.23 601.12-53.703-56.953 645.07-606.98z"
        fillRule="evenodd"
      />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
OpenInNew.propTypes = {
  styling: string,
}

export default OpenInNew
