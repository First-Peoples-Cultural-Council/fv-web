import React from 'react'
import PropTypes from 'prop-types'

function Cell({ status, value }) {
  function getStatusStyling(status, value) {
    switch (status) {
      case 'absent':
        return 'bg-charcoal-300 border-charcoal-300 text-white'
      case 'correct':
        return 'bg-wordsy-correct border-wordsy-correct text-white'
      case 'present':
        return 'bg-wordsy-present border-wordsy-present text-white '
      default:
        return `bg-white ${value ? 'border-black' : 'border-charcoal-100'}`
    }
  }

  return (
    <div
      className={`w-10 h-10 border-solid border-2 flex items-center justify-center mx-0.5 text-lg font-bold rounded-sm ${getStatusStyling(status, value)}`}
    >
      {value}
    </div>
  )
}

const { string } = PropTypes

Cell.propTypes = {
  value: string,
  status: string,
}

export default Cell
