import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import Modal from 'components/Modal'
import JoinForm from 'components/Join/JoinForm'

function JoinPresentation({ site, stage, submitHandler }) {
  const [joinModalOpen, setJoinModalOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        data-testid="JoinButton"
        onClick={() => setJoinModalOpen(true)}
        className="bg-primary rounded-lg shadow-sm py-2 px-4 inline-flex justify-center text-sm font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light"
      >
        <span>Join</span>
      </button>

      <Modal.Presentation
        isOpen={joinModalOpen}
        closeHandler={() => setJoinModalOpen(false)}
      >
        <div
          data-testid="JoinModal"
          className="inline-block align-bottom space-y-5 bg-white rounded-lg p-6 lg:p-10 overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-xl sm:w-full"
        >
          {stage === 'form' && (
            <JoinForm site={site} submitHandler={submitHandler} />
          )}
          {stage === 'success' && (
            <div className="text-left">
              <div className="text-center space-y-4">
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
                  request
                </p>
              </div>
            </div>
          )}
          {stage === 'error' && (
            <div className="text-left">
              <div className="text-center space-y-4">
                <div>
                  {getIcon(
                    'Close',
                    'fill-current text-red-500 h-12 w-12 mx-auto',
                  )}
                </div>
                <h1 className="text-2xl leading-6 font-medium text-fv-charcoal">
                  Your request was unsuccessful
                </h1>
                <p className="text-base text-fv-charcoal-light">
                  Please try again at another time.
                </p>
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
}

export default JoinPresentation
