import React from 'react'
import PropTypes from 'prop-types'

// FPCC

function DashboardLocatorPresentation({ site, logout }) {
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
          <div>
            <img
              className="flex max-w-xs bg-gray-300 rounded-full h-20 w-20 object-cover object-center"
              src={site?.logoPathSmall}
              alt={`${site?.title} Logo`}
            />
            <button
              type="button"
              onClick={logout}
              className="mt-5 bg-secondary border border-transparent rounded-lg shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-secondary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-light"
            >
              LOGOUT
            </button>
          </div>
        ) : (
          <div>
            <div className="flex max-w-xs p-3 bg-secondary hover:bg-secondary-dark text-white text-3xl rounded-full h-20 w-20 items-center justify-center">
              <span className="text-center">{site?.title?.charAt(0)}</span>
            </div>
            <button
              type="button"
              onClick={logout}
              className="mt-5 bg-secondary border border-transparent rounded-lg shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-secondary-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-light"
            >
              LOGOUT
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
// PROPTYPES
const { object, func } = PropTypes
DashboardLocatorPresentation.propTypes = {
  site: object,
  logout: func,
}

export default DashboardLocatorPresentation
