import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router'
import { Transition } from '@headlessui/react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import SearchSiteForm from 'components/SearchSiteForm'
import UserMenu from 'components/UserMenu'
import { useUserStore } from 'context/UserContext'

function AppNavBarPresentation({ isHome = false, login, logout }) {
  const { user } = useUserStore()
  const [scrollAtTop, setScrollAtTop] = useState(true)
  const isGuest = user.isAnonymous
  const location = useLocation()
  const isSearchPage =
    location.pathname.startsWith(`/search`) ||
    location.pathname.startsWith(`/languages`)

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

  const [mobileLandingNavbarOpen, setMobileLandingNavbarOpen] = useState(false)

  const openCloseMobileLandingNavbar = () => {
    setMobileLandingNavbarOpen(!mobileLandingNavbarOpen)
  }

  const [prevLocation, setPrevLocation] = useState(location)
  if (location !== prevLocation && mobileLandingNavbarOpen) {
    setPrevLocation(location)
    openCloseMobileLandingNavbar()
  }

  const menuItemStyling =
    'h-8 xl:h-10 group p-1 inline-flex items-center text-base xl:text-lg font-medium text-white hover:text-charcoal-200'
  const menuItemLabelStyling = 'ml-1 xl:ml-3 xl:mr-2 whitespace-nowrap'

  const mobileMenuItemStyling =
    'w-full py-3 px-1 text-charcoal-900 flex items-center rounded-sm focus:ring-2'
  const mobileMenuItemLabelStyling = 'ml-3 font-medium'

  const createMobileMenuLink = ({ title, iconName, link }) => (
    <li>
      <Link className={mobileMenuItemStyling} to={link}>
        {getIcon(iconName, 'fill-current h-12 w-8')}
        <span className={mobileMenuItemLabelStyling}>{title}</span>
      </Link>
    </li>
  )

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
                {getIcon('About', 'fill-current h-full w-auto')}
                <p className={menuItemLabelStyling}>About</p>
              </Link>
            </li>
            <li>
              <Link
                data-testid="NavBar-Support-Link"
                to="/support"
                className={menuItemStyling}
              >
                {getIcon('QuestionCircleSolid', 'fill-current h-full w-auto')}
                <p className={menuItemLabelStyling}>Support</p>
              </Link>
            </li>
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
                  {getIcon('Login', 'fill-current h-full w-auto')}
                  <p className={menuItemLabelStyling}>Sign in / Register</p>
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
              onClick={() => openCloseMobileLandingNavbar()}
              className="bg-charcoal-900 rounded-lg p-2 inline-flex items-center justify-center text-white hover:text-charcoal-50 focus:ring-2"
            >
              <span className="sr-only">
                {mobileLandingNavbarOpen ? 'Close menu' : 'Open menu'}
              </span>
              {mobileLandingNavbarOpen
                ? getIcon('Close', 'h-6 w-6')
                : getIcon('HamburgerMenu', 'h-6 w-6')}
            </button>
          </div>
        </div>
      </div>
      {/* -- Mobile Menu -- */}
      <Transition
        as="div"
        show={mobileLandingNavbarOpen}
        enter="transform transition ease-in-out duration-500"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-500"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="shadow-lg min-h-screen bg-white">
          <ul className="grid grid-rows-3 divide-y-2 divide-charcoal-100 bg-white p-2">
            {!isGuest && (
              <li className={mobileMenuItemStyling}>
                Welcome
                {user?.displayName && `, ${user?.displayName}`}!
              </li>
            )}

            {createMobileMenuLink({
              title: 'About',
              iconName: 'About',
              link: '/about',
            })}

            {createMobileMenuLink({
              title: 'Support',
              iconName: 'QuestionCircleSolid',
              link: '/support',
            })}
            {isHome &&
              createMobileMenuLink({
                title: 'Explore Languages',
                iconName: 'Dictionary',
                link: '/languages',
              })}

            <li>
              <button
                data-testid="login-logout-btn"
                type="button"
                className={mobileMenuItemStyling}
                onClick={isGuest ? login : logout}
                onKeyDown={isGuest ? login : logout}
              >
                {getIcon(
                  `${isGuest ? 'Login' : 'LogOut'}`,
                  'fill-current h-12 w-8',
                )}
                <span className={mobileMenuItemLabelStyling}>
                  {isGuest ? 'Sign in / Register' : 'Sign out'}
                </span>
              </button>
            </li>
          </ul>
        </div>
      </Transition>
    </nav>
  )
}

const { bool, func } = PropTypes
AppNavBarPresentation.propTypes = {
  isHome: bool,
  login: func,
  logout: func,
}

export default AppNavBarPresentation
