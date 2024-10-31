import React, { Suspense, lazy, useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import Modal from 'components/Modal'
import Loading from 'components/Loading'
import { MEMBERS, TEAM } from 'common/constants'

// Modal content kept in separate file and lazy loaded to prevent loading of QR library before onClick
const QrcodeModalContent = lazy(() =>
  import('components/Actions/QrcodeModalContent'),
)

function QrcodeButton({
  buttonStyling,
  entry,
  iconStyling = 'h-8 w-8 md:h-6 md:w-6',
  url,
  withLabels = false,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <>
      <button
        data-testid="QrcodeButton"
        type="button"
        id="QrcodeButton"
        className={buttonStyling}
        onClick={() => setIsModalOpen(true)}
      >
        <span className="sr-only">QR Code</span>
        {getIcon('Qrcode', `fill-current ${iconStyling}`)}
        {withLabels ? <span className="ml-3">QR CODE</span> : null}
      </button>
      {/* QR Modal Content */}
      <Modal.Presentation
        isOpen={isModalOpen}
        closeHandler={() => setIsModalOpen(false)}
      >
        {entry?.visibility === TEAM || entry?.visibility === MEMBERS ? (
          <div
            id="ShareModalContent"
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
            <QrcodeModalContent
              closeHandler={() => setIsModalOpen(false)}
              url={url}
            />
          </Suspense>
        )}
      </Modal.Presentation>
    </>
  )
}

// PROPTYPES
const { bool, object, string } = PropTypes
QrcodeButton.propTypes = {
  entry: object,
  iconStyling: string,
  withLabels: bool,
  url: string,
  buttonStyling: string,
}

export default QrcodeButton
