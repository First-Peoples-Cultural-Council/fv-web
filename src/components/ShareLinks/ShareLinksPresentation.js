import React from 'react'
import PropTypes from 'prop-types'
import copyToClipboard from 'common/utils/copyToClipboard'

// FPCC
import getIcon from 'common/utils/getIcon'
import { useNotification } from 'context/NotificationContext'
function ShareLinksPresentation({ url, title, modalCloseHandler }) {
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
      className="flex align-center justify-center"
    >
      {navigator.share ? (
        <li>
          <button
            type="button"
            className="my-2 mx-1 h-9 w-9 inline-flex items-center align-center justify-center rounded text-white bg-tertiaryB"
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
          id="CopyUrl"
          aria-label="Copy to clipboard"
          className="my-2 mx-1 h-9 w-9 inline-flex items-center align-center justify-center rounded text-white bg-tertiaryA"
          onClick={() => copyToClipboard({ text: url, confirmationCallback })}
        >
          {getIcon('Link', 'fill-current h-7 w-7')}
        </button>
      </li>
    </ul>
  )
}
// PROPTYPES
const { string, func } = PropTypes
ShareLinksPresentation.propTypes = {
  url: string,
  title: string,
  modalCloseHandler: func,
}

export default ShareLinksPresentation
