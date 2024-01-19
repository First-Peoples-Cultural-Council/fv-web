import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'

function FieldButton({ label, onClickHandler }) {
  return (
    <button
      type="button"
      onClick={onClickHandler}
      className="bg-white border-2 border-primary text-primary hover:bg-gray-50 rounded-lg shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-light"
    >
      {getIcon('Add', 'fill-current -ml-1 mr-2 h-5 w-5')}
      <span>{label}</span>
    </button>
  )
}

// Proptypes
const { func, string } = PropTypes
FieldButton.propTypes = {
  label: string,
  onClickHandler: func,
}

export default FieldButton
