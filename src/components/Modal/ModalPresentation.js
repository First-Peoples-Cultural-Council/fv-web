import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Dialog, Transition } from '@headlessui/react'

// FPCC
import getIcon from 'common/utils/getIcon'

function ModalPresentation({ children, isOpen, closeHandler, isDashboard }) {
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        static
        className="fixed z-10 inset-0 overflow-y-auto"
        open={isOpen}
        onClose={closeHandler}
      >
        <div className="items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center block p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to 'trick' the browser into centering the modal contents. */}
          <span
            className="inline-block align-middle h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 translate-y-0 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-4 translate-y-0 scale-95"
          >
            <div
              className={` ${
                isDashboard ? 'w-3/4-screen' : 'mt-24'
              } relative inline-block transform transition-all align-middle`}
            >
              {children}
              <button
                type="button"
                className="absolute -top-7 right-0 sm:-right-7 text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-400"
                onClick={closeHandler}
              >
                {getIcon('Close', 'fill-current h-7 w-7')}
              </button>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
// PROPTYPES
const { bool, func, node } = PropTypes
ModalPresentation.propTypes = {
  children: node,
  isOpen: bool,
  closeHandler: func,
  isDashboard: bool,
}

ModalPresentation.defaultProps = {
  isOpen: false,
  isDashboard: false,
}

export default ModalPresentation
