import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import SiteLogo from 'components/SiteLogo'

function DashboardLocatorPresentation({ site }) {
  return (
    <div id="DashboardLocator" className="flex items-center space-x-5">
      <div className="pt-1 text-right">
        <p className="text-xl font-bold text-charcoal-900">You are on:</p>
        <p className="text-xl font-medium text-charcoal-500">{site?.title}</p>
      </div>
      <div className="flex-shrink-0">
        {site?.logo?.id ? (
          <div className="h-20 w-20">
            <SiteLogo.Presentation />
          </div>
        ) : (
          <div>
            <div className="flex max-w-xs p-3 bg-secondary hover:bg-secondary-dark text-white text-3xl rounded-full h-20 w-20 items-center justify-center">
              <span className="text-center">{site?.title?.charAt(0)}</span>
            </div>
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
