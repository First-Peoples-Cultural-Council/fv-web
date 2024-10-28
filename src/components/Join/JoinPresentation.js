import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

// FPCC
import getIcon from 'common/utils/getIcon'
import JoinForm from 'components/Join/JoinForm'
import { PUBLIC } from 'common/constants'

function JoinPresentation({
  errorMessage,
  errorTitle,
  site,
  stage,
  submitHandler,
  closeModalCallback = () => {},
}) {
  // For Success/Error message
  const messageHeader =
    stage === 'success'
      ? 'Request has been sent'
      : `${errorTitle || 'Your request was unsuccessful.'}`
  const message =
    stage === 'success'
      ? `The language administrator for ${site?.title} will review your request.`
      : `${errorMessage || 'Please try again at another time.'}`

  const icon =
    stage === 'success'
      ? getIcon(
          'CheckCircleSolid',
          'fill-current text-word h-12 w-12 md:h-20 md:w-20 mx-auto',
        )
      : getIcon(
          'TimesCircleSolid',
          'fill-current text-secondary h-12 w-12 md:h-20 md:w-20 mx-auto',
        )

  const navigate = useNavigate()

  const linkAndClose = (url) => {
    navigate(url)
    closeModalCallback()
  }

  return (
    <div
      data-testid="JoinPresentation"
      className="bg-white p-6 lg:p-10 transform transition-all"
    >
      <div className="mx-auto max-w-2xl">
        {stage === 'form' && (
          <JoinForm site={site} submitHandler={submitHandler} />
        )}
        {(stage === 'success' || stage === 'error') && (
          <div
            data-testid="JoinPresentation-message"
            className="px-6 py-14 lg:px-8"
          >
            <div>{icon}</div>
            <div className="mt-6 mx-auto text-center">
              <h2 className="text-3xl font-bold tracking-tight text-charcoal-900 sm:text-4xl">
                {messageHeader}
              </h2>

              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-charcoal-500">
                {message}
              </p>
              <div className="mt-10 space-y-6">
                {site?.visibility === PUBLIC && (
                  <button
                    type="button"
                    onClick={() => linkAndClose(`/${site?.sitename}/`)}
                    className="btn-contained mx-auto flex"
                  >
                    Browse public content on the {site?.title} site
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => linkAndClose('/languages')}
                  className={
                    site?.visibility === PUBLIC
                      ? 'text-sm font-semibold leading-6 text-charcoal-900'
                      : 'btn-contained mx-auto flex'
                  }
                >
                  <span>Explore other languages</span>
                  <span className="text-lg ml-2" aria-hidden="true">
                    →
                  </span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
// PROPTYPES
const { func, object, string } = PropTypes
JoinPresentation.propTypes = {
  closeModalCallback: func,
  errorMessage: string,
  errorTitle: string,
  site: object,
  stage: string,
  submitHandler: func,
}

export default JoinPresentation
