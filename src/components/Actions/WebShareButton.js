import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import { makePlural } from 'common/utils/urlHelpers'

function WebShareButton({
  entry,
  buttonStyling = 'btn-tertiary btn-sm',
  withLabels = false,
}) {
  // Displays on browsers with Web share only - most modern mobile device browsers
  return (
    navigator?.share && (
      <button
        type="button"
        data-testid="share-btn"
        className={buttonStyling}
        onClick={() =>
          navigator.share({
            title: entry?.title,
            url: `${window.location.origin.toString()}/${entry?.site?.slug}/${makePlural(
              entry?.type,
            )}/${entry?.id}`,
          })
        }
      >
        {getIcon('WebShare')}
        {withLabels ? <span>Share</span> : null}
      </button>
    )
  )
}
// PROPTYPES
const { bool, object, string } = PropTypes
WebShareButton.propTypes = {
  entry: object,
  buttonStyling: string,
  withLabels: bool,
}

export default WebShareButton
