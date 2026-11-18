import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { getShareContent } from 'common/utils/shareHelpers'
import getIcon from 'common/utils/getIcon'
import { makePlural } from 'common/utils/urlHelpers'

function WebShareButton({
  entry,
  buttonStyling = 'btn-tertiary btn-sm',
  withLabels = false,
  fallBackOnClick = () => {},
}) {
  const handleShareClick = () => {
    // If user's browser has Web share use that - most modern mobile device browsers
    if (navigator?.share) {
      const { title, text } = getShareContent({ entry })
      navigator
        .share({
          title,
          text,
          url: `${globalThis.location.origin.toString()}/${entry?.sitename || entry?.site?.slug}/${makePlural(
            entry?.type,
          )}/${entry?.id}`,
        })
        .catch(() => {})
    } else fallBackOnClick()
  }

  return (
    <button
      type="button"
      data-testid="share-btn"
      className={buttonStyling}
      onClick={() => handleShareClick()}
    >
      {getIcon('WebShare')}
      {withLabels ? <span>Share</span> : null}
    </button>
  )
}
// PROPTYPES
const { bool, func, object, string } = PropTypes
WebShareButton.propTypes = {
  entry: object,
  buttonStyling: string,
  withLabels: bool,
  fallBackOnClick: func,
}

export default WebShareButton
