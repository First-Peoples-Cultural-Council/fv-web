import React, { useState, Suspense, lazy } from 'react'
import PropTypes from 'prop-types'
import { useClose } from '@headlessui/react'

// FPCC
import getIcon from 'common/utils/getIcon'
import { useNotification } from 'context/NotificationContext'
import Modal from 'components/Modal'
import Loading from 'components/Loading'
import copyToClipboard from 'common/utils/copyToClipboard'

const QrcodeCanvas = lazy(() => import('components/Actions/QrcodeCanvas'))

function ShareLinksPresentation({ url, title }) {
  const { setNotification } = useNotification()
  let close = useClose()

  function copyToClipboardCallback() {
    // If inside modal - close nearest parent Dialog
    close()
    // Set notification
    setTimeout(() => {
      setNotification({
        type: 'SUCCESS',
        message: 'Success! The link has been copied to your clipboard.',
      })
    }, 100)
  }
  const [qrcodeModalOpen, setQrcodeModalOpen] = useState(false)

  return (
    <>
      <ul
        id="ShareLinksPresentation"
        className="flex align-center justify-center z-50 space-x-1"
      >
        {navigator.share ? (
          <li>
            <button
              data-testid="webshare-btn"
              type="button"
              className="btn-lg-icon btn-tertiary"
              onClick={() =>
                navigator.share({
                  title,
                  url,
                })
              }
            >
              {getIcon('WebShare')}
            </button>
          </li>
        ) : null}
        <li>
          <a
            className="btn-lg-icon btn-tertiary"
            href={`https://twitter.com/intent/tweet?url=${url}&text=${title}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {getIcon('Twitter')}
          </a>
        </li>
        <li>
          <a
            className="btn-lg-icon btn-tertiary"
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {getIcon('Facebook')}
          </a>
        </li>
        <li>
          <a
            className="btn-lg-icon btn-tertiary"
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {getIcon('LinkedIn')}
          </a>
        </li>
        <li>
          <a
            className="btn-lg-icon btn-tertiary"
            href={`mailto:?subject=${title}&body=${url}`}
          >
            {getIcon('Mail')}
          </a>
        </li>
        <li>
          <button
            type="button"
            data-testid="CopyUrl"
            aria-label="Copy to clipboard"
            className="btn-lg-icon btn-tertiary"
            onClick={() =>
              copyToClipboard({
                text: url,
                confirmationCallback: copyToClipboardCallback,
              })
            }
          >
            {getIcon('Link')}
          </button>
        </li>
        <li>
          <button
            data-testid="qrcode-btn"
            type="button"
            id="QrcodeButton"
            className="btn-lg-icon btn-tertiary"
            onClick={() => setQrcodeModalOpen(true)}
          >
            <span className="sr-only">QR Code</span>
            {getIcon('Qrcode')}
          </button>
        </li>
      </ul>

      <Modal.Presentation
        isOpen={qrcodeModalOpen}
        closeHandler={() => setQrcodeModalOpen(false)}
      >
        <Suspense fallback={<Loading.Container isLoading />}>
          <div
            id="qrcode-share-links-modal"
            className="inline-block align-bottom space-y-5 bg-white rounded-lg p-6 lg:p-8 overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm sm:w-full"
          >
            <h3 className="text-center text-xl font-medium text-charcoal-900">
              &quot;{title}&quot; QR Code:
            </h3>
            <div className="w-full flex justify-center p-2">
              <QrcodeCanvas url={url} />
            </div>
            <button
              data-testid="cancel-btn"
              type="button"
              className="btn-primary btn-md"
              onClick={() => setQrcodeModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </Suspense>
      </Modal.Presentation>
    </>
  )
}
// PROPTYPES
const { string } = PropTypes
ShareLinksPresentation.propTypes = {
  url: string,
  title: string,
}

export default ShareLinksPresentation
