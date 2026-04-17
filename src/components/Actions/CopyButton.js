import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import copyToClipboard from 'common/utils/copyToClipboard'
import Tooltip from 'components/Tooltip'

function CopyButton({
  textToCopy,
  buttonStyling = 'btn-tertiary btn-md-icon',
  withLabels = false,
}) {
  const [confirmation, setConfirmation] = useState(false)

  const confirmationCallback = () => {
    /* clipboard successfully set */
    setConfirmation(true)
    setTimeout(() => {
      setConfirmation(false)
    }, 1000)
  }

  return (
    <Tooltip hide={withLabels} message={confirmation ? 'Copied' : 'Copy'}>
      <button
        type="button"
        id="CopyAction"
        data-testid={`copy-btn-${textToCopy}`}
        aria-label="Copy to clipboard"
        className={buttonStyling}
        onClick={() =>
          copyToClipboard({ text: textToCopy, confirmationCallback })
        }
      >
        {getIcon('Copy')}
        {withLabels ? <span>{confirmation ? 'Copied' : 'Copy'}</span> : null}
      </button>
    </Tooltip>
  )
}
// PROPTYPES
const { bool, string } = PropTypes
CopyButton.propTypes = {
  textToCopy: string,
  withLabels: bool,
  buttonStyling: string,
}

export default CopyButton
