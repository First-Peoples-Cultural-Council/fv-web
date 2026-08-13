import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import { ERROR, SUCCESS, WARNING, INFO, NEUTRAL } from 'common/constants'

function AlertBannerPresentation({ alertType, handleClose, message }) {
  const styleSettings = {
    [SUCCESS]: {
      backgroundColor: 'bg-jade-50',
      textColor: 'text-jade-800',
      icon: 'CheckCircleSolid',
      iconColor: 'text-jade-500',
    },
    [ERROR]: {
      backgroundColor: 'bg-scarlet-50',
      textColor: 'text-scarlet-900',
      icon: 'TimesCircleSolid',
      iconColor: 'text-scarlet-700',
    },
    [WARNING]: {
      backgroundColor: 'bg-ochre-50',
      textColor: 'text-ochre-800',
      icon: 'ExclamationTriangleSolid',
      iconColor: 'text-ochre-500',
    },
    [INFO]: {
      backgroundColor: 'bg-blumine-50',
      textColor: 'text-blumine-800',
      icon: 'InfoCircleSolid',
      iconColor: 'text-blumine-500',
    },
    [NEUTRAL]: {
      backgroundColor: 'bg-charcoal-50',
      textColor: 'text-charcoal-900',
      icon: 'InfoCircleSolid',
      iconColor: 'text-charcoal-500',
    },
  }

  const styling = styleSettings?.[alertType] || styleSettings[NEUTRAL]

  return (
    <div
      id={`AlertBanner_${alertType}`}
      className={`rounded-lg p-4 ${styling.backgroundColor}`}
    >
      <div className="flex justify-between items-center space-x-4">
        {getIcon(
          styling.icon,
          `fill-current size-5 shrink-0 ${styling.iconColor}`,
        )}
        <div className={`text-sm ${styling.textColor}`}>{message}</div>
        <div>
          {handleClose && (
            <button
              data-testid={`${alertType}-close-btn`}
              type="button"
              onClick={handleClose}
              className={`btn-tertiary btn-md-icon bg-transparent ${styling.iconColor}`}
            >
              <span className="sr-only">Dismiss</span>
              {getIcon('Close')}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
// PROPTYPES
const { func, node, oneOf } = PropTypes
AlertBannerPresentation.propTypes = {
  message: node,
  alertType: oneOf([ERROR, SUCCESS, WARNING, INFO, NEUTRAL]),
  handleClose: func,
}

export default AlertBannerPresentation
