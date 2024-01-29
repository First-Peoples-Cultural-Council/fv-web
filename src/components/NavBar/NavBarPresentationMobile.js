import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Transition } from '@headlessui/react'

// FPCC
import getIcon from 'common/utils/getIcon'
import { useUserStore } from 'context/UserContext'
import useLoginLogout from 'common/hooks/useLoginLogout'
import { isMember } from 'common/utils/membershipHelpers'
import { useTranslation } from 'react-i18next'

function NavBarPresentationMobile({ site }) {
  const { user } = useUserStore()
  const [selectedSubMenu, setSelectedSubMenu] = useState({})
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
  const isGuest = user.isAnonymous
  const { login, logout } = useLoginLogout()
  const [t] = useTranslation()

  const onMenuClick = (event, menuObject) => {
    event.stopPropagation()
    event.preventDefault()
    setSelectedSubMenu(menuObject)
    setIsSubMenuOpen(!isSubMenuOpen)
  }

  const menuData = site?.menu || {}
  const member = isMember({ user, sitename: site.sitename })

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
            className="w-full my-2 p-1 flex items-center rounded"
          >
            {getIcon(menuItem.title, 'fill-current h-12 w-8')}
            <span className="ml-3 font-medium">
              {menuItem.transKey ? t(menuItem.transKey) : menuItem.title}
            </span>
            {getIcon('ChevronRight', 'absolute right-3 fill-current w-10')}
          </button>
        ) : (
          <Link
            data-testid={`${menuItem.title}-link`}
            className="w-full my-2 p-1 flex items-center rounded"
            to={`/${site.sitename + menuItem.href}`}
          >
            {getIcon(menuItem.title, 'fill-current h-12 w-8')}{' '}
            <span className="ml-3 font-medium">
              {menuItem.transKey ? t(menuItem.transKey) : menuItem.title}
            </span>
          </Link>
        )}
      </li>
    )
  }

  return (
    <div className="min-h-screen bg-white text-fv-charcoal">
      <Transition
        show={!isSubMenuOpen}
        enter="transform transition ease-in-out duration-500"
        enterFrom="-translate-x-full"
        enterTo="-translate-x-0"
      >
        <ul className="divide-y-2 divide-gray-200 bg-white p-2 overflow-y-auto">
          {!isGuest && (
            <li className="w-full my-1 p-1 flex items-center rounded ml-3 font-medium">
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
                className="w-full my-3 p-1 flex items-center rounded"
                type="button"
                onClick={login}
                onKeyDown={login}
              >
                {getIcon('Login', 'fill-current h-12 w-8')}
                <span className="ml-3 font-medium">Sign in / Register</span>
              </button>
            </li>
          ) : (
            <>
              {!member && (
                <li>
                  <Link
                    data-testid="join-link"
                    className="w-full my-3 p-1 flex items-center rounded"
                    to={`/${site?.sitename}/join`}
                  >
                    {getIcon('Members', 'fill-current h-12 w-8')}{' '}
                    <span className="ml-3 font-medium">{`Join ${site?.title}`}</span>
                  </Link>
                </li>
              )}
              <li key="SignOut_id">
                <button
                  data-testid="logout-button"
                  className="w-full my-3 p-1 flex items-center rounded"
                  type="button"
                  onClick={logout}
                  onKeyDown={logout}
                >
                  {getIcon('LogOut', 'fill-current h-12 w-8')}
                  <span className="ml-3 font-medium">Sign Out</span>
                </button>
              </li>
            </>
          )}
        </ul>
      </Transition>
      <Transition
        show={isSubMenuOpen}
        enter="transform transition ease-in-out duration-500"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-500"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="shadow-lg min-h-screen bg-white">
          <ul className="grid grid-rows-3 divide-y-2 divide-gray-200 bg-white p-2">
            {selectedSubMenu?.itemsData?.length > 0
              ? selectedSubMenu?.itemsData.map((item) => generateMenuItem(item))
              : null}
            <li>
              <button
                data-testid="close-button"
                type="button"
                onClick={() => setIsSubMenuOpen(false)}
                onKeyDown={() => setIsSubMenuOpen(false)}
                className="w-full m-3 p-1 flex items-center focus:outline-none"
              >
                {getIcon('ChevronLeft', 'fill-current h-12 w-8')}
                <span className="ml-3 font-medium">Back</span>
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
