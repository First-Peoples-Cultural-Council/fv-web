import React from 'react'
import PropTypes from 'prop-types'

function Key({ children, status, value, onClick, width = 40 }) {
  const classes = `flex items-center justify-center rounded mx-0.5 text-base cursor-pointer select-none 
  ${
    !status
      ? 'bg-charcoal-100 hover:bg-charcoal-200 active:bg-charcoal-300'
      : ''
  }
  ${status === 'absent' ? 'bg-charcoal-300 text-white' : ''}
  ${
    status === 'correct'
      ? 'bg-wordsy-correct hover:opacity-80 active:opacity-100 text-white'
      : ''
  }
  ${
    status === 'present'
      ? 'bg-wordsy-present hover:opacity-80 active:opacity-100 text-white'
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
