import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

// FPCC
import getIcon from 'common/utils/getIcon'
import {
  CopyButton,
  ShareModal,
  QrcodeModal,
  WebShareButton,
} from 'components/Actions'

function ActionsMenuPresentation({
  entry,
  moreActions = ['share', 'qrcode'],
  withLabels,
}) {
  const [qrcodeModalOpen, setQrcodeModalOpen] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)

  return (
    <div
      id="ActionsMenuPresentation"
      className="inline-flex items-center print:hidden space-x-2"
    >
      {/* Pinned Action Buttons */}
      <CopyButton
        textToCopy={entry?.title}
        withLabels={withLabels}
        buttonStyling={`btn-tertiary ${withLabels ? ' btn-sm min-w-0' : 'btn-md-icon'}`}
      />

      {/* More Menu button and Action items */}
      {moreActions.length > 0 ? (
        <Menu as="div" className="relative inline-flex text-left">
          <MenuButton
            id="More"
            data-testid="more-menu-btn"
            aria-label="More Options"
            className="relative btn-tertiary btn-md-icon"
          >
            {getIcon('More')}
          </MenuButton>

          <MenuItems
            transition
            anchor="bottom end"
            className="z-10 origin-top-right transition duration-300 ease-in-out data-closed:opacity-0 data-closed:scale-95 absolute top-10 right-0 w-40 rounded-lg shadow-lg bg-white ring-1 ring-black/50 focus:outline-hidden"
          >
            <div className="py-2 space-y-1">
              {moreActions.includes('share') && (
                <MenuItem>
                  <WebShareButton
                    buttonStyling="btn-tertiary btn-md data-focus:bg-blumine-100 justify-start rounded-none"
                    fallBackOnClick={() => setShareModalOpen(true)}
                    entry={entry}
                    withLabels={withLabels}
                  />
                </MenuItem>
              )}
              {moreActions.includes('qrcode') && (
                <MenuItem>
                  <button
                    data-testid="qrcode-btn"
                    type="button"
                    id="QrcodeButton"
                    className="btn-tertiary btn-md data-focus:bg-blumine-100 justify-start rounded-none"
                    onClick={() => setQrcodeModalOpen(true)}
                  >
                    {getIcon('Qrcode')}
                    <span>QR code</span>
                  </button>
                </MenuItem>
              )}
            </div>
          </MenuItems>
        </Menu>
      ) : null}
      <ShareModal
        entry={entry}
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
      <QrcodeModal
        entry={entry}
        isOpen={qrcodeModalOpen}
        onClose={() => setQrcodeModalOpen(false)}
      />
    </div>
  )
}
// PROPTYPES
const { array, bool, object } = PropTypes
ActionsMenuPresentation.propTypes = {
  entry: object,
  moreActions: array,
  withLabels: bool,
}

export default ActionsMenuPresentation
