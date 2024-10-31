import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Dialog, DialogPanel } from '@headlessui/react'
import getIcon from 'common/utils/getIcon'

function DrawerPresentation({
  children,
  isOpen = false,
  closeHandler,
  maxWidth = 'max-w-xl xl:max-w-2xl',
  fullScreenPath,
}) {
  return (
    <Dialog open={isOpen} onClose={closeHandler} className="relative z-10">
      <div className="fixed inset-0" />

      <div
        data-testid="DrawerPresentation"
        className="fixed inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className={`pointer-events-auto w-screen ${maxWidth} transform transition duration-100 sm:duration-200 ease-in-out data-[closed]:translate-x-full`}
            >
              <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll touch-auto">
                <div className="flex justify-end items-center mt-12 mr-2 space-x-2">
                  {fullScreenPath && (
                    <Link
                      data-testid="full-screen-link"
                      className="text-charcoal-500 hover:text-charcoal-900"
                      to={fullScreenPath}
                    >
                      <span className="sr-only">Full screen</span>
                      {getIcon('Fullscreen', 'fill-current h-5 w-5')}
                    </Link>
                  )}
                  <button
                    type="button"
                    id="CloseDrawerBtn"
                    data-testid="close-drawer-btn"
                    className="text-charcoal-500 hover:text-charcoal-500"
                    onClick={closeHandler}
                  >
                    <span className="sr-only">Close panel</span>
                    {getIcon('Close', 'fill-current h-7 w-7')}
                  </button>
                </div>
                {children}
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  )
}
// PROPTYPES
const { bool, func, node, string } = PropTypes
DrawerPresentation.propTypes = {
  children: node,
  isOpen: bool,
  closeHandler: func,
  fullScreenPath: string,
  maxWidth: string,
}

export default DrawerPresentation
