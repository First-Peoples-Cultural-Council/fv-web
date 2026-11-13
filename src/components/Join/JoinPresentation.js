import React from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router'

// FPCC
import getIcon from 'common/utils/getIcon'
import JoinForm from 'components/Join/JoinForm'
import { PUBLIC } from 'common/constants'
import SiteDocHead from 'components/SiteDocHead'

function JoinPresentation({
  errorMessage,
  errorTitle,
  site,
  stage,
  submitHandler,
  closeModalCallback = () => {},
}) {
  // For Success/Error message
  const ICON_CLASS = 'fill-current h-12 w-12 md:h-20 md:w-20 mx-auto'

  const stageContent = {
    success: {
      icon: getIcon('CheckCircleSolid', `${ICON_CLASS} text-jade-500`),
      message: `The language administrator for ${site?.title} will review your request.`,
      messageHeader: 'Request has been sent',
    },
    existing: {
      icon: getIcon('InfoCircleSolid', `${ICON_CLASS} text-blumine-600`),
      message:
        'You have already submitted a request to join this language site.',
      messageHeader: 'Existing request pending',
    },
    error: {
      icon: getIcon('TimesCircleSolid', `${ICON_CLASS} text-scarlet-800`),
      message: errorMessage || 'There was an error processing your request.',
      messageHeader: errorTitle || 'Your request was unsuccessful',
    },
  }

  const messageHeader = stageContent[stage]?.messageHeader
  const message = stageContent[stage]?.message
  const icon = stageContent[stage]?.icon

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
      <SiteDocHead titleArray={['Join']} />
      <div className="mx-auto max-w-2xl">
        {stage === 'form' && (
          <JoinForm site={site} submitHandler={submitHandler} />
        )}
        {['success', 'existing', 'error'].includes(stage) && (
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
                    data-testid="public-site-link"
                    type="button"
                    onClick={() => linkAndClose(`/${site?.sitename}/`)}
                    className="btn-primary btn-md mx-auto flex"
                  >
                    Browse public content on the {site?.title} site
                  </button>
                )}
                <button
                  data-testid="languages-link"
                  type="button"
                  onClick={() => linkAndClose('/languages')}
                  className={
                    site?.visibility === PUBLIC
                      ? 'btn-tertiary btn-md'
                      : 'btn-primary btn-md mx-auto flex'
                  }
                >
                  <span>Explore other languages</span>
                  <div className="text-xl" aria-hidden="true">
                    →
                  </div>
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
