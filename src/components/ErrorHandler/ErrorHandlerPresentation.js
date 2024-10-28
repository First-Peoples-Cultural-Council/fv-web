import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import useLoginLogout from 'common/hooks/useLoginLogout'

function ErrorHandlerPresentation({ backHandler, status, heading, content }) {
  const { login } = useLoginLogout()
  return (
    <div
      id="ErrorHandler"
      className="min-w-screen min-h-screen bg-tertiaryA flex items-center p-5 lg:p-20 overflow-hidden relative"
    >
      <div className="w-full flex-1 min-h-full min-w-full rounded-lg bg-white shadow-xl p-10 lg:p-20 text-gray-800 relative items-center text-center">
        <h1 className="font-black text-3xl lg:text-5xl text-charcoal-900 mb-10">
          Oops! We&apos;ve found a problem...
        </h1>
        <div className="mb-10 text-gray-600 font-light">
          <h1 className="font-black uppercase text-3xl lg:text-5xl text-tertiaryA mb-5">
            {status} {heading}
          </h1>
          <div className="text-xl text-charcoal-900">{content}</div>
        </div>
        <div className="mb-5 md:mb-10">
          {status === 401 ? (
            <button
              data-testid="login"
              type="button"
              className="text-xl outline-none focus:outline-none transform transition-all hover:scale-110 text-primary hover:text-primary-dark"
              onClick={login}
              onKeyDown={login}
            >
              {getIcon('Login', 'inline-flex fill-current mr-2 h-8 w-8')}
              Sign in
            </button>
          ) : (
            <button
              data-testid="back"
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
          className="btn-outlined"
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
