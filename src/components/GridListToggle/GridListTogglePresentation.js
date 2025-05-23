import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'

function GridListTogglePresentation({
  accentColor = 'blumine-800',
  isGridView,
  setIsGridView,
}) {
  return (
    <div className="ml-6 bg-charcoal-50 p-0.5 rounded-lg flex items-center">
      <button
        data-testid="grid-off-btn"
        type="button"
        onClick={() => setIsGridView(false)}
        className={`${
          !isGridView
            ? `bg-white shadow-sm text-${accentColor}`
            : 'hover:bg-white hover:shadow-sm text-charcoal-500'
        } p-1.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-${accentColor}`}
      >
        {getIcon('HamburgerMenu', 'fill-current h-5 w-5')}
        <span className="sr-only">Use list view</span>
      </button>
      <button
        data-testid="grid-on-btn"
        type="button"
        onClick={() => setIsGridView(true)}
        className={`${
          isGridView
            ? `bg-white shadow-sm text-${accentColor}`
            : 'hover:bg-white hover:shadow-sm text-charcoal-500'
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
