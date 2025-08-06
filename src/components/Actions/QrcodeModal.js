import React, { Suspense, lazy } from 'react'
import PropTypes from 'prop-types'

// FPCC
import Modal from 'components/Modal'
import Loading from 'components/Loading'
import { MEMBERS, TEAM } from 'common/constants'

// Modal content kept in separate file and lazy loaded to prevent loading of QR library before onClick
const QrcodeModalContent = lazy(
  () => import('components/Actions/QrcodeModalContent'),
)

function QrcodeModal({ entry, url, isOpen = false, onClose }) {
  return (
    <Modal.Presentation isOpen={isOpen} closeHandler={onClose}>
      {entry?.visibility === TEAM || entry?.visibility === MEMBERS ? (
        <div
          id="QrModalContent"
          className="inline-block text-center align-bottom space-y-5 bg-white rounded-lg p-6 lg:p-8 overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm sm:w-full"
        >
          <p className="text-2xl text-charcoal-900 font-bold">
            This {entry?.type} is visible to {entry?.visibility} only!
          </p>
          <p className="text-lg text-charcoal-900">
            QR Codes can only be generated for public content.
          </p>
        </div>
      ) : (
        <Suspense fallback={<Loading.Container isLoading />}>
          <QrcodeModalContent closeHandler={onClose} url={url} />
        </Suspense>
      )}
    </Modal.Presentation>
  )
}

// PROPTYPES
const { bool, object, string, func } = PropTypes
QrcodeModal.propTypes = {
  entry: object,
  url: string,
  isOpen: bool,
  onClose: func,
}

export default QrcodeModal
