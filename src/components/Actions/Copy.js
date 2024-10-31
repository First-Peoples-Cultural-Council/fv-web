import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import copyToClipboard from 'common/utils/copyToClipboard'
function Copy({
  docId,
  docTitle,
  iconStyling = 'h-8 w-8 md:h-6 md:w-6',
  withLabels = false,
  withConfirmation = false,
  withTooltip = false,
  hoverTooltip,
}) {
  const [confirmation, setConfirmation] = useState(false)

  const confirmationCallback = () => {
    /* clipboard successfully set */
    if (withConfirmation) {
      setConfirmation(true)
      setTimeout(() => {
        setConfirmation(false)
      }, 1000)
    }
  }

  return (
    <button
      type="button"
      id="CopyAction"
      aria-label="Copy to clipboard"
      className="relative inline-flex items-center text-sm font-medium text-charcoal-900 hover:text-black group"
      onClick={() => copyToClipboard({ text: docTitle, confirmationCallback })}
    >
      {getIcon('Copy', `fill-current ${iconStyling}`)}
      {hoverTooltip ? (
        <div className="z-10 hidden group-hover:inline-flex absolute -bottom-8 -right-1 w-auto p-1 text-sm bg-charcoal-500 text-white text-center rounded-lg">
          Copy
        </div>
      ) : null}
      {withLabels ? (
        <>
          <span className="mx-2">COPY</span>
          <span
            id={`copy-message-${docId}`}
            className={confirmation ? '' : 'hidden'}
          >
            <span className="absolute bottom-1 -right-1 bg-white">COPIED</span>
          </span>
        </>
      ) : null}
      {withTooltip ? (
        <span
          id={`copy-message-${docId}`}
          className={confirmation ? '' : 'hidden'}
        >
          <div className="absolute bottom-0 -right-1 w-auto p-1 text-sm bg-charcoal-500 text-white text-center rounded-lg shadow-lg ">
            Copied
          </div>
        </span>
      ) : null}
    </button>
  )
}
// PROPTYPES
const { bool, string } = PropTypes
Copy.propTypes = {
  docId: string,
  docTitle: string,
  iconStyling: string,
  withLabels: bool,
  withConfirmation: bool,
  withTooltip: bool,
  hoverTooltip: bool,
}

export default Copy
