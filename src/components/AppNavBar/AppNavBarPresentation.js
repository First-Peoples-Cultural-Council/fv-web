import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Transition } from '@headlessui/react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import SearchSiteForm from 'components/SearchSiteForm'
import UserMenu from 'components/UserMenu'
import { useUserStore } from 'context/UserContext'
import Modal from 'components/Modal'

function AppNavBarPresentation({ isHome = false, login, logout }) {
  const { user } = useUserStore()
  const [scrollAtTop, setScrollAtTop] = useState(true)
  const isGuest = user.isAnonymous
  const [betaModalOpen, setBetaModalOpen] = useState(false)
  const location = useLocation()

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

  useEffect(() => {
    if (mobileLandingNavbarOpen) {
      setMobileLandingNavbarOpen(false)
    }
  }, [location, setMobileLandingNavbarOpen])

  const menuItemStyling =
    'h-8 xl:h-10 group p-1 inline-flex items-center text-base xl:text-lg font-medium text-white hover:text-gray-300'
  const menuItemLabelStyling = 'ml-1 xl:ml-3 xl:mr-2 whitespace-nowrap'

  const mobileMenuItemStyling =
    'w-full py-3 px-1 text-fv-charcoal flex items-center rounded focus:ring-2'
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
          scrollAtTop && isHome ? 'bg-transparent' : 'bg-fv-charcoal'
        } w-full max-w-screen-2xl mx-auto px-2 lg:px-6 xl:px-16 relative z-10`}
      >
        <div className="h-16 flex justify-between items-center py-1 space-x-2 lg:space-x-4">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/">
              <span className="md:flex items-center text-white">
                <span className="sr-only">FirstVoices Logo</span>
                {getIcon('FVLogo', 'fill-current h-10')}
              </span>
            </a>
            <button
              className="w-16 text-white text-sm leading-tight text-center mr-2"
              onClick={() => setBetaModalOpen(true)}
              type="button"
            >
              Beta Version
            </button>
          </div>

          <Modal.Presentation
            isOpen={betaModalOpen}
            closeHandler={() => setBetaModalOpen(false)}
          >
            <div
              data-testid="BetaModalContent"
              className="bg-white rounded-lg shadow-lg p-6 sm:p-14"
            >
              <h2 className="text-3xl font-bold tracking-tight text-fv-charcoal sm:text-4xl">
                Welcome to the new FirstVoices!
              </h2>
              <p className="mx-auto mt-3 md:mt-6 max-w-xl text-lg leading-8 text-fv-charcoal-light">
                The beta version of FirstVoices v3 is now live.
                <br /> If you are looking for the old version of FirstVoices,{' '}
                <br />
                please click{' '}
                <a
                  href="https://archive.firstvoices.com"
                  className="text-blue-600 visited:text-purple-600 underline underline-offset-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  here
                </a>
                {/*
                 */}
                .
              </p>
              <p className="mx-auto mt-2 max-w-xl text-lg leading-8 text-fv-charcoal-light">
                Having issues with the new version? <br />
                Please contact us{' '}
                <a
                  href="mailto:hello@firstvoices.com"
                  className="text-blue-600 visited:text-purple-600 underline underline-offset-2"
                >
                  here
                </a>
                {/*
                 */}
                .
              </p>
            </div>
          </Modal.Presentation>

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
            {!isHome && (
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
                  className="inline-flex items-center bg-bgRed px-8 py-2 rounded-full whitespace-nowrap"
                >
                  Explore Languages
                  {getIcon('ChevronRight', 'fill-current h-6 w-6 ml-2')}
                </Link>
              </li>
            )}

            {!isGuest && <UserMenu.Container />}
          </ul>
          {/* Landing Mobile Menu Button */}
          <div
            id="LandingMobileMenuButton"
            className="flex items-center md:hidden"
          >
            <button
              type="button"
              onClick={() => openCloseMobileLandingNavbar()}
              className="bg-fv-charcoal rounded-lg p-2 inline-flex items-center justify-center text-white hover:text-gray-100 focus:ring-2"
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
        show={mobileLandingNavbarOpen}
        enter="transform transition ease-in-out duration-500"
        enterFrom="translate-x-full"
        enterTo="translate-x-0"
        leave="transform transition ease-in-out duration-500"
        leaveFrom="translate-x-0"
        leaveTo="translate-x-full"
      >
        <div className="shadow-lg min-h-screen bg-white">
          <ul className="grid grid-rows-3 divide-y-2 divide-gray-200 bg-white p-2">
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
