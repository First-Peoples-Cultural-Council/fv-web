import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import { makePlural } from 'common/utils/urlHelpers'
import ShareLinks from 'components/ShareLinks'
import Modal from 'components/Modal'
import { MEMBERS, TEAM } from 'common/constants'

function ShareModal({
  entry,
  sitename,
  siteVisibility,
  isOpen = false,
  onClose,
}) {
  return (
    <Modal.Presentation isOpen={isOpen} closeHandler={onClose}>
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
              className="btn-tertiary btn-lg-icon"
              href={`mailto:?subject=${
                entry?.title
              }&body=${window.location.origin.toString()}/${sitename}/${makePlural(
                entry?.type,
              )}/${entry?.id}`}
            >
              {getIcon('Mail')}
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
              modalCloseHandler={onClose}
            />
          </>
        )}
        <button
          data-testid="cancel"
          type="button"
          className="btn-primary btn-md"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal.Presentation>
  )
}

// PROPTYPES
const { bool, object, string, func } = PropTypes
ShareModal.propTypes = {
  entry: object,
  sitename: string,
  siteVisibility: string,
  isOpen: bool,
  onClose: func,
}

export default ShareModal
