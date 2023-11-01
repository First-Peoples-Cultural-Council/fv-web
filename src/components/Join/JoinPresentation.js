import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import getIcon from 'common/utils/getIcon'
import Modal from 'components/Modal'
import JoinForm from 'components/Join/JoinForm'

function JoinPresentation({ site, stage, submitHandler }) {
  const [joinModalOpen, setJoinModalOpen] = useState(false)

  const getSubmittedMessage = () => {
    if (stage === 'success') {
      return (
        <>
          <div>
            {getIcon(
              'Checkmark',
              'fill-current text-green-500 h-12 w-12 mx-auto',
            )}
          </div>
          <h1 className="text-2xl leading-6 font-medium text-fv-charcoal">
            Request has been sent
          </h1>
          <p className="text-base text-fv-charcoal-light">
            The language administrator for {site?.title} will review your
            request.
          </p>
        </>
      )
    }

    if (stage === 'error') {
      return (
        <>
          <div>
            {getIcon('Close', 'fill-current text-red-500 h-12 w-12 mx-auto')}
          </div>
          <h1 className="text-2xl leading-6 font-medium text-fv-charcoal">
            Your request was unsuccessful
          </h1>
          <p className="text-base text-fv-charcoal-light">
            Please try again at another time.
          </p>
        </>
      )
    }
    return ''
  }

  return (
    <>
      <button
        type="button"
        data-testid="JoinButton"
        onClick={() => setJoinModalOpen(true)}
        className="w-full truncate rounded-lg shadow-sm py-2 px-4 text-lg font-medium text-white"
      >
        Join {site?.title}
      </button>

      <Modal.Presentation
        isOpen={joinModalOpen}
        closeHandler={() => setJoinModalOpen(false)}
      >
        <div
          data-testid="JoinModal"
          className="bg-white max-w-2xl rounded-lg shadow-xl p-6 lg:p-12 overflow-hidden transform transition-all"
        >
          {stage === 'form' && (
            <JoinForm site={site} submitHandler={submitHandler} />
          )}
          {(stage === 'success' || stage === 'error') && (
            <div className="text-center space-y-4">
              {getSubmittedMessage()}
              <button
                type="button"
                onClick={() => setJoinModalOpen(false)}
                className="bg-white border border-gray-300 rounded-lg shadow-sm py-2 px-4 text-sm font-medium text-fv-charcoal hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-light"
              >
                Close
              </button>
              <Link
                type="button"
                to="/languages"
                className="py-2 px-4 text-sm font-medium text-primary hover:text-primary-dark"
              >
                Explore Languages Page
              </Link>
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
}

export default JoinPresentation
