import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { Dialog, DialogPanel } from '@headlessui/react'

// FPCC
import getIcon from 'common/utils/getIcon'
import { useUserStore } from 'context/UserContext'
import useLoginLogout from 'common/hooks/useLoginLogout'
import SearchSiteForm from 'components/SearchSiteForm'

function AppNavBarPresentationMobile({ open, onClose }) {
  const { user } = useUserStore()
  const isGuest = user.isAnonymous
  const { login, logout } = useLoginLogout()

  const linkStyling =
    'flex gap-x-4 p-4 text-base font-semibold text-blumine-800'

  function generateMenuLink(menuItem) {
    return (
      <Link
        data-testid={`${menuItem?.title}-link`}
        to={menuItem?.href}
        className={linkStyling}
      >
        <span>{menuItem?.title}</span>
      </Link>
    )
  }

  return (
    <Dialog
      data-testid="AppNavBarPresentationMobile"
      open={open}
      onClose={onClose}
      className="md:hidden"
    >
      <DialogPanel
        transition
        className="fixed inset-y-0 right-0 z-20 w-full overflow-y-auto bg-white transition data-closed:-translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-leave:duration-150 data-enter:ease-out data-leave:ease-in"
      >
        <div className="h-16 flex justify-between items-center py-1 px-2 bg-charcoal-900">
          <Link to="/" className="flex items-center">
            <span className="sr-only">FirstVoices Logo</span>
            {getIcon('FVLogo', 'h-10 w-auto fill-current text-white')}
          </Link>
          <button
            data-testid="close-mobile-nav-btn"
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 inline-flex items-center justify-center text-white hover:text-charcoal-50 focus:ring-2"
          >
            <span className="sr-only">Close menu</span>
            {getIcon('Close', 'size-6')}
          </button>
        </div>
        <div className="relative bg-white">
          <div className="py-4 px-6 mx-auto max-w-lg">
            <SearchSiteForm.Container minimal />
          </div>
          <div className="mx-auto max-w-7xl grid gap-4 px-6 py-4 divide-y divide-charcoal-400">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 pb-4 sm:gap-x-4">
              {generateMenuLink({
                title: 'Explore Languages',
                href: '/languages',
              })}
              {generateMenuLink({
                title: 'About',
                href: '/about',
              })}
              {generateMenuLink({
                title: 'Mobile Apps',
                href: '/apps',
              })}
              {generateMenuLink({
                title: 'Fonts and Keyboards',
                href: '/keyboards',
              })}
              {generateMenuLink({
                title: 'Support',
                href: '/support',
              })}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 sm:gap-x-4">
              {isGuest ? (
                <button
                  data-testid="login-button"
                  className={linkStyling}
                  type="button"
                  onClick={login}
                  onKeyDown={login}
                >
                  <span>Sign in / Register</span>
                </button>
              ) : (
                <button
                  data-testid="logout-button"
                  className={linkStyling}
                  type="button"
                  onClick={logout}
                  onKeyDown={logout}
                >
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  )
}
// PROPTYPES
const { func, bool } = PropTypes
AppNavBarPresentationMobile.propTypes = {
  open: bool,
  onClose: func,
}

export default AppNavBarPresentationMobile
