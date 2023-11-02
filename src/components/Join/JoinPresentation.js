import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import getIcon from 'common/utils/getIcon'
import JoinForm from 'components/Join/JoinForm'
import { PUBLIC } from 'common/constants'

function JoinPresentation({ site, stage, submitHandler, errorMessage }) {
  // For Success/Error message
  const messageHeader =
    stage === 'success'
      ? 'Request has been sent'
      : 'Your request was unsuccessful'
  const message =
    stage === 'success'
      ? `The language administrator for ${site?.title} will review your`
      : `${errorMessage || 'Please try again at another time.'}`

  const icon =
    stage === 'success'
      ? getIcon('CheckCircleSolid', 'fill-current text-word h-12 w-12 mx-auto')
      : getIcon(
          'TimesCircleSolid',
          'fill-current text-secondary h-12 w-12 mx-auto',
        )

  return (
    <div
      data-testid="JoinPresentation"
      className="bg-white max-w-2xl mx-auto p-6 lg:p-10 overflow-hidden transform transition-all"
    >
      {stage === 'form' && (
        <JoinForm site={site} submitHandler={submitHandler} />
      )}
      {(stage === 'success' || stage === 'error') && (
        <div className="text-center space-y-10">
          <div>{icon}</div>

          <div className="text-center space-y-2">
            <h1 className="text-2xl leading-6 font-medium text-fv-charcoal">
              {messageHeader}
            </h1>
            <p className="text-base text-fv-charcoal-light">{message}</p>
          </div>

          <div className="text-center space-y-2">
            {site?.visibility === PUBLIC ? (
              <>
                <Link
                  to={`/${site?.sitename}/`}
                  className="bg-primary border border-gray-300 rounded-lg shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-primary-dark"
                >
                  Browse public content on the {site?.title} site
                </Link>
                <Link
                  to="/languages"
                  className="block py-2 px-4 text-sm font-medium text-primary hover:text-primary-dark"
                >
                  Explore other languages
                </Link>
              </>
            ) : (
              <Link
                to="/languages"
                className="bg-primary border border-gray-300 rounded-lg shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-primary-dark"
              >
                Explore other languages
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
// PROPTYPES
const { func, object, string } = PropTypes
JoinPresentation.propTypes = {
  submitHandler: func,
  site: object,
  stage: string,
  errorMessage: string,
}

export default JoinPresentation
