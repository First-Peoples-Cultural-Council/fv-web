import React from 'react'
import PropTypes from 'prop-types'

function Create({ styling }) {
  return (
    <svg
      className={styling}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1200 1200"
    >
      <path d="M600 30C285.6 30 30 285.6 30 600s255.6 570 570 570 570-255.6 570-570S914.4 30 600 30zm249.6 633.6h-186v186c0 34.801-28.801 63.602-63.602 63.602-18 0-33.602-7.2-44.398-18-12-12-18-27.602-18-44.398v-187.2H350.4c-18 0-33.602-7.2-44.398-18-12-12-18-27.602-18-44.398 0-34.801 28.801-63.602 63.602-63.602h186v-187.2c0-34.801 28.801-63.602 63.602-63.602s63.602 28.801 63.602 63.602v186h186c34.801 0 63.602 28.801 63.602 63.602-2.406 34.801-30.008 63.602-64.805 63.602z" />
    </svg>
  )
}
// PROPTYPES
const { string } = PropTypes
Create.propTypes = {
  styling: string,
}

export default Create
