import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router'

// FPCC
import GlobalConfiguration from 'src/GlobalConfiguration'
import getIcon from 'common/utils/getIcon'
import useGoBack from 'common/hooks/useGoBack'

function Maintenance({ children, pageName = 'This page' }) {
  const { sitename } = useParams()
  const { goBack } = useGoBack({ fallbackRoute: `/${sitename}/dashboard` })

  const isUnderMaintenance = GlobalConfiguration?.UNDER_MAINTENANCE === 'true'
  return isUnderMaintenance ? (
    <div
      data-testid="MaintenancePresentation"
      className="min-w-screen min-h-screen bg-blumine-600 flex items-center p-5 lg:p-20 overflow-hidden relative"
    >
      <div className="w-full flex-1 min-h-full min-w-full rounded-lg bg-white shadow-xl p-10 lg:p-20 text-charcoal-900 relative items-center text-center">
        <div className="mb-10 text-charcoal-700 font-light">
          <h1 className="font-black uppercase text-3xl lg:text-5xl text-blumine-700 mb-5">
            Under Maintenance
          </h1>
          <div className="text-xl text-charcoal-900">
            <p>
              {pageName} is currently under maintenance. It will be back soon.
            </p>
            <p>
              If you have any questions please contact us at{' '}
              <a href="mailto:hello@firstvoices.com" className="inline-url">
                hello@firstvoices.com
              </a>
            </p>
          </div>
        </div>
        <div className="inline-flex items-center space-x-2">
          <a
            className="btn-secondary btn-lg"
            href="https://firstvoices.atlassian.net/servicedesk/customer/portal/6"
            target="_blank"
            rel="noopener noreferrer"
          >
            Need support?
          </a>
          <button
            type="button"
            className="btn-primary btn-lg"
            data-testid="back-btn"
            onClick={goBack}
          >
            {getIcon('BackArrow')}
            <span>Go back</span>
          </button>
        </div>
      </div>
    </div>
  ) : (
    children
  )
}
// PROPTYPES
const { node, string } = PropTypes
Maintenance.propTypes = {
  children: node,
  pageName: string,
}

export default Maintenance
