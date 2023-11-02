import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import getIcon from 'common/utils/getIcon'
import Modal from 'components/Modal'
import JoinForm from 'components/Join/JoinForm'

function JoinPresentation({
  site,
  stage,
  submitHandler,
  errorMessage,
  linkStyling,
}) {
  const [joinModalOpen, setJoinModalOpen] = useState(false)

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
    <>
      <button
        type="button"
        data-testid="JoinButton"
        onClick={() => setJoinModalOpen(true)}
        className={linkStyling}
      >
        Join {site?.title}
      </button>

      <Modal.Presentation
        isOpen={joinModalOpen}
        closeHandler={() => setJoinModalOpen(false)}
      >
        <div
          data-testid="JoinModal"
          className="bg-white max-w-2xl rounded-lg shadow-xl p-6 lg:p-10 overflow-hidden transform transition-all"
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
                <button
                  type="button"
                  onClick={() => setJoinModalOpen(false)}
                  className="bg-primary border border-gray-300 rounded-lg shadow-sm py-2 px-4 text-sm font-medium text-white hover:bg-primary-dark"
                >
                  Close
                </button>
                <Link
                  to="/languages"
                  className="block py-2 px-4 text-sm font-medium text-primary hover:text-primary-dark"
                >
                  Explore Languages Page
                </Link>
              </div>
            </div>
          )}
        </div>
      </Modal.Presentation>
    </>
  )
}
// PROPTYPES
const { func, object, string } = PropTypes
JoinPresentation.propTypes = {
  submitHandler: func,
  site: object,
  stage: string,
  errorMessage: string,
  linkStyling: string,
}

JoinPresentation.defaultProps = {
  linkStyling:
    'w-full truncate rounded-lg shadow-sm py-2 px-4 text-lg font-medium text-white',
}

export default JoinPresentation
