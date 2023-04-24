import React from 'react'
import PropTypes from 'prop-types'

/**
 * @summary Lock
 * @component
 *
 * @param {object} props
 *
 * @returns {node} jsx markup
 */
function Lock({ styling }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1200pt"
      width="1200pt"
      viewBox="0 0 1200 1200"
      className={styling}
    >
      <path d="M1038 442.8H886.8V306c0-157.2-127.2-284.4-284.4-284.4S318 148.8 318 306v136.8H166.8c-44.398 0-80.398 31.199-80.398 70.801l4.8 591.6c0 44.398 31.2 80.398 70.802 80.398h879.6c39.602 0 70.8-36 70.8-80.398l4.802-591.6c1.191-39.602-34.81-70.801-79.207-70.801zm-435.6 588c-52.801 0-94.801-42-94.801-94.801s42-94.801 94.801-94.801 94.801 42 94.801 94.801-42 94.801-94.801 94.801zm127.2-588H475.2V306c0-69.602 57.602-127.2 127.2-127.2 69.602 0 127.2 57.602 127.2 127.2z" />
    </svg>
  )
}
const { string } = PropTypes
Lock.propTypes = {
  styling: string,
}

export default Lock
