import React from 'react'
import PropTypes from 'prop-types'

function Spreadsheet({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 1200"
      className={styling}
    >
      <path d="M384 576H60V420h324zm48 204h336V624H432zm0 204h336V828H432zm0-408h336V420H432zm-48 48H60v156h324zm672-408H144c-46.406 0-84 37.594-84 84v72h1080v-72c0-46.406-37.594-84-84-84zM384 828H60v72c0 46.406 37.594 84 84 84h240zm432-252h324V420H816zm0 408h240c46.406 0 84-37.594 84-84v-72H816zm0-204h324V624H816z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Spreadsheet.propTypes = {
  styling: string,
}

export default Spreadsheet
