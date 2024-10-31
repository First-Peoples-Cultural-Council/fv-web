import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'

// FPCC
import ImmersionToggle from 'components/ImmersionToggle'
import { IMMERSION } from 'common/constants'

function UserMenuPresentation({ currentUser, site, login, logout }) {
  const hasImmersion =
    typeof site?.checkForEnabledFeature === 'function'
      ? site?.checkForEnabledFeature(IMMERSION)
      : false

  const menuItemActiveClass = 'bg-charcoal-100 text-black rounded ring-black'
  const menuItemInactiveClass = 'text-charcoal-900'
  const menuItemBaseClass =
    'px-2 py-1 w-full text-lg whitespace-nowrap font-medium'

  return (
    <div id="NavUser" className="relative inline-flex">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex max-w-xs p-3 bg-scarlet-800 hover:bg-scarlet-900 text-white text-xl rounded-full h-12 w-12 items-center justify-center">
            {currentUser?.isAnonymous ? (
              <span className="text-xs">GUEST</span>
            ) : (
              currentUser?.userInitials
            )}
          </Menu.Button>
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
          <Menu.Items className="absolute top-14 right-0 w-72 p-2 space-y-2 transform lg:-translate-x-0 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <Menu.Item className="text-charcoal-900 px-2 py-1 w-full text-lg whitespace-nowrap font-medium border-b-2 border-charcoal-100">
              <div>
                Welcome
                {currentUser?.displayName && !currentUser?.isAnonymous
                  ? `, ${currentUser?.displayName}!`
                  : '!'}
              </div>
            </Menu.Item>
            {currentUser?.isTeam && (
              <Menu.Item className="w-full flex">
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
              </Menu.Item>
            )}
            {hasImmersion && (
              <Menu.Item className="w-full flex">
                {({ active }) => (
                  <div
                    className={`${
                      active ? menuItemActiveClass : menuItemInactiveClass
                    } ${menuItemBaseClass} flex`}
                  >
                    <ImmersionToggle site={site} />
                  </div>
                )}
              </Menu.Item>
            )}
            <Menu.Item className="w-full flex">
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
            </Menu.Item>
            {currentUser?.isAnonymous ? (
              <Menu.Item className="w-full flex border-t-2">
                {({ active }) => (
                  <button type="button" onClick={login} onKeyDown={login}>
                    <div
                      className={`${
                        active ? menuItemActiveClass : menuItemInactiveClass
                      } ${menuItemBaseClass} flex justify-start`}
                    >
                      Sign In / Register
                    </div>
                  </button>
                )}
              </Menu.Item>
            ) : (
              <Menu.Item className="w-full flex border-t-2">
                {({ active }) => (
                  <button type="button" onClick={logout} onKeyDown={logout}>
                    <div
                      className={`${
                        active ? menuItemActiveClass : menuItemInactiveClass
                      } ${menuItemBaseClass} flex justify-start`}
                    >
                      Sign out
                    </div>
                  </button>
                )}
              </Menu.Item>
            )}
          </Menu.Items>
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
