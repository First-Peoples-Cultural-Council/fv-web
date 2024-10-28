import React, { useState } from 'react'
import { PropTypes } from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import Modal from 'components/Modal'
import useLoginLogout from 'common/hooks/useLoginLogout'
import Join from 'components/Join'
import { THUMBNAIL } from 'common/constants'
import SiteLogo from 'components/SiteLogo'

function PrivateSiteCard({ site, user }) {
  const { login } = useLoginLogout()

  const [privateSiteModalOpen, setPrivateSiteModalOpen] = useState(false)
  const [showJoinForm, setShowJoinForm] = useState(false)

  const isAnonymous = user?.isAnonymous

  const primaryButtonClick = (e) => {
    if (isAnonymous) login(e)
    setShowJoinForm(true)
  }

  return (
    <>
      <button
        data-testid="PrivateSiteCard"
        type="button"
        className="group relative card border-2 border-gray-200 rounded-l-lg shadow-md text-charcoal-900 hover:text-white flex items-center
        h-16 md:h-24 w-64 lg:w-72 m-5 md:ml-12 lg:ml-16 hover:bg-ochre-600 hover:border-ochre-600"
        onClick={() => setPrivateSiteModalOpen(true)}
      >
        <div className="absolute h-16 w-16 md:w-24 md:h-24 -left-8 md:-left-10">
          <SiteLogo.Presentation
            size={THUMBNAIL}
            logo={site?.logo || null}
            additionalStyling="ring-1 ring-gray-200"
          />
        </div>
        <p className="w-full ml-24 mr-8 md:mr-4 tracking-tight text-center break-word">
          {site?.title}
        </p>
        {getIcon(
          'Lock',
          'absolute bottom-2 right-2 h-5 w-5 fill-ochre-400 group-hover:fill-white',
        )}
      </button>

      <Modal.Presentation
        isOpen={privateSiteModalOpen}
        closeHandler={() => setPrivateSiteModalOpen(false)}
      >
        <div
          data-testid="PrivateSiteModalContent"
          className="bg-white rounded-lg shadow-lg p-2"
        >
          {showJoinForm ? (
            <Join.Container
              closeModalCallback={() => setPrivateSiteModalOpen(false)}
              site={site}
            />
          ) : (
            <div className="p-4 sm:px-6 sm:py-32 lg:px-8">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="text-3xl font-bold tracking-tight text-charcoal-900 sm:text-4xl">
                  {site?.title} <br />
                  is Private
                </h2>

                <p className="mx-auto mt-3 md:mt-6 max-w-xl text-lg leading-8 text-charcoal-500">
                  You need to be {isAnonymous && 'logged in and '}a registered
                  member of this site to see its content.
                </p>
                <div className="mt-5 md:mt-10 flex items-center justify-center gap-x-3 md:gap-x-6">
                  <button
                    data-testid="login-join"
                    type="button"
                    onClick={primaryButtonClick}
                    className="btn-contained bg-secondary"
                  >
                    {isAnonymous ? 'Sign in' : 'request to join'}
                  </button>
                  <button
                    data-testid="explore-languages"
                    type="button"
                    onClick={() => setPrivateSiteModalOpen(false)}
                    className="text-sm font-semibold leading-6 text-charcoal-900"
                  >
                    Explore other languages <span aria-hidden="true">→</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal.Presentation>
    </>
  )
}

// PROPTYPES
const { object } = PropTypes
PrivateSiteCard.propTypes = {
  site: object,
  user: object,
}
export default PrivateSiteCard
