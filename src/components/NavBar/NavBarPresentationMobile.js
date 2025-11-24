import React from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { Dialog, DialogPanel } from '@headlessui/react'
import { useTranslation } from 'react-i18next'

// FPCC
import getIcon from 'common/utils/getIcon'
import { useUserStore } from 'context/UserContext'
import useLoginLogout from 'common/hooks/useLoginLogout'
import { atLeastMember } from 'common/constants/roles'
import { isAtLeastRole } from 'common/utils/membershipHelpers'
import { IMMERSION } from 'common/constants'
import ImmersionToggle from 'components/ImmersionToggle'

function NavBarPresentationMobile({ site, open, onClose }) {
  const { user } = useUserStore()
  const isGuest = user.isAnonymous
  const { login, logout } = useLoginLogout()
  const [t] = useTranslation()

  const hasImmersion =
    typeof site?.checkForEnabledFeature === 'function'
      ? site?.checkForEnabledFeature(IMMERSION)
      : false

  const menuData = site?.menu || {}
  const member = isAtLeastRole({
    user,
    sitename: site.sitename,
    roleRegex: atLeastMember,
  })
  const linkStyling =
    'flex gap-x-4 p-4 text-base font-semibold text-blumine-800'

  function generateMenuLink(menuItem) {
    return (
      <Link
        data-testid={`${menuItem?.title}-link`}
        to={`/${site?.sitename + menuItem?.href}`}
        className={linkStyling}
      >
        <span className="truncate">
          {menuItem?.transKey ? t(menuItem?.transKey) : menuItem?.title}
        </span>
      </Link>
    )
  }
  function generateMenuGroup(menuItem) {
    return (
      <div key={`${menuItem?.title}_id`}>
        <h3 className="text-base font-medium text-charcoal-500">
          {menuItem?.transKey ? t(menuItem?.transKey) : menuItem?.title}
        </h3>
        <ul className="mt-3 sm:mt-4 flow-root">
          {menuItem?.itemsData?.map((item) => (
            <li key={item.title}>{generateMenuLink(item)}</li>
          ))}
        </ul>
      </div>
    )
  }
  return (
    <Dialog
      data-testid="NavBarPresentationMobile"
      open={open}
      onClose={onClose}
      className="lg:hidden"
    >
      <DialogPanel
        transition
        className="fixed inset-y-0 right-0 z-20 w-full overflow-y-auto bg-white transition data-closed:-translate-y-1 data-closed:opacity-0 data-enter:duration-200 data-leave:duration-150 data-enter:ease-out data-leave:ease-in"
      >
        <div className="flex h-16 p-2 items-center justify-between bg-charcoal-900">
          <Link
            to={`/${site?.sitename}`}
            className="rounded-lg p-2 inline-flex items-center justify-center text-white hover:text-charcoal-50 focus:ring-2"
          >
            {site?.title}
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
          <div className="mx-auto max-w-7xl grid gap-4 px-6 py-4 divide-y divide-charcoal-400">
            {!isGuest && !member && (
              <div className="flex w-full items-center justify-center -mt-2 pb-2">
                {generateMenuLink({
                  title: `Join ${site?.title}`,
                  href: '/join',
                })}
              </div>
            )}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-2 gap-y-4 pb-4 sm:gap-x-4">
              {menuData?.dictionary && generateMenuGroup(menuData?.dictionary)}
              {menuData?.learn && generateMenuGroup(menuData?.learn)}
              {menuData?.resources && generateMenuGroup(menuData?.resources)}
              {menuData?.about && generateMenuGroup(menuData?.about)}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-2 sm:gap-x-4">
              {menuData?.kids && generateMenuLink(menuData?.kids)}

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
              {hasImmersion && (
                <div className={`${linkStyling} col-span-2 max-w-72`}>
                  <ImmersionToggle site={site} />
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  )
}
// PROPTYPES
const { object, func, bool } = PropTypes
NavBarPresentationMobile.propTypes = {
  open: bool,
  onClose: func,
  site: object.isRequired,
}

export default NavBarPresentationMobile
