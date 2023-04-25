import React, { Suspense, lazy, useState } from 'react'
import PropTypes from 'prop-types'
import { Menu } from '@headlessui/react'

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
  docType,
  docVisibility,
  iconStyling,
  url,
  withLabels,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <Menu.Item>
      {({ active }) => (
        <>
          <button
            type="button"
            id="QrcodeButton"
            className={`${
              active ? 'bg-gray-100 text-fv-charcoal' : 'text-fv-charcoal-light'
            } w-full group flex items-center px-4 py-2 text-sm`}
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
            {docVisibility === TEAM || docVisibility === MEMBERS ? (
              <div
                id="ShareModalContent"
                className="inline-block text-center align-bottom space-y-5 bg-white rounded-lg p-6 lg:p-8 overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm sm:w-full"
              >
                <p className="text-2xl text-fv-charcoal font-bold">
                  This {docType} is visible to {docVisibility} only!
                </p>
                <p className="text-lg text-fv-charcoal">
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
      )}
    </Menu.Item>
  )
}

// PROPTYPES
const { bool, string } = PropTypes
QrcodeButton.propTypes = {
  docType: string,
  docVisibility: string,
  iconStyling: string,
  withLabels: bool,
  url: string,
}
QrcodeButton.defaultProps = {
  iconStyling: 'h-8 w-8 md:h-6 md:w-6',
  withLabels: false,
}

export default QrcodeButton
