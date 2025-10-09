import React, { Fragment } from 'react'
import { Link } from 'react-router'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import {
  Popover,
  PopoverPanel,
  PopoverButton,
  CloseButton,
} from '@headlessui/react'

// FPCC
import getIcon from 'common/utils/getIcon'

function NavBarPresentationMenu({ menuItemData, sitename }) {
  const { href, title, itemsData, transKey } = menuItemData
  const [t, i18n] = useTranslation()
  const hasItems = itemsData?.length > 0

  const generateButtonContents = () => (
    <>
      {getIcon(title, 'fill-current h-6 xl:h-8 w-auto flex-none')}
      <p className="group relative truncate ml-1 xl:ml-2">
        {transKey ? t(transKey) : title}
      </p>
      {i18n?.language !== 'en' && (
        // Tooltip
        <span className="absolute top-12 scale-0 group-hover:scale-100 rounded-sm text-charcoal-900 p-2 text-sm bg-white">
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
    'h-8 xl:h-10 w-40 xl:w-44 group p-1 rounded-lg inline-flex w-full justify-center items-center text-base xl:text-lg font-medium text-white hover:text-charcoal-50'

  return hasItems ? (
    <Popover
      data-testid="NavBar-Menu"
      as="div"
      className="relative inline-block"
    >
      <PopoverButton
        data-testid={`${transKey}-button`}
        className={buttonStyling}
      >
        {generateButtonContents()}
      </PopoverButton>

      <PopoverPanel
        transition
        className="absolute top-12 w-auto min-w-full right-0 p-2 transition duration-100 ease-out transform lg:-translate-x-0 bg-white rounded-lg shadow-lg ring-1 ring-charcoal-800 focus:outline-hidden"
      >
        <div className="bg-white space-y-2">
          {/* Using CloseButton to ensure menu closes when menuItem is clicked https://headlessui.com/react/popover#closing-popovers-manually */}
          {itemsData?.map((menuItem) => (
            <CloseButton
              as={Link}
              key={`HeaderMenu_${menuItem.title}`}
              to={`/${sitename + menuItem.href}`}
              className="hover:bg-charcoal-100 text-charcoal-900 flex w-full rounded-lg"
            >
              <div className="px-2 py-1 w-full text-lg font-medium">
                {menuItem.transKey ? t(menuItem.transKey) : menuItem.title}
              </div>
            </CloseButton>
          ))}
        </div>
      </PopoverPanel>
    </Popover>
  ) : (
    <div data-testid="NavBar-link" className="relative inline-block">
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
