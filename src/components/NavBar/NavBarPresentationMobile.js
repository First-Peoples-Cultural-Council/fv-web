import React, { useState } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next'

// FPCC
import getIcon from 'common/utils/getIcon'
import { useUserStore } from 'context/UserContext'
import useLoginLogout from 'common/hooks/useLoginLogout'
import { atLeastMember } from 'common/constants/roles'
import { isAtLeastRole } from 'common/utils/membershipHelpers'
import { IMMERSION } from 'common/constants'
import ImmersionToggle from 'components/ImmersionToggle'

function NavBarPresentationMobile({ site }) {
  const { user } = useUserStore()
  const [selectedSubMenu, setSelectedSubMenu] = useState({})
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
  const isGuest = user.isAnonymous
  const { login, logout } = useLoginLogout()
  const [t] = useTranslation()

  const hasImmersion =
    typeof site?.checkForEnabledFeature === 'function'
      ? site?.checkForEnabledFeature(IMMERSION)
      : false

  const onMenuClick = (event, menuObject) => {
    event.stopPropagation()
    event.preventDefault()
    setSelectedSubMenu(menuObject)
    setIsSubMenuOpen(!isSubMenuOpen)
  }

  const menuData = site?.menu || {}
  const member = isAtLeastRole({
    user,
    sitename: site.sitename,
    roleRegex: atLeastMember,
  })
  const buttonStyling = 'w-full px-1 py-2 flex items-center rounded'
  const labelStyling = 'truncate ml-3 font-medium'
  const iconStyling = 'fill-current h-12 w-8 flex-none'

  function generateMenuItem(menuItem) {
    const hasItems = menuItem?.itemsData?.length > 0
    return (
      <li key={`${menuItem.title}_id`}>
        {hasItems ? (
          <button
            data-testid={`${menuItem.title}-button`}
            type="button"
            onClick={(e) => {
              onMenuClick(e, menuItem)
            }}
            className={buttonStyling}
          >
            {getIcon(menuItem.title, iconStyling)}
            <span className={labelStyling}>
              {menuItem.transKey ? t(menuItem.transKey) : menuItem.title}
            </span>
            {getIcon('ChevronRight', 'absolute right-3 fill-current w-10')}
          </button>
        ) : (
          <Link
            data-testid={`${menuItem.title}-link`}
            className={buttonStyling}
            to={`/${site.sitename + menuItem.href}`}
          >
            {getIcon(menuItem.title, iconStyling)}{' '}
            <span className={labelStyling}>
              {menuItem.transKey ? t(menuItem.transKey) : menuItem.title}
            </span>
          </Link>
        )}
      </li>
    )
  }

  return (
    <div className="min-h-screen bg-white text-charcoal-900">
      <Transition
        as="div"
        show={!isSubMenuOpen}
        enter="transform transition ease-in-out duration-500"
        enterFrom="-translate-x-full"
        enterTo="-translate-x-0"
      >
        <ul className="divide-y-2 divide-charcoal-100 bg-white p-2 overflow-y-auto">
          {!isGuest && (
            <li className={buttonStyling}>
              Welcome
              {user?.displayName ? `, ${user?.displayName}!` : '!'}
            </li>
          )}
          {menuData?.dictionary && generateMenuItem(menuData?.dictionary)}
          {menuData?.learn && generateMenuItem(menuData?.learn)}
          {menuData?.resources && generateMenuItem(menuData?.resources)}
          {menuData?.about && generateMenuItem(menuData?.about)}
          {menuData?.kids && generateMenuItem(menuData?.kids)}

          {isGuest ? (
            <li>
              <button
                data-testid="login-button"
                className={buttonStyling}
                type="button"
                onClick={login}
                onKeyDown={login}
              >
                {getIcon('Login', iconStyling)}
                <span className={labelStyling}>Sign in / Register</span>
              </button>
            </li>
          ) : (
            <>
              {!member && (
                <li>
                  <Link
                    data-testid="join-link"
                    className={buttonStyling}
                    to={`/${site?.sitename}/join`}
                  >
                    {getIcon('Members', iconStyling)}{' '}
                    <span
                      className={labelStyling}
                    >{`Join ${site?.title}`}</span>
                  </Link>
                </li>
              )}
              <li>
                <button
                  data-testid="logout-button"
                  className={buttonStyling}
                  type="button"
                  onClick={logout}
                  onKeyDown={logout}
                >
                  {getIcon('LogOut', iconStyling)}
                  <span className={labelStyling}>Sign Out</span>
                </button>
              </li>
            </>
          )}
          {hasImmersion && (
            <li>
              <div className={`${buttonStyling} px-2 my-2`}>
                <ImmersionToggle site={site} />
              </div>
            </li>
          )}
        </ul>
      </Transition>
      <Transition
        as="div"
        show={isSubMenuOpen}
        enter="transform transition ease-in-out duration-500"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-500"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="shadow-lg min-h-screen bg-white">
          <ul className="grid grid-rows-3 divide-y-2 divide-charcoal-100 bg-white p-2">
            {selectedSubMenu?.itemsData?.length > 0
              ? selectedSubMenu?.itemsData.map((item) => generateMenuItem(item))
              : null}
            <li>
              <button
                data-testid="close-button"
                type="button"
                onClick={() => setIsSubMenuOpen(false)}
                onKeyDown={() => setIsSubMenuOpen(false)}
                className={buttonStyling}
              >
                {getIcon('ChevronLeft', iconStyling)}
                <span className={labelStyling}>Back</span>
              </button>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  )
}
// PROPTYPES
const { object } = PropTypes
NavBarPresentationMobile.propTypes = {
  site: object.isRequired,
}

export default NavBarPresentationMobile
