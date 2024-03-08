import React from 'react'
import PropTypes from 'prop-types'

function getClassList(status, value) {
  let baseClasses =
    'w-10 h-10 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded'
  if (!status) {
    baseClasses += ' bg-white border-gray-200'
  }
  if (value && !status) {
    baseClasses += ' border-black'
  }
  if (status === 'absent') {
    baseClasses += ' bg-gray-400 text-white border-gray-400'
  }
  if (status === 'correct') {
    baseClasses += ' bg-wordsy-correct text-white border-wordsy-correct'
  }
  if (status === 'present') {
    baseClasses += ' bg-wordsy-present text-white border-wordsy-present'
  }
  if (value) {
    baseClasses += ' cell-animation'
  }
  return baseClasses
}

function Cell({ status, value }) {
  return <div className={getClassList(status, value)}>{value}</div>
}

const { string } = PropTypes

Cell.propTypes = {
  value: string,
  status: string,
}

export default Cell
