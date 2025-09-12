import React from 'react'
import PropTypes from 'prop-types'

function Tooltip({ hide, message, children }) {
  return (
    <div className="inline-flex items-center justify-center">
      <div className="group relative flex max-w-max flex-col items-center justify-center">
        <div className="absolute z-40 left-1/2 bottom-9 ml-auto mr-auto min-w-max -translate-x-1/2 scale-0 transform rounded-lg px-3 py-2 text-xs font-medium transition-all duration-300 group-hover:scale-100">
          {!hide && (
            <div className="flex max-w-32 flex-col items-center">
              <div className="max-w-32 text-wrap rounded bg-blumine-800 p-2 text-center text-xs text-white">
                {message}
              </div>
              <div className="point-down h-2 w-4 bg-blumine-800"></div>
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  )
}
// PROPTYPES
const { bool, node, string } = PropTypes
Tooltip.propTypes = {
  hide: bool,
  message: string,
  children: node,
}

export default Tooltip
