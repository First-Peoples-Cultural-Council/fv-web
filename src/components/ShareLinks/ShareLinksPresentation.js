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
        className="flex align-center justify-center z-50"
      >
        {navigator.share ? (
          <li>
            <button
              data-testid="webshare-btn"
              type="button"
              className="my-2 mx-1 h-9 w-9 inline-flex items-center align-center justify-center rounded-sm text-white bg-charcoal-500"
              onClick={() =>
                navigator.share({
                  title,
                  url,
                })
              }
            >
              {getIcon('WebShare', 'fill-current h-7 w-7')}
            </button>
          </li>
        ) : null}
        <li>
          <a
            className="my-2 mx-1 h-9 w-9 inline-flex align-center justify-center rounded-sm text-blue-300"
            href={`https://twitter.com/intent/tweet?url=${url}&text=${title}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {getIcon('Twitter', 'fill-current h-9 w-9')}
          </a>
        </li>
        <li>
          <a
            className="my-2 mx-1 h-9 w-9 inline-flex items-center align-center justify-center rounded-sm text-blue-900"
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {getIcon('Facebook', 'fill-current h-9 w-9')}
          </a>
        </li>
        <li>
          <a
            className="my-2 mx-1 h-9 w-9 inline-flex items-center align-center justify-center rounded-sm text-blue-700"
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {getIcon('LinkedIn', 'fill-current h-9 w-9')}
          </a>
        </li>
        <li>
          <a
            className="my-2 mx-1 h-9 w-9 inline-flex items-center align-center justify-center rounded-sm text-white bg-scarlet-800"
            href={`mailto:?subject=${title}&body=${url}`}
          >
            {getIcon('Mail', 'fill-current h-7 w-7')}
          </a>
        </li>
        <li>
          <button
            type="button"
            data-testid="CopyUrl"
            aria-label="Copy to clipboard"
            className="my-2 mx-1 h-9 w-9 inline-flex items-center align-center justify-center rounded-sm text-white bg-ochre-600"
            onClick={() =>
              copyToClipboard({
                text: url,
                confirmationCallback: copyToClipboardCallback,
              })
            }
          >
            {getIcon('Link', 'fill-current h-7 w-7')}
          </button>
        </li>
        <li>
          <button
            data-testid="qrcode-btn"
            type="button"
            id="QrcodeButton"
            className="my-2 mx-1 h-9 w-9 inline-flex items-center align-center justify-center rounded-sm text-white bg-charcoal-500"
            onClick={() => setQrcodeModalOpen(true)}
          >
            <span className="sr-only">QR Code</span>
            {getIcon('Qrcode', 'fill-current h-7 w-7')}
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
  sitename: string,
}

export default ShareLinksPresentation
