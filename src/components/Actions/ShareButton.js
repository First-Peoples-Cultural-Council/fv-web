import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import Tooltip from 'components/Tooltip'
import ShareModal from 'components/Actions/ShareModal'
import WebShareButton from 'components/Actions/WebShareButton'

// NB: IMPORTANT! This modal button combo CANNOT be used inside a modal or other headlessui menus
function ShareButton({
  entry,
  buttonStyling = 'btn-tertiary btn-sm',
  withLabels = false,
}) {
  const [shareModalOpen, setShareModalOpen] = useState(false)

  return (
    <>
      <Tooltip hide={withLabels} message="Share">
        <WebShareButton
          buttonStyling={buttonStyling}
          fallBackOnClick={() => setShareModalOpen(true)}
          entry={entry}
          withLabels={withLabels}
        />
      </Tooltip>
      <ShareModal
        entry={entry}
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
    </>
  )
}
// PROPTYPES
const { bool, object, string } = PropTypes
ShareButton.propTypes = {
  entry: object,
  buttonStyling: string,
  withLabels: bool,
}

export default ShareButton
