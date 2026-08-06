import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { CHAR_ABSENT, CHAR_CORRECT, CHAR_PRESENT } from 'common/constants'

function Key({ status, value, onClick }) {
  const statusStyling = getStatusStyling(status)

  const handleClick = (event) => {
    onClick(value)
    event.currentTarget.blur()
  }

  return (
    <button
      data-testid={`${value}-char-btn`}
      type="button"
      className={`flex shrink-0 h-12 w-8 text-base items-center justify-center rounded-sm cursor-pointer select-none ${statusStyling}`}
      onClick={handleClick}
    >
      {value}
    </button>
  )
}

function getStatusStyling(status) {
  switch (status) {
    case CHAR_ABSENT:
      return 'bg-charcoal-300 text-white'
    case CHAR_CORRECT:
      return 'bg-wordsy-correct hover:opacity-80 active:opacity-100 text-white'
    case CHAR_PRESENT:
      return 'bg-wordsy-present hover:opacity-80 active:opacity-100 text-white'
    default:
      return 'bg-charcoal-100 hover:bg-charcoal-200 active:bg-charcoal-300'
  }
}

const { func, string } = PropTypes

Key.propTypes = {
  status: string,
  value: string,
  onClick: func,
}

export default Key
