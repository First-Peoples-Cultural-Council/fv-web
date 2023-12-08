import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import { SECONDARY_BUTTON_STYLE } from 'common/constants/styles'

function ErrorHandlerPresentation({ backHandler, status, heading, content }) {
  return (
    <div
      id="ErrorHandler"
      className="min-w-screen min-h-screen bg-tertiaryA flex items-center p-5 lg:p-20 overflow-hidden relative"
    >
      <div className="w-full flex-1 min-h-full min-w-full rounded-lg bg-white shadow-xl p-10 lg:p-20 text-gray-800 relative items-center text-center">
        <h1 className="font-black text-3xl lg:text-5xl text-fv-charcoal mb-10">
          Oops! We&apos;ve found a problem...
        </h1>
        <div className="mb-10 text-gray-600 font-light">
          <h1 className="font-black uppercase text-3xl lg:text-5xl text-tertiaryA mb-5">
            {status} {heading}
          </h1>
          <div className="text-xl text-fv-charcoal">{content}</div>
        </div>
        <div className="mb-5 md:mb-10">
          {status === 401 ? (
            <button
              type="button"
              className="text-xl outline-none focus:outline-none transform transition-all hover:scale-110 text-primary hover:text-primary-dark"
              onClick={() => backHandler()}
            >
              {getIcon('Login', 'inline-flex fill-current mr-2 h-8 w-8')}
              Sign in
            </button>
          ) : (
            <button
              type="button"
              className="text-xl outline-none focus:outline-none transform transition-all hover:scale-110 text-primary hover:text-primary-dark"
              onClick={() => backHandler()}
            >
              {getIcon(
                'BackArrow',
                'inline-flex pb-2 h-7 fill-current mr-2 h-10',
              )}
              Go back
            </button>
          )}
        </div>
        <a
          className={SECONDARY_BUTTON_STYLE}
          href="https://firstvoices.atlassian.net/servicedesk/customer/portal/6"
          target="_blank"
          rel="noopener noreferrer"
        >
          Report problem
        </a>
      </div>
    </div>
  )
}
// PROPTYPES
const { func, node, number, oneOfType, string } = PropTypes
ErrorHandlerPresentation.propTypes = {
  backHandler: func,
  status: oneOfType([string, number]),
  heading: string,
  content: oneOfType([string, node]),
}

export default ErrorHandlerPresentation
