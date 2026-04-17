import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'

// FPCC
import getIcon from 'common/utils/getIcon'
import { CopyButton, ShareModal, QrcodeModal } from 'components/Actions'
import { makePlural } from 'common/utils/urlHelpers'

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
      <CopyButton textToCopy={entry?.title} withLabels={withLabels} />

      {/* More Menu button and Action items */}
      {moreActions.length > 0 ? (
        <Menu as="div" className="relative inline-flex text-left">
          <MenuButton
            id="More"
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
            <div className="py-1">
              {moreActions.includes('share') && (
                <MenuItem>
                  <button
                    type="button"
                    data-testid="share-btn"
                    className="btn-tertiary btn-md data-focus:bg-blumine-100 justify-start"
                    onClick={() => setShareModalOpen(true)}
                  >
                    {getIcon('WebShare')}
                    <span>Share</span>
                  </button>
                </MenuItem>
              )}
              {moreActions.includes('qrcode') && (
                <MenuItem>
                  <button
                    data-testid="QrcodeButton"
                    type="button"
                    id="QrcodeButton"
                    className="btn-tertiary btn-md data-focus:bg-blumine-100 justify-start"
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
        url={`${window.location.origin.toString()}/${entry?.site?.slug}/${makePlural(
          entry?.type,
        )}/${entry?.id}`}
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
