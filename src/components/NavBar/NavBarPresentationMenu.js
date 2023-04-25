import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import { Menu, Transition } from '@headlessui/react'

import getIcon from 'common/getIcon'

function NavBarPresentationMenu({ menuItemData, sitename }) {
  const { href, title, itemsData, transKey } = menuItemData
  const [t] = useTranslation()
  const hasItems = itemsData?.length > 0

  const generateMenuItems = (items) =>
    items.map((menuItem) => (
      <Menu.Item key={`HeaderMenu_${menuItem.title}`}>
        {({ active }) => (
          <Link
            to={`/${sitename + menuItem.href}`}
            className={`${
              active ? 'bg-gray-200 text-black' : 'text-fv-charcoal'
            } flex w-full rounded-lg`}
          >
            <div className="px-2 py-1 w-full text-lg whitespace-nowrap font-medium">
              {menuItem.transKey ? t(menuItem.transKey) : menuItem.title}
            </div>
          </Link>
        )}
      </Menu.Item>
    ))

  return hasItems ? (
    <Menu id="NavBarPresentationMenu" as="div" className="relative">
      <Menu.Button>
        <div className="h-8 xl:h-10 group p-1 bg-fv-charcoal rounded-lg  inline-flex items-center text-base xl:text-lg font-medium text-white hover:text-gray-100">
          {getIcon(title, 'fill-current h-full w-auto')}
          <p className="ml-1 xl:ml-3 xl:mr-2">
            {transKey ? t(transKey) : title}
          </p>
          {getIcon('ChevronDown', 'fill-current h-8')}
        </div>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute top-10 w-auto min-w-full right-0 p-2 transform lg:-translate-x-0 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="bg-white space-y-2">
            {generateMenuItems(itemsData)}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  ) : (
    <div id="NavBarPresentationMenu">
      <Link
        to={`/${sitename + href}`}
        className="h-8 xl:h-10 group p-1 bg-fv-charcoal rounded-lg  inline-flex items-center text-base xl:text-lg font-medium text-white hover:text-gray-100"
      >
        {getIcon(title, 'fill-current h-full w-auto')}
        <p className="ml-3">{transKey ? t(transKey) : title}</p>
      </Link>
    </div>
  )
}

// PROPTYPES
const { object, string, func } = PropTypes
NavBarPresentationMenu.propTypes = {
  menuItemData: object,
  onMenuClick: func,
  openMenu: string,
  onClickOutside: func,
  sitename: string,
}
NavBarPresentationMenu.defaultProps = {
  onMenuClick: () => {},
  onClickOutside: () => {},
}

export default NavBarPresentationMenu
