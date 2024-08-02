import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Dialog, Transition } from '@headlessui/react'
import getIcon from 'common/utils/getIcon'

function DrawerPresentation({
  children,
  isOpen = false,
  closeHandler,
  maxWidth = 'max-w-xl xl:max-w-2xl',
  fullScreenPath,
}) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed inset-0 overflow-hidden"
        open={isOpen}
        onClose={closeHandler}
      >
        <div
          data-testid="DrawerPresentation"
          className="absolute inset-0 overflow-hidden"
        >
          <Dialog.Overlay className="absolute inset-0" />

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-100 sm:duration-200"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-100 sm:duration-200"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className={`w-screen ${maxWidth}`}>
                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll touch-auto">
                  <div className="flex justify-end items-center mt-12 mr-2 space-x-2">
                    {fullScreenPath && (
                      <Link
                        id="FullScreenBtn"
                        className="text-fv-charcoal-light hover:text-fv-charcoal"
                        to={fullScreenPath}
                      >
                        <span className="sr-only">Full screen</span>
                        {getIcon('Fullscreen', 'fill-current h-5 w-5')}
                      </Link>
                    )}
                    <button
                      type="button"
                      id="CloseDrawerBtn"
                      className="text-fv-charcoal-light hover:text-fv-charcoal"
                      onClick={closeHandler}
                    >
                      <span className="sr-only">Close panel</span>
                      {getIcon('Close', 'fill-current h-7 w-7')}
                    </button>
                  </div>
                  {children}
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
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
