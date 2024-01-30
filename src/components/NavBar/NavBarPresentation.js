import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Transition } from '@headlessui/react'

// FPCC
import NavBarPresentationMenu from 'components/NavBar/NavBarPresentationMenu'
import NavBarPresentationMobile from 'components/NavBar/NavBarPresentationMobile'
import SearchSiteForm from 'components/SearchSiteForm'
import UserMenu from 'components/UserMenu'
import JoinModalButton from 'components/JoinModalButton'
import getIcon from 'common/utils/getIcon'

function NavBarPresentation({
  isHome,
  isSearchPage,
  mobileNavbarOpen,
  openCloseMobileNavbar,
  site,
  siteLoading,
}) {
  const menuData = site?.menu || {}

  const generateMenu = (menu) => (
    <NavBarPresentationMenu
      key={`NavBarMenu_${menu?.id}`}
      menuItemData={menu}
      sitename={site?.sitename}
    />
  )

  const fvlogo = isHome
    ? getIcon('FVLogo', 'text-white fill-current h-10')
    : getIcon('FVShortLogo', 'text-fv-charcoal-light fill-current h-7')

  return (
    <nav id="NavBar" className="relative z-10" role="navigation">
      <div className="bg-fv-charcoal max-w-screen-2xl mx-auto px-2 lg:px-6 xl:px-16">
        {!siteLoading && (
          <div className="h-16 flex justify-between items-center py-1 space-x-2 lg:space-x-4">
            {/* Home Links */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="sr-only">FirstVoices Logo</span>
                {fvlogo}
              </Link>
              {!isHome && (
                <Link className="flex items-center" to={`/${site?.sitename}/`}>
                  <span className="sr-only">{site?.title}</span>
                  {getIcon('Home', 'text-white fill-current h-8 w-auto')}
                </Link>
              )}
            </div>
            {/* Menus */}
            <div className="hidden lg:flex lg:space-x-4 ">
              {menuData?.dictionary && generateMenu(menuData?.dictionary)}
              {menuData?.learn && generateMenu(menuData?.learn)}
              {menuData?.resources && generateMenu(menuData?.resources)}
              {menuData?.about && generateMenu(menuData?.about)}
              {menuData?.kids && generateMenu(menuData?.kids)}
            </div>
            <div className="hidden lg:flex lg:justify-end lg:items-center lg:space-x-4">
              {!isHome && !isSearchPage && <SearchSiteForm.Container minimal />}
              {isHome && <JoinModalButton.Container site={site} />}
              <UserMenu.Container />
            </div>
            <div className="flex items-center lg:hidden">
              <button
                data-testid="MobileMenu-button"
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
        )}
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
          <NavBarPresentationMobile site={site} />
        </div>
      </Transition>
    </nav>
  )
}
// PROPTYPES
const { bool, func, object } = PropTypes
NavBarPresentation.propTypes = {
  isHome: bool,
  isSearchPage: bool,
  mobileNavbarOpen: bool,
  openCloseMobileNavbar: func,
  site: object,
  siteLoading: bool,
}

export default NavBarPresentation
