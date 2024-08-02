import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Menu, Transition } from '@headlessui/react'

// FPCC
import getIcon from 'common/utils/getIcon'
import { Copy, ShareButton, QrcodeButton } from 'components/Actions'
import { makePlural } from 'common/utils/urlHelpers'

function ActionsMenuPresentation({
  entry,
  sitename,
  siteVisibility,
  actions = [],
  moreActions = [],
  iconStyling = 'h-8 w-8 md:h-6 md:w-6',
  withLabels,
  withConfirmation,
  withTooltip,
}) {
  return (
    <div id="ActionsMenuPresentation" className="inline-flex print:hidden">
      {/* Pinned Action Buttons */}
      {actions.includes('copy') ? (
        <Copy
          docId={entry?.id}
          docTitle={entry?.title}
          iconStyling={iconStyling}
          withLabels={withLabels}
          withConfirmation={withConfirmation}
          withTooltip={withTooltip}
          hoverTooltip
        />
      ) : null}
      {/* More Menu button and Action items */}
      {moreActions.length > 0 ? (
        <Menu as="div" className="relative inline-flex text-left">
          {({ open }) => (
            <>
              <Menu.Button
                id="More"
                aria-label="More Options"
                className="ml-2 pl-2 relative inline-flex items-center text-sm font-medium text-fv-charcoal hover:text-black border-l border-gray-300"
              >
                {getIcon('More', `fill-current ${iconStyling}`)}
                {withLabels ? <span className="mx-2">MORE</span> : null}
              </Menu.Button>

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
                <Menu.Items
                  static
                  className="z-10 origin-top-right absolute top-5 right-0 mt-2 w-40 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                >
                  <div className="py-1">
                    {moreActions.includes('share') && (
                      <ShareButton
                        withLabels
                        entry={entry}
                        sitename={sitename}
                        iconStyling={iconStyling}
                        siteVisibility={siteVisibility}
                      />
                    )}
                    {moreActions.includes('qrcode') && (
                      <QrcodeButton
                        withLabels
                        iconStyling={iconStyling}
                        entry={entry}
                        url={`${window.location.origin.toString()}/${sitename}/${makePlural(
                          entry?.type,
                        )}/${entry?.id}`}
                      />
                    )}
                  </div>
                </Menu.Items>
              </Transition>
            </>
          )}
        </Menu>
      ) : null}
    </div>
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
  iconStyling: string,
  withLabels: bool,
  withConfirmation: bool,
  withTooltip: bool,
}

export default ActionsMenuPresentation
