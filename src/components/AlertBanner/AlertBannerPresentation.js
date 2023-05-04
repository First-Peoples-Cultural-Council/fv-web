import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'

function AlertBannerPresentation({ alertType, handleClose, message }) {
  switch (alertType) {
    case 'SUCCESS':
      return (
        <div className="rounded-lg bg-green-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              {getIcon(
                'CheckCircleSolid',
                'h-5 w-5 fill-current  text-green-400',
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-green-800">{message}</p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                {handleClose && (
                  <button
                    type="button"
                    onClick={handleClose}
                    className="inline-flex bg-green-50 rounded-lg p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-green-50 focus:ring-green-600"
                  >
                    <span className="sr-only">Dismiss</span>
                    {getIcon('Close', 'h-5 w-5')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    case 'ERROR':
      return (
        <div className="rounded-lg bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              {getIcon('TimesCircleSolid', 'h-5 w-5 fill-current text-red-400')}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{message}</p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                {handleClose && (
                  <button
                    type="button"
                    onClick={handleClose}
                    className="inline-flex bg-red-50 rounded-lg p-1.5 text-red-500 hover:bg-red-100"
                  >
                    <span className="sr-only">Dismiss</span>
                    {getIcon('Close', 'h-5 w-5')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    case 'WARNING':
      return (
        <div className="rounded-lg bg-yellow-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              {getIcon(
                'ExclamationTriangleSolid',
                'h-5 w-5 fill-current text-yellow-400',
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-yellow-800">{message}</p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                {handleClose && (
                  <button
                    type="button"
                    onClick={handleClose}
                    className="inline-flex bg-yellow-50 rounded-lg p-1.5 text-yellow-500 hover:bg-yellow-100"
                  >
                    <span className="sr-only">Dismiss</span>
                    {getIcon('Close', 'h-5 w-5')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    case 'INFO':
      return (
        <div className="rounded-lg bg-blue-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              {getIcon('InfoCircleSolid', 'h-5 w-5 fill-current text-blue-400')}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-800">{message}</p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                {handleClose && (
                  <button
                    type="button"
                    onClick={handleClose}
                    className="inline-flex bg-blue-50 rounded-lg p-1.5 text-blue-500 hover:bg-blue-100"
                  >
                    <span className="sr-only">Dismiss</span>
                    {getIcon('Close', 'h-5 w-5')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    case 'NEUTRAL':
    default:
      return (
        <div className="rounded-lg bg-gray-50 shadow-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              {getIcon('InfoCircleSolid', 'h-5 w-5 fill-current text-primary')}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-primary">{message}</p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                {handleClose && (
                  <button
                    type="button"
                    onClick={handleClose}
                    className="inline-flex bg-gray-50 rounded-lg p-1.5 text-primary hover:bg-gray-100"
                  >
                    <span className="sr-only">Dismiss</span>
                    {getIcon('Close', 'h-5 w-5')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )
  }
}
// PROPTYPES
const { func, string } = PropTypes
AlertBannerPresentation.propTypes = {
  message: string,
  alertType: string,
  handleClose: func,
}

export default AlertBannerPresentation
