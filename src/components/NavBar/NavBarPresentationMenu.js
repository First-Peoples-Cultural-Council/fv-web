import React, { Fragment } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
  Menu,
  MenuItem,
  MenuItems,
  MenuButton,
  Transition,
} from '@headlessui/react'

// FPCC
import getIcon from 'common/utils/getIcon'

function NavBarPresentationMenu({ menuItemData, sitename }) {
  const { href, title, itemsData, transKey } = menuItemData
  const [t, i18n] = useTranslation()
  const hasItems = itemsData?.length > 0
  const generateMenuItems = (items) =>
    items.map((menuItem) => (
      <MenuItem key={`HeaderMenu_${menuItem.title}`}>
        {({ focus }) => (
          <Link
            to={`/${sitename + menuItem.href}`}
            className={`${
              focus ? 'bg-charcoal-100 text-black' : 'text-charcoal-900'
            } flex w-full rounded-lg`}
          >
            <div className="px-2 py-1 w-full text-lg font-medium">
              {menuItem.transKey ? t(menuItem.transKey) : menuItem.title}
            </div>
          </Link>
        )}
      </MenuItem>
    ))

  const generateButtonContents = () => (
    <>
      {getIcon(title, 'fill-current h-6 xl:h-8 w-auto flex-none')}
      <p className="group relative truncate ml-1 xl:ml-2">
        {transKey ? t(transKey) : title}
      </p>
      {i18n?.language !== 'en' && (
        // Tooltip
        <span className="absolute top-16 scale-0 group-hover:scale-100 rounded-sm text-charcoal-900 p-2 text-sm bg-white">
          {transKey ? t(transKey) : title}
        </span>
      )}
      {getIcon(
        hasItems ? 'ChevronDown' : 'Placeholder',
        'fill-current h-6 xl:h-8 flex-none',
      )}
    </>
  )

  const buttonStyling =
    'h-8 xl:h-10 group p-1 rounded-lg inline-flex w-full justify-center items-center text-base xl:text-lg font-medium text-white hover:text-charcoal-50'

  return hasItems ? (
    <Menu
      data-testid="NavBar-Menu"
      as="div"
      className="relative inline-block w-40 xl:w-44"
    >
      <div>
        <MenuButton
          data-testid={`${transKey}-button`}
          className={buttonStyling}
        >
          {generateButtonContents()}
        </MenuButton>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute top-10 w-auto min-w-full right-0 p-2 transform lg:-translate-x-0 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-hidden">
          <div className="bg-white space-y-2">
            {generateMenuItems(itemsData)}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  ) : (
    <div
      data-testid="NavBar-link"
      className="relative inline-block w-40 xl:w-44"
    >
      <Link
        data-testid={`${transKey}-button`}
        to={`/${sitename + href}`}
        className={buttonStyling}
      >
        {generateButtonContents()}
      </Link>
    </div>
  )
}

// PROPTYPES
const { object, string } = PropTypes
NavBarPresentationMenu.propTypes = {
  menuItemData: object,
  sitename: string,
}

export default NavBarPresentationMenu
