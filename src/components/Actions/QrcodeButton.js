import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import Tooltip from 'components/Tooltip'
import QrcodeModal from 'components/Actions/QrcodeModal'
import { makePlural } from 'common/utils/urlHelpers'

// NB: This button CANNOT be used inside a modal
function QrcodeButton({
  entry,
  buttonStyling = 'btn-tertiary btn-sm',
  withLabels = false,
}) {
  const [qrcodeModalOpen, setQrcodeModalOpen] = useState(false)

  return (
    <>
      <Tooltip hide={withLabels} message="QR Code">
        <button
          data-testid="qrcode-btn"
          type="button"
          id="QrcodeButton"
          className={buttonStyling}
          onClick={() => setQrcodeModalOpen(true)}
        >
          {getIcon('Qrcode')}
          {withLabels ? <span>QR code</span> : null}
        </button>
      </Tooltip>
      <QrcodeModal
        entry={entry}
        url={`${globalThis.location.origin.toString()}/${entry?.sitename || entry?.site?.slug}/${makePlural(
          entry?.type,
        )}/${entry?.id}`}
        isOpen={qrcodeModalOpen}
        onClose={() => setQrcodeModalOpen(false)}
      />
    </>
  )
}
// PROPTYPES
const { bool, object, string } = PropTypes
QrcodeButton.propTypes = {
  entry: object,
  buttonStyling: string,
  withLabels: bool,
}

export default QrcodeButton
