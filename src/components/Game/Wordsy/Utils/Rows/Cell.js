import React from 'react'
import PropTypes from 'prop-types'

function getClassList(status, value) {
  let baseClasses =
    'w-14 h-14 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded'
  if (!status) {
    baseClasses += ' bg-white border-slate-200'
  }
  if (value && !status) {
    baseClasses += ' border-black'
  }
  if (status === 'absent') {
    baseClasses += ' bg-slate-400 text-white border-slate-400'
  }
  if (status === 'correct') {
    baseClasses += ' bg-green-500 text-white border-green-500'
  }
  if (status === 'present') {
    baseClasses += ' bg-yellow-500 text-white border-yellow-500'
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
