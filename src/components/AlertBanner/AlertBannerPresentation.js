import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import { ERROR, SUCCESS, WARNING, INFO, NEUTRAL } from 'common/constants'

function AlertBannerPresentation({ alertType, handleClose, message }) {
  switch (alertType) {
    case SUCCESS:
      return (
        <div className="rounded-lg bg-jade-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              {getIcon(
                'CheckCircleSolid',
                'fill-current h-5 w-5 text-jade-500',
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-jade-800">{message}</p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                {handleClose && (
                  <button
                    data-testid="success-close-btn"
                    type="button"
                    onClick={handleClose}
                    className="inline-flex rounded-lg p-1.5 text-jade-500"
                  >
                    <span className="sr-only">Dismiss</span>
                    {getIcon('Close', 'fill-current h-5 w-5')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    case ERROR:
      return (
        <div className="rounded-lg bg-scarlet-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              {getIcon(
                'TimesCircleSolid',
                'fill-current h-5 w-5 text-scarlet-700',
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-scarlet-900">{message}</p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                {handleClose && (
                  <button
                    data-testid="error-close-btn"
                    type="button"
                    onClick={handleClose}
                    className="inline-flex rounded-lg p-1.5 text-scarlet-700"
                  >
                    <span className="sr-only">Dismiss</span>
                    {getIcon('Close', 'fill-current h-5 w-5')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    case WARNING:
      return (
        <div className="rounded-lg bg-ochre-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              {getIcon(
                'ExclamationTriangleSolid',
                'fill-current h-5 w-5 text-ochre-500',
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-ochre-800">{message}</p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                {handleClose && (
                  <button
                    data-testid="warning-close-btn"
                    type="button"
                    onClick={handleClose}
                    className="inline-flex rounded-lg p-1.5 text-ochre-500"
                  >
                    <span className="sr-only">Dismiss</span>
                    {getIcon('Close', 'fill-current h-5 w-5')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    case INFO:
      return (
        <div className="rounded-lg bg-blumine-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              {getIcon(
                'InfoCircleSolid',
                'fill-current h-5 w-5 text-blumine-500',
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-blumine-800">{message}</p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                {handleClose && (
                  <button
                    data-testid="info-close-btn"
                    type="button"
                    onClick={handleClose}
                    className="inline-flex rounded-lg p-1.5 text-blumine-500"
                  >
                    <span className="sr-only">Dismiss</span>
                    {getIcon('Close', 'fill-current h-5 w-5')}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )
    case NEUTRAL:
    default:
      return (
        <div className="rounded-lg bg-charcoal-50 shadow-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              {getIcon(
                'InfoCircleSolid',
                'fill-current h-5 w-5 text-charcoal-500',
              )}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-charcoal-900">{message}</p>
            </div>
            <div className="ml-auto pl-3">
              <div className="-mx-1.5 -my-1.5">
                {handleClose && (
                  <button
                    data-testid="neutral-close-btn"
                    type="button"
                    onClick={handleClose}
                    className="inline-flex rounded-lg p-1.5 text-charcoal-500"
                  >
                    <span className="sr-only">Dismiss</span>
                    {getIcon('Close', 'fill-current h-5 w-5')}
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
const { func, string, oneOf } = PropTypes
AlertBannerPresentation.propTypes = {
  message: string,
  alertType: oneOf([ERROR, SUCCESS, WARNING, INFO, NEUTRAL]),
  handleClose: func,
}

export default AlertBannerPresentation
