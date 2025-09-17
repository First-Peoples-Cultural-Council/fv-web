import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'

// FPCC
import getIcon from 'common/utils/getIcon'
import { Copy, ShareModal, QrcodeModal } from 'components/Actions'
import { makePlural } from 'common/utils/urlHelpers'

function ActionsMenuPresentation({
  entry,
  sitename,
  siteVisibility,
  actions = [],
  moreActions = [],
  withLabels,
}) {
  const [qrcodeModalOpen, setQrcodeModalOpen] = useState(false)
  const [shareModalOpen, setShareModalOpen] = useState(false)
  const moreButtonClassName = `relative btn-tertiary ${withLabels ? 'btn-sm' : 'btn-md-icon'}`
  const menuItemIconStyling = 'fill-current h-8 w-8 md:h-6 md:w-6'

  return (
    <>
      <div
        id="ActionsMenuPresentation"
        className="inline-flex items-center print:hidden"
      >
        {/* Pinned Action Buttons */}
        {actions.includes('copy') ? (
          <Copy textToCopy={entry?.title} withLabels={withLabels} />
        ) : null}

        {/* Divider */}
        {moreActions.length > 0 && !withLabels ? (
          <div className="w-px h-9 m-1 bg-charcoal-200" aria-hidden="true" />
        ) : null}

        {/* More Menu button and Action items */}
        {moreActions.length > 0 ? (
          <Menu as="div" className="relative inline-flex text-left">
            {({ open }) => (
              <>
                <MenuButton
                  id="More"
                  aria-label="More Options"
                  className={moreButtonClassName}
                >
                  {getIcon('More')}
                  {withLabels ? <span>MORE</span> : null}
                </MenuButton>

                <Transition
                  show={open}
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems
                    static
                    className="z-10 origin-top-right absolute top-10 right-0 w-40 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-hidden"
                  >
                    <div className="py-1">
                      {moreActions.includes('share') && (
                        <MenuItem>
                          {({ focus }) => (
                            <button
                              type="button"
                              data-testid="share-btn"
                              className={`${
                                focus
                                  ? 'bg-charcoal-50 text-charcoal-900'
                                  : 'text-charcoal-500'
                              } w-full group flex items-center px-4 py-2 text-sm`}
                              onClick={() => setShareModalOpen(true)}
                            >
                              <span className="sr-only">Share</span>
                              {getIcon('WebShare', menuItemIconStyling)}
                              <span className="ml-3">SHARE</span>
                            </button>
                          )}
                        </MenuItem>
                      )}
                      {moreActions.includes('qrcode') && (
                        <MenuItem>
                          {({ focus }) => (
                            <button
                              data-testid="QrcodeButton"
                              type="button"
                              id="QrcodeButton"
                              className={`${
                                focus
                                  ? 'bg-charcoal-50 text-charcoal-900'
                                  : 'text-charcoal-500'
                              } w-full group flex items-center px-4 py-2 text-sm`}
                              onClick={() => setQrcodeModalOpen(true)}
                            >
                              <span className="sr-only">QR Code</span>
                              {getIcon('Qrcode', menuItemIconStyling)}
                              <span className="ml-3">QR CODE</span>
                            </button>
                          )}
                        </MenuItem>
                      )}
                    </div>
                  </MenuItems>
                </Transition>
              </>
            )}
          </Menu>
        ) : null}
      </div>
      <ShareModal
        entry={entry}
        sitename={sitename}
        siteVisibility={siteVisibility}
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
      <QrcodeModal
        entry={entry}
        url={`${window.location.origin.toString()}/${sitename}/${makePlural(
          entry?.type,
        )}/${entry?.id}`}
        isOpen={qrcodeModalOpen}
        onClose={() => setQrcodeModalOpen(false)}
      />
    </>
  )
}
// PROPTYPES
const { array, bool, object, string } = PropTypes
ActionsMenuPresentation.propTypes = {
  entry: object,
  sitename: string,
  siteVisibility: string,
  actions: array,
  moreActions: array,
  withLabels: bool,
  withTooltip: bool,
}

export default ActionsMenuPresentation
