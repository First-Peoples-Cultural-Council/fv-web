import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, Transition } from '@headlessui/react'

// FPCC
import Toggle from 'components/Toggle'
import getIcon from 'common/utils/getIcon'
import { IMMERSION } from 'common/constants'

function UserMenuPresentation({ currentUser, site, login, logout }) {
  const { i18n } = useTranslation()

  const hasImmersion = site?.checkForEnabledFeature(IMMERSION)

  const changeLanguage = (setToLanguage) => {
    if (setToLanguage) {
      i18n.changeLanguage('language')
    } else {
      i18n.changeLanguage('en')
    }
  }

  const menuItemActiveClass = 'bg-gray-200 text-black rounded ring-black'
  const menuItemInactiveClass = 'text-fv-charcoal'
  const menuItemBaseClass =
    'px-2 py-1 w-full text-lg whitespace-nowrap font-medium'

  return (
    <div id="NavUser" className="relative inline-flex">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="flex max-w-xs p-3 bg-secondary hover:bg-secondary-dark text-white text-xl rounded-full h-12 w-12 items-center justify-center">
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
            <Menu.Item className="text-fv-charcoal px-2 py-1 w-full text-lg whitespace-nowrap font-medium border-b-2 border-gray-200">
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
                  <div className="w-full flex justify-between items-center">
                    <div
                      className={`${
                        active ? menuItemActiveClass : menuItemInactiveClass
                      } ${menuItemBaseClass} flex`}
                    >
                      <Toggle
                        accentColor="secondary"
                        toggled={i18n.language === 'language'}
                        toggleCallback={() =>
                          changeLanguage(i18n.language !== 'language')
                        }
                        label="Immersion Mode"
                      />
                      <Link
                        to={`/${site?.sitename}/immersion`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {getIcon(
                          'Question',
                          'fill-current text-secondary ml-3 h-6 w-auto',
                        )}
                      </Link>
                    </div>
                  </div>
                )}
              </Menu.Item>
            )}
            {currentUser?.isAnonymous ? (
              <Menu.Item className="w-full flex">
                {({ active }) => (
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/no-static-element-interactions
                  <a type="button" onClick={login} onKeyDown={login}>
                    <div
                      className={`${
                        active ? menuItemActiveClass : menuItemInactiveClass
                      } ${menuItemBaseClass}`}
                    >
                      Sign In / Register
                    </div>
                  </a>
                )}
              </Menu.Item>
            ) : (
              <Menu.Item className="w-full flex">
                {({ active }) => (
                  // eslint-disable-next-line jsx-a11y/anchor-is-valid, jsx-a11y/no-static-element-interactions
                  <a type="button" onClick={logout} onKeyDown={logout}>
                    <div
                      className={`${
                        active ? menuItemActiveClass : menuItemInactiveClass
                      } ${menuItemBaseClass}`}
                    >
                      Sign out
                    </div>
                  </a>
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
