import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Menu } from '@headlessui/react'

// FPCC
import getIcon from 'common/utils/getIcon'
import { makePlural } from 'common/utils/urlHelpers'
import ShareLinks from 'components/ShareLinks'
import Modal from 'components/Modal'
import { MEMBERS, TEAM } from 'common/constants'

function ShareButton({
  entry,
  sitename,
  siteVisibility,
  iconStyling = 'h-8 w-8 md:h-6 md:w-6',
  withLabels = false,
}) {
  const [shareModalOpen, setShareModalOpen] = useState(false)
  return (
    <Menu.Item>
      {({ active }) => (
        <>
          <button
            type="button"
            id="ShareButton"
            className={`${
              active ? 'bg-charcoal-50 text-charcoal-900' : 'text-charcoal-500'
            } w-full group flex items-center px-4 py-2 text-sm`}
            onClick={() => setShareModalOpen(true)}
          >
            <span className="sr-only">Share</span>
            {getIcon('WebShare', `fill-current ${iconStyling}`)}
            {withLabels ? <span className="ml-3">SHARE</span> : null}
          </button>
          {/* Share Modal */}
          <Modal.Presentation
            isOpen={shareModalOpen}
            closeHandler={() => setShareModalOpen(false)}
          >
            <div
              id="ShareModalContent"
              className="inline-block align-bottom space-y-5 bg-white rounded-lg p-6 lg:p-8 overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm sm:w-full"
            >
              {entry?.visibility === TEAM ||
              entry?.visibility === MEMBERS ||
              siteVisibility === TEAM ||
              siteVisibility === MEMBERS ? (
                <div className="text-center font-medium">
                  <p className="text-2xl text-charcoal-900">
                    This {entry?.type} is visible to
                  </p>
                  <p className="text-2xl text-charcoal-900 font-bold">
                    {entry?.visibility} only!
                  </p>
                  <a
                    className="my-2 mx-1 h-9 w-9 inline-flex items-center align-center justify-center rounded text-white bg-scarlet-800"
                    href={`mailto:?subject=${
                      entry?.title
                    }&body=${window.location.origin.toString()}/${sitename}/${makePlural(
                      entry?.type,
                    )}/${entry?.id}`}
                  >
                    {getIcon('Mail', 'fill-current h-7 w-7')}
                  </a>
                </div>
              ) : (
                <>
                  <h3 className="text-center text-xl font-medium text-charcoal-900">
                    Share <em>{entry?.title}</em> on:
                  </h3>
                  <ShareLinks.Presentation
                    url={`${window.location.origin.toString()}/${sitename}/${makePlural(
                      entry?.type,
                    )}/${entry?.id}`}
                    title={entry?.title}
                    modalCloseHandler={() => setShareModalOpen(false)}
                  />
                </>
              )}
              <button
                data-testid="cancel"
                type="button"
                className="btn-contained bg-scarlet-800"
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
const { bool, object, string } = PropTypes
ShareButton.propTypes = {
  entry: object,
  sitename: string,
  iconStyling: string,
  withLabels: bool,
  siteVisibility: string,
}

export default ShareButton
