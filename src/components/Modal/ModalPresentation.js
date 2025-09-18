import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'

// FPCC
import getIcon from 'common/utils/getIcon'

function ModalPresentation({
  children,
  isOpen = false,
  closeHandler,
  isDashboard = false,
}) {
  return (
    <Dialog open={isOpen} onClose={closeHandler} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-charcoal-700/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-leave:duration-200 data-enter:ease-out data-leave:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-leave:duration-200 data-enter:ease-out data-leave:ease-in sm:data-closed:translate-y-0 sm:data-closed:scale-95"
          >
            <div
              className={` ${
                isDashboard ? 'w-3/4-screen mt-8' : 'mt-24'
              } relative inline-block transform transition-all`}
            >
              {children}
              <button
                data-testid="close-modal-btn"
                type="button"
                className="absolute -top-7 right-0 sm:-right-7 text-charcoal-200 hover:text-white focus:outline-hidden focus:ring-2 focus:ring-inset focus:ring-charcoal-300"
                onClick={closeHandler}
              >
                {getIcon('Close', 'fill-current h-7 w-7')}
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
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

export default ModalPresentation
