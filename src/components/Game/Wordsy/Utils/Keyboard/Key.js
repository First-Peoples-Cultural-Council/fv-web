import React from 'react'
import PropTypes from 'prop-types'

function Key({ children, status, value, onClick, width = 40 }) {
  const classes = `flex items-center justify-center rounded mx-0.5 text-xs font-bold cursor-pointer select-none 
  ${!status ? 'bg-slate-200 hover:bg-slate-300 active:bg-slate-400' : ''}
  ${status === 'absent' ? 'bg-slate-400 text-white' : ''}
  ${
    status === 'correct'
      ? 'bg-green-500 hover:bg-green-600 active:bg-green-700 text-white'
      : ''
  }
  ${
    status === 'present'
      ? 'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-white'
      : ''
  }`

  const handleClick = (event) => {
    onClick(value)
    event.currentTarget.blur()
  }

  return (
    <button
      type="button"
      style={{ width: `${width}px`, height: '58px' }}
      className={classes}
      onClick={handleClick}
    >
      {children || value}
    </button>
  )
}

const { any } = PropTypes

Key.propTypes = {
  children: any,
  status: any,
  value: any,
  onClick: any,
  width: any,
}

export default Key
