import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router'

// FPCC
import getIcon from 'common/utils/getIcon'
import SearchSiteForm from 'components/SearchSiteForm'
import UserMenu from 'components/UserMenu'
import { useUserStore } from 'context/UserContext'
import useLoginLogout from 'common/hooks/useLoginLogout'
import AppNavBarPresentationMobile from 'components/AppNavBar/AppNavBarPresentationMobile'

function AppNavBarPresentation() {
  const { user } = useUserStore()
  const { login } = useLoginLogout()
  const [scrollAtTop, setScrollAtTop] = useState(true)
  const isGuest = user.isAnonymous
  const location = useLocation()

  const isSearchPage =
    location.pathname.startsWith(`/search`) ||
    location.pathname.startsWith(`/languages`)

  const isHome = location.pathname === '/'

  useEffect(() => {
    const listener = document.addEventListener('scroll', () => {
      const scrolled = document.scrollingElement.scrollTop
      if (scrolled >= 60) {
        setScrollAtTop(false)
      } else {
        setScrollAtTop(true)
      }
    })
    return () => {
      document.removeEventListener('scroll', listener)
    }
  }, [scrollAtTop])

  const [mobileNavbarOpen, setMobileNavbarOpen] = useState(false)

  const openCloseMobileNavbar = () => {
    setMobileNavbarOpen(!mobileNavbarOpen)
  }

  const [prevLocation, setPrevLocation] = useState(location)
  if (location !== prevLocation && mobileNavbarOpen) {
    setPrevLocation(location)
    openCloseMobileNavbar()
  }

  const menuItemStyling =
    'h-8 xl:h-10 group p-1 mr-2 inline-flex items-center text-base xl:text-lg font-medium text-white hover:text-charcoal-200 whitespace-nowrap'

  return (
    <nav id="AppNavBar" role="navigation">
      <div
        className={`${
          scrollAtTop && isHome ? 'bg-transparent' : 'bg-charcoal-900'
        } w-full mx-auto px-2 lg:px-6 xl:px-16 relative z-10`}
      >
        <div className="h-16 flex justify-between items-center py-1 space-x-2 lg:space-x-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="sr-only">FirstVoices Logo</span>
            {getIcon('FVLogo', 'h-10 w-auto fill-current text-white')}
          </Link>

          {/* Menu Items */}
          <ul className="hidden md:flex md:text-white md:items-center justify-end md:space-x-4">
            <li>
              <Link
                data-testid="NavBar-About-Link"
                to="/about"
                className={menuItemStyling}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                data-testid="NavBar-Support-Link"
                to="/support"
                className={menuItemStyling}
              >
                Support
              </Link>
            </li>
            {!isHome && (
              <li>
                <Link to="/languages" className={menuItemStyling}>
                  Explore Languages
                </Link>
              </li>
            )}
            {/* Search */}
            {!isHome && !isSearchPage && (
              <li id="AppNavSearch">
                <SearchSiteForm.Container minimal />
              </li>
            )}
            {isGuest && (
              <li>
                <button
                  type="button"
                  onClick={login}
                  onKeyDown={login}
                  className={menuItemStyling}
                  data-testid="NavBar-Login"
                >
                  Sign in / Register
                </button>
              </li>
            )}
            {isHome && (
              <li>
                <Link
                  to="/languages"
                  className="inline-flex items-center bg-scarlet-800 px-8 py-2 rounded-full whitespace-nowrap"
                >
                  Explore Languages
                  {getIcon('ChevronRight', 'fill-current h-6 w-6 ml-2')}
                </Link>
              </li>
            )}

            {!isGuest && (
              <li>
                <UserMenu.Container />
              </li>
            )}
          </ul>
          {/* Landing Mobile Menu Button */}
          <div
            id="LandingMobileMenuButton"
            className="flex items-center md:hidden"
          >
            <button
              data-testid="open-close-mobile-menu-btn"
              type="button"
              onClick={() => openCloseMobileNavbar()}
              className="rounded-lg p-2 inline-flex items-center justify-center text-white hover:text-charcoal-50 focus:ring-2"
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
      {/* -- Mobile Menu -- */}
      <AppNavBarPresentationMobile
        open={mobileNavbarOpen}
        onClose={() => openCloseMobileNavbar()}
      />
    </nav>
  )
}

export default AppNavBarPresentation
