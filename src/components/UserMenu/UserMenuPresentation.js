import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'

// FPCC
import ImmersionToggle from 'components/ImmersionToggle'
import { IMMERSION } from 'common/constants'

function UserMenuPresentation({ currentUser, site, login, logout }) {
  const hasImmersion =
    typeof site?.checkForEnabledFeature === 'function'
      ? site?.checkForEnabledFeature(IMMERSION)
      : false

  const menuItemStyling =
    'w-full flex hover:bg-charcoal-100 text-charcoal-900 rounded-sm ring-black p-2 w-full text-lg text-left whitespace-nowrap font-medium'

  return (
    <div id="NavUser" className="relative inline-flex">
      <Popover as="div" className="relative inline-block text-left">
        <PopoverButton className="flex max-w-xs p-3 bg-scarlet-800 hover:bg-scarlet-900 text-white text-xl rounded-full h-12 w-12 items-center justify-center">
          {currentUser?.isAnonymous ? (
            <span className="text-xs">GUEST</span>
          ) : (
            currentUser?.userInitials
          )}
        </PopoverButton>

        <PopoverPanel
          transition
          className="absolute top-14 right-0 w-72 p-2 transform lg:-translate-x-0 bg-white rounded-lg shadow-lg ring-1 ring-charcoal-200"
        >
          <div className="w-full flex text-charcoal-900 p-2 text-lg text-left whitespace-nowrap font-medium">
            Welcome
            {currentUser?.displayName && !currentUser?.isAnonymous
              ? `, ${currentUser?.displayName}!`
              : '!'}
          </div>
          <div className="py-1 border-y-2 border-charcoal-100">
            {currentUser?.isTeam && (
              <Link to={currentUser?.dashboardLink} className={menuItemStyling}>
                Dashboard
              </Link>
            )}
            {hasImmersion && (
              <div className={menuItemStyling}>
                <ImmersionToggle site={site} />
              </div>
            )}

            <Link to="/support" className={menuItemStyling}>
              Support
            </Link>
          </div>
          <div className="mt-1">
            {currentUser?.isAnonymous ? (
              <button
                data-testid="login-btn"
                type="button"
                onClick={login}
                onKeyDown={login}
                className={menuItemStyling}
              >
                Sign In / Register
              </button>
            ) : (
              <button
                data-testid="logout-btn"
                type="button"
                onClick={logout}
                onKeyDown={logout}
                className={menuItemStyling}
              >
                Sign out
              </button>
            )}
          </div>
        </PopoverPanel>
      </Popover>
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
