import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'

function GridListTogglePresentation({
  accentColor = 'primary',
  isGridView,
  setIsGridView,
}) {
  return (
    <div className="ml-6 bg-gray-100 p-0.5 rounded-lg flex items-center">
      <button
        type="button"
        onClick={() => setIsGridView(false)}
        className={`${
          !isGridView
            ? `bg-white shadow-sm text-${accentColor}`
            : 'hover:bg-white hover:shadow-sm text-gray-400'
        } p-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-${accentColor}`}
      >
        {getIcon('HamburgerMenu', 'fill-current h-5 w-5')}
        <span className="sr-only">Use list view</span>
      </button>
      <button
        type="button"
        onClick={() => setIsGridView(true)}
        className={`${
          isGridView
            ? `bg-white shadow-sm text-${accentColor}`
            : 'hover:bg-white hover:shadow-sm text-gray-400'
        } ml-0.5 p-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-${accentColor}`}
      >
        {getIcon('Grid', 'fill-current h-5 w-5')}
        <span className="sr-only">Use grid view</span>
      </button>
    </div>
  )
}
// PROPTYPES
const { bool, func, string } = PropTypes
GridListTogglePresentation.propTypes = {
  isGridView: bool,
  setIsGridView: func,
  accentColor: string,
}

export default GridListTogglePresentation
