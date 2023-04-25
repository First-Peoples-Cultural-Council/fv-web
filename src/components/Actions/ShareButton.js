import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Menu } from '@headlessui/react'

// FPCC
import getIcon from 'common/getIcon'
import { makePlural } from 'common/urlHelpers'
import ShareLinks from 'components/ShareLinks'
import Modal from 'components/Modal'
import { MEMBERS, TEAM } from 'common/constants'

function ShareButton({
  docId,
  docTitle,
  docType,
  docVisibility,
  sitename,
  iconStyling,
  withLabels,
}) {
  const [shareModelOpen, setShareModalOpen] = useState(false)
  return (
    <Menu.Item>
      {({ active }) => (
        <>
          <button
            id="ShareButton"
            className={`${
              active ? 'bg-gray-100 text-fv-charcoal' : 'text-fv-charcoal-light'
            } w-full group flex items-center px-4 py-2 text-sm`}
            onClick={() => setShareModalOpen(true)}
          >
            <span className="sr-only">Share</span>
            {getIcon('WebShare', `fill-current ${iconStyling}`)}
            {withLabels ? <span className="ml-3">SHARE</span> : null}
          </button>
          {/* Share Modal */}
          <Modal.Presentation
            isOpen={shareModelOpen}
            closeHandler={() => setShareModalOpen(false)}
          >
            <div
              id="ShareModalContent"
              className="inline-block align-bottom space-y-5 bg-white rounded-lg p-6 lg:p-8 overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm sm:w-full"
            >
              {docVisibility === TEAM || docVisibility === MEMBERS ? (
                <div className="text-center font-medium">
                  <p className="text-2xl text-fv-charcoal">
                    This {docType} is visible to
                  </p>
                  <p className="text-2xl text-fv-charcoal font-bold">
                    {docVisibility} only!
                  </p>
                  <a
                    className="my-2 mx-1 h-9 w-9 inline-flex items-center align-center justify-center rounded text-white bg-secondary"
                    href={`mailto:?subject=${docTitle}&body=${window.location.origin.toString()}/${sitename}/${makePlural(
                      docType,
                    )}/${docId}`}
                  >
                    {getIcon('Mail', 'fill-current h-7 w-7')}
                  </a>
                </div>
              ) : (
                <>
                  <h3 className="text-center text-xl font-medium text-fv-charcoal">
                    Share <em>{docTitle}</em> on:
                  </h3>
                  <ShareLinks.Presentation
                    url={`${window.location.origin.toString()}/${sitename}/${makePlural(
                      docType,
                    )}/${docId}`}
                    title={docTitle}
                    modalCloseHandler={() => setShareModalOpen(false)}
                  />
                </>
              )}
              <button
                type="button"
                className="inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-secondary text-base font-medium text-white hover:bg-secondary-light sm:text-sm"
                onClick={() => setShareModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </Modal.Presentation>
        </>
      )}
    </Menu.Item>
  )
}

// PROPTYPES
const { bool, func, string } = PropTypes
ShareButton.propTypes = {
  onClick: func,
  iconStyling: string,
  withLabels: bool,
  docId: string,
  docTitle: string,
  docType: string,
  docVisibility: string,
  sitename: string,
}
ShareButton.defaultProps = {
  iconStyling: 'h-8 w-8 md:h-6 md:w-6',
  withLabels: false,
}

export default ShareButton
