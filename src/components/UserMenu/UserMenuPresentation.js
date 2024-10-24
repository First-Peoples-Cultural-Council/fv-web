import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from '@headlessui/react'

// FPCC
import ImmersionToggle from 'components/ImmersionToggle'
import { IMMERSION } from 'common/constants'

function UserMenuPresentation({ currentUser, site, login, logout }) {
  const hasImmersion =
    typeof site?.checkForEnabledFeature === 'function'
      ? site?.checkForEnabledFeature(IMMERSION)
      : false

  const menuItemActiveClass = 'bg-gray-200 text-black rounded ring-black'
  const menuItemInactiveClass = 'text-fv-charcoal'
  const menuItemBaseClass =
    'px-2 py-1 w-full text-lg whitespace-nowrap font-medium'

  return (
    <div id="NavUser" className="relative inline-flex">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <MenuButton className="flex max-w-xs p-3 bg-secondary hover:bg-secondary-dark text-white text-xl rounded-full h-12 w-12 items-center justify-center">
            {currentUser?.isAnonymous ? (
              <span className="text-xs">GUEST</span>
            ) : (
              currentUser?.userInitials
            )}
          </MenuButton>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-300"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute top-14 right-0 w-72 p-2 space-y-2 transform lg:-translate-x-0 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <MenuItem className="text-fv-charcoal px-2 py-1 w-full text-lg whitespace-nowrap font-medium border-b-2 border-gray-200">
              <div>
                Welcome
                {currentUser?.displayName && !currentUser?.isAnonymous
                  ? `, ${currentUser?.displayName}!`
                  : '!'}
              </div>
            </MenuItem>
            {currentUser?.isTeam && (
              <MenuItem className="w-full flex">
                {({ active }) => (
                  <Link to={currentUser?.dashboardLink}>
                    <div
                      className={`${
                        active ? menuItemActiveClass : menuItemInactiveClass
                      } ${menuItemBaseClass}`}
                    >
                      Dashboard
                    </div>
                  </Link>
                )}
              </MenuItem>
            )}
            {hasImmersion && (
              <MenuItem className="w-full flex">
                {({ active }) => (
                  <div
                    className={`${
                      active ? menuItemActiveClass : menuItemInactiveClass
                    } ${menuItemBaseClass} flex`}
                  >
                    <ImmersionToggle site={site} />
                  </div>
                )}
              </MenuItem>
            )}
            <MenuItem className="w-full flex">
              {({ active }) => (
                <Link to="/support">
                  <div
                    className={`${
                      active ? menuItemActiveClass : menuItemInactiveClass
                    } ${menuItemBaseClass}`}
                  >
                    Support
                  </div>
                </Link>
              )}
            </MenuItem>
            {currentUser?.isAnonymous ? (
              <MenuItem className="w-full flex border-t-2">
                {({ active }) => (
                  <button
                    data-testid="login-btn"
                    type="button"
                    onClick={login}
                    onKeyDown={login}
                  >
                    <div
                      className={`${
                        active ? menuItemActiveClass : menuItemInactiveClass
                      } ${menuItemBaseClass} flex justify-start`}
                    >
                      Sign In / Register
                    </div>
                  </button>
                )}
              </MenuItem>
            ) : (
              <MenuItem className="w-full flex border-t-2">
                {({ active }) => (
                  <button
                    data-testid="logout-btn"
                    type="button"
                    onClick={logout}
                    onKeyDown={logout}
                  >
                    <div
                      className={`${
                        active ? menuItemActiveClass : menuItemInactiveClass
                      } ${menuItemBaseClass} flex justify-start`}
                    >
                      Sign out
                    </div>
                  </button>
                )}
              </MenuItem>
            )}
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}
// PROPTYPES
const { object, func } = PropTypes
UserMenuPresentation.propTypes = {
  currentUser: object,
  site: object,
  login: func,
  logout: func,
}

export default UserMenuPresentation
