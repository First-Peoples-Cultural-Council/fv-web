import React from 'react'
import PropTypes from 'prop-types'

// FPCC

function DashboardLocatorPresentation({ site }) {
  return (
    <div id="DashboardLocator" className="flex items-center space-x-5">
      <div className="pt-1 text-right">
        <p className="text-xl font-bold text-fv-charcoal">You are on:</p>
        <p className="text-xl font-medium text-fv-charcoal-light">
          {site?.title}
        </p>
      </div>
      <div className="flex-shrink-0">
        {site?.logoPathSmall ? (
          <img
            className="flex max-w-xs bg-gray-300 rounded-full h-20 w-20 items-center justify-center"
            src={site?.logoPathSmall}
            alt={`${site?.title} Logo`}
          />
        ) : (
          <div className="flex max-w-xs p-3 bg-secondary hover:bg-secondary-dark text-white text-3xl rounded-full h-20 w-20 items-center justify-center">
            <span className="text-center">{site?.title?.charAt(0)}</span>
          </div>
        )}
      </div>
    </div>
  )
}
// PROPTYPES
const { object } = PropTypes
DashboardLocatorPresentation.propTypes = {
  site: object,
}

export default DashboardLocatorPresentation
