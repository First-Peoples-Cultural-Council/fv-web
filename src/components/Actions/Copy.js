import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import copyToClipboard from 'common/utils/copyToClipboard'
import Tooltip from 'components/Tooltip'

function Copy({ textToCopy, withLabels = false }) {
  const [confirmation, setConfirmation] = useState(false)

  const confirmationCallback = () => {
    /* clipboard successfully set */
    setConfirmation(true)
    setTimeout(() => {
      setConfirmation(false)
    }, 1000)
  }

  const buttonClass = `btn-tertiary ${withLabels ? ' btn-sm' : 'btn-md-icon'}`

  return (
    <Tooltip hide={withLabels} message={confirmation ? 'Copied' : 'Copy'}>
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
        {getIcon('Copy')}
        {withLabels ? <span>{confirmation ? 'COPIED' : 'COPY'}</span> : null}
      </button>
    </Tooltip>
  )
}
// PROPTYPES
const { bool, string } = PropTypes
Copy.propTypes = {
  textToCopy: string,
  withLabels: bool,
}

export default Copy
