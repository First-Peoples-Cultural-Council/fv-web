import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Transition } from '@headlessui/react'

// FPCC
import getIcon from 'common/utils/getIcon'
import { LOGIN_PATH } from 'common/constants'
import { useUserStore } from 'context/UserContext'

function NavBarPresentationMobile({ menuData, sitename }) {
  const { user } = useUserStore()
  const [selectedSubMenu, setSelectedSubMenu] = useState({})
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)
  const isGuest = user?.username === 'Guest' || !user?.username

  const onMenuClick = (event, menuObject) => {
    event.stopPropagation()
    event.preventDefault()
    setSelectedSubMenu(menuObject)
    setIsSubMenuOpen(!isSubMenuOpen)
  }

  function generateMenuItem(menuItem) {
    const hasItems = menuItem?.itemsData?.length > 0
    return (
      <li key={`${menuItem.title}_id`}>
        {hasItems ? (
          <button
            type="button"
            onClick={(e) => {
              onMenuClick(e, menuItem)
            }}
            className="w-full my-3 p-1 flex items-center rounded"
          >
            {getIcon(menuItem.title, 'fill-current h-12 w-8')}
            <span className="ml-3 font-medium">{menuItem.title}</span>
            {getIcon('ChevronRight', 'absolute right-3 fill-current w-10')}
          </button>
        ) : (
          <Link
            className="w-full my-3 p-1 flex items-center rounded"
            to={`/${sitename + menuItem?.href}`}
          >
            {getIcon(menuItem.title, 'fill-current h-12 w-8')}{' '}
            <span className="ml-3 font-medium">{menuItem.title}</span>
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
        <div className="shadow-lg min-h-screen bg-white">
          <ul className="grid grid-rows-3 divide-y-2 divide-gray-200 bg-white p-2">
            {!isGuest && (
              <li className="w-full my-3 p-1 flex items-center rounded ml-3 font-medium">
                Welcome
                {user?.firstName && user?.firstName !== 'Guest'
                  ? `, ${user?.firstName}!`
                  : '!'}
              </li>
            )}
            {menuData?.dictionary && generateMenuItem(menuData?.dictionary)}
            {menuData?.learn && generateMenuItem(menuData?.learn)}
            {menuData?.resources && generateMenuItem(menuData?.resources)}
            {menuData?.about && generateMenuItem(menuData?.about)}
            {menuData?.kids && generateMenuItem(menuData?.kids)}
            {isGuest ? (
              <li key="SignIn_id">
                <a
                  href={LOGIN_PATH}
                  className="w-full my-3 p-1 flex items-center rounded"
                >
                  {getIcon('Login', 'fill-current h-12 w-8')}
                  <span className="ml-3 font-medium">Sign in / Register</span>
                </a>
              </li>
            ) : (
              <li key="SignOut_id">
                <a
                  href={LOGIN_PATH}
                  className="w-full my-3 p-1 flex items-center rounded"
                >
                  {getIcon('LogOut', 'fill-current h-12 w-8')}
                  <span className="ml-3 font-medium">Sign Out</span>
                </a>
              </li>
            )}
          </ul>
        </div>
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
            <li key="BackButton_id">
              <a
                type="button"
                onClick={() => setIsSubMenuOpen(false)}
                className="w-full m-3 p-1 flex items-center focus:outline-none"
              >
                {getIcon('ChevronLeft', 'fill-current h-12 w-8')}
                <span className="ml-3 font-medium">Back</span>
              </a>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  )
}
// PROPTYPES
const { object, string } = PropTypes
NavBarPresentationMobile.propTypes = {
  menuData: object,
  sitename: string,
}

export default NavBarPresentationMobile
