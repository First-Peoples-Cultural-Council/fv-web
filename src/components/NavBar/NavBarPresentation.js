import React, { useState, useEffect } from 'react'
import { useParams, useLocation, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Transition } from '@headlessui/react'

// FPCC
import NavBarPresentationMenu from 'components/NavBar/NavBarPresentationMenu'
import NavBarPresentationMobile from 'components/NavBar/NavBarPresentationMobile'
import SearchSiteForm from 'components/SearchSiteForm'
import UserMenu from 'components/UserMenu'

import getIcon from 'common/utils/getIcon'

function NavBarPresentation({ isHome, isSearchPage, menuData, title }) {
  const [mobileNavbarOpen, setMobileNavbarOpen] = useState(false)
  const { sitename } = useParams()

  const openCloseMobileNavbar = () => {
    setMobileNavbarOpen(!mobileNavbarOpen)
  }

  useEffect(() => {
    if (mobileNavbarOpen) {
      setMobileNavbarOpen(false)
    }
  }, [useLocation()])

  const generateMenu = (menu) => (
    <NavBarPresentationMenu
      key={`NavBarMenu_${menu?.id}`}
      menuItemData={menu}
      sitename={sitename}
    />
  )

  const fvlogo = isHome
    ? getIcon('FVLogo', 'fill-current h-10')
    : getIcon('FVShortLogo', 'text-fv-charcoal-light fill-current h-7')

  return (
    <nav id="NavBar" className="relative z-10" role="navigation">
      <div className="bg-fv-charcoal max-w-screen-2xl mx-auto px-2 lg:px-6 xl:px-16">
        <div className="h-16 flex justify-between items-center py-1 space-x-2 lg:space-x-4">
          {/* Home Links */}
          <div className="flex items-center">
            <div
              className={`${
                isHome ? '' : 'hidden'
              } md:flex items-center text-white`}
            >
              <span className="sr-only">FirstVoices Logo</span>
              <Link to="/">{fvlogo}</Link>
            </div>
            <div className="w-16 text-white text-sm leading-tight text-center mr-2">
              Beta Version
            </div>
            {!isHome && (
              <Link
                className="h-9 text-white flex items-center group bg-fv-charcoal rounded-lg text-lg font-medium hover:text-gray-100"
                to={`/${sitename}/`}
              >
                <span className="sr-only">{title}</span>
                {getIcon('Home', 'fill-current h-full w-auto')}
              </Link>
            )}
          </div>
          {/* Menus */}
          <div id="NavMenus" className="hidden lg:flex xl:space-x-6 ">
            {menuData?.dictionary && generateMenu(menuData?.dictionary)}
            {menuData?.learn && generateMenu(menuData?.learn)}
            {menuData?.resources && generateMenu(menuData?.resources)}
            {menuData?.about && generateMenu(menuData?.about)}
            {menuData?.kids && generateMenu(menuData?.kids)}
          </div>
          <div className="flex items-center space-x-2 lg:space-x-4">
            {/* Search */}
            {!isHome && !isSearchPage && (
              <div
                id="NavSearch"
                className="flex w-full md:w-auto items-center"
              >
                <SearchSiteForm.Container minimal />
              </div>
            )}
            {/* User Button and Menu */}
            <div className="hidden lg:inline-flex">
              <UserMenu.Container />
            </div>
            {/* Mobile Menu Button */}
            <div id="MobileMenuButton" className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => openCloseMobileNavbar()}
                className="bg-fv-charcoal rounded-lg p-2 inline-flex items-center justify-center text-white hover:text-gray-100 focus:ring-2"
              >
                <span className="sr-only">
                  {mobileNavbarOpen ? 'Close menu' : 'Open menu'}
                </span>
                {mobileNavbarOpen
                  ? getIcon('Close', 'h-6 w-6')
                  : getIcon('HamburgerMenu', 'h-6 w-6')}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* -- Mobile Menu -- */}
      <Transition
        show={mobileNavbarOpen}
        enter="transform transition ease-in-out duration-500"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-500"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="lg:hidden">
          <NavBarPresentationMobile menuData={menuData} sitename={sitename} />
        </div>
      </Transition>
    </nav>
  )
}
// PROPTYPES
const { bool, object, string } = PropTypes
NavBarPresentation.propTypes = {
  isHome: bool,
  isSearchPage: bool,
  menuData: object,
  title: string,
}
NavBarPresentation.defaultProps = {
  title: '/',
}

export default NavBarPresentation
