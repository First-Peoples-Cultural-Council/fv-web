import React from 'react'
import PropTypes from 'prop-types'
import copyToClipboard from 'common/utils/copyToClipboard'

// FPCC
import getIcon from 'common/utils/getIcon'
import { useNotification } from 'context/NotificationContext'
import { QrcodeButton } from 'components/Actions'
import { makePlural } from 'common/utils/urlHelpers'

function ShareLinksPresentation({
  url,
  sitename,
  title,
  modalCloseHandler,
  entry,
}) {
  const { setNotification } = useNotification()
  function confirmationCallback() {
    if (typeof modalCloseHandler !== 'undefined') {
      modalCloseHandler()
    }
    setTimeout(() => {
      setNotification({
        type: 'SUCCESS',
        message: 'Success! The link has been copied to your clipboard.',
      })
    }, 100)
  }

  return (
    <ul
      id="ShareLinksPresentation"
      className="flex align-center justify-center z-50"
    >
      {navigator.share ? (
        <li>
          <button
            data-testid="webshare-btn"
            type="button"
            className="my-2 mx-1 h-9 w-9 inline-flex items-center align-center justify-center rounded text-white bg-charcoal-500"
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
          className="my-2 mx-1 h-9 w-9 inline-flex align-center justify-center rounded text-blue-300"
          href={`https://twitter.com/intent/tweet?url=${url}&text=${title}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {getIcon('Twitter', 'fill-current h-9 w-9')}
        </a>
      </li>
      <li>
        <a
          className="my-2 mx-1 h-9 w-9 inline-flex items-center align-center justify-center rounded text-blue-900"
          href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {getIcon('Facebook', 'fill-current h-9 w-9')}
        </a>
      </li>
      <li>
        <a
          className="my-2 mx-1 h-9 w-9 inline-flex items-center align-center justify-center rounded text-blue-700"
          href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {getIcon('LinkedIn', 'fill-current h-9 w-9')}
        </a>
      </li>
      <li>
        <a
          className="my-2 mx-1 h-9 w-9 inline-flex items-center align-center justify-center rounded text-white bg-secondary"
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
          className="my-2 mx-1 h-9 w-9 inline-flex items-center align-center justify-center rounded text-white bg-tertiaryA"
          onClick={() => copyToClipboard({ text: url, confirmationCallback })}
        >
          {getIcon('Link', 'fill-current h-7 w-7')}
        </button>
      </li>
      <li>
        <QrcodeButton
          buttonStyling="my-2 mx-1 h-9 w-9 inline-flex items-center align-center justify-center rounded text-white bg-charcoal-500"
          entry={entry}
          url={`${window.location.origin.toString()}/${sitename}/${makePlural(
            entry?.type,
          )}/${entry?.id}`}
        />
      </li>
    </ul>
  )
}
// PROPTYPES
const { string, func, object } = PropTypes
ShareLinksPresentation.propTypes = {
  url: string,
  title: string,
  modalCloseHandler: func,
  sitename: string,
  entry: object,
}

export default ShareLinksPresentation
