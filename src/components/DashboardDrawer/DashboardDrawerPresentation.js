import React from 'react'
import PropTypes from 'prop-types'
import { Dialog, DialogPanel } from '@headlessui/react'
import getIcon from 'common/utils/getIcon'

function DashboardDrawerPresentation({
  children,
  isOpen = false,
  closeHandler,
}) {
  return (
    <Dialog open={isOpen} onClose={closeHandler} className="relative z-10">
      <div className="fixed inset-0" />
      <div
        data-testid="DashboardDrawerPresentation"
        className="fixed inset-0 overflow-hidden"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-xl xl:max-w-2xl transform transition duration-100 sm:duration-200 ease-in-out data-closed:translate-x-full"
            >
              <div className="h-full flex flex-col py-2 bg-white shadow-xl overflow-y-scroll touch-auto">
                <div className="flex justify-end items-center mr-2">
                  <button
                    type="button"
                    id="CloseDrawerBtn"
                    data-testid="close-drawer-btn"
                    className="btn-tertiary btn-md-icon"
                    onClick={closeHandler}
                  >
                    <span className="sr-only">Close panel</span>
                    {getIcon('Close')}
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
const { bool, func, node } = PropTypes
DashboardDrawerPresentation.propTypes = {
  children: node,
  isOpen: bool,
  closeHandler: func,
}

export default DashboardDrawerPresentation
