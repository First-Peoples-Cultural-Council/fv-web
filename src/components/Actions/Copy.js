import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import copyToClipboard from 'common/utils/copyToClipboard'
function Copy({
  textToCopy,
  iconStyling = 'h-8 w-8 md:h-6 md:w-6',
  withLabels = false,
  withConfirmation = false,
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

  const buttonClass = `relative group btn-tertiary ${withLabels ? ' btn-md' : 'btn-md-icon'}`

  return (
    <button
      type="button"
      id="CopyAction"
      data-testid={`copy-btn-${textToCopy}`}
      aria-label="Copy to clipboard"
      className={buttonClass}
      onClick={() =>
        copyToClipboard({ text: textToCopy, confirmationCallback })
      }
    >
      {getIcon('Copy', `fill-current ${iconStyling}`)}
      {hoverTooltip ? (
        <div className="z-10 hidden group-hover:inline-flex absolute -bottom-8 -right-1 w-auto p-1 text-sm bg-charcoal-500 text-white text-center rounded-lg">
          {confirmation ? 'Copied' : 'Copy'}
        </div>
      ) : null}
      {withLabels ? (
        <span className="mx-2">{confirmation ? 'COPIED' : 'COPY'}</span>
      ) : null}
    </button>
  )
}
// PROPTYPES
const { bool, string } = PropTypes
Copy.propTypes = {
  textToCopy: string,
  iconStyling: string,
  withLabels: bool,
  withConfirmation: bool,
  hoverTooltip: bool,
}

export default Copy
