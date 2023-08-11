import React, { useState, useEffect } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Transition } from '@headlessui/react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import UserMenu from 'components/UserMenu'
import { ABOUT_LINK, SUPPORT_LINK } from 'common/constants'
import { useUserStore } from 'context/UserContext'

function AppNavBarPresentation({ isHome = false, login, logout }) {
  let listener = null
  const { user } = useUserStore()
  const [scrollAtTop, setscrollAtTop] = useState(true)
  const isGuest = user.isAnonymous

  useEffect(() => {
    listener = document.addEventListener('scroll', () => {
      const scrolled = document.scrollingElement.scrollTop
      if (scrolled >= 60) {
        setscrollAtTop(false)
      } else {
        setscrollAtTop(true)
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
  }, [useLocation(), setMobileLandingNavbarOpen])

  const createMobileMenuItem = (
    title,
    iconName,
    link,
    openNewTab = true,
    onClick = null,
  ) => (
    <li>
      <a
        className="w-full my-3 p-1 text-fv-charcoal flex items-center rounded focus:ring-2"
        href={link}
        {...(openNewTab ? { target: '_blank' } : '')}
        rel="noopener noreferrer"
        onClick={onClick}
        onKeyDown={onClick}
      >
        {getIcon(iconName, 'fill-current h-12 w-8')}
        <span className="ml-3 font-medium">{title}</span>
      </a>
    </li>
  )

  const createMenuItem = (
    title,
    iconName,
    link,
    openNewTab = true,
    onClick = null,
  ) => (
    <li className="mr-4">
      <a
        href={link}
        {...(openNewTab ? { target: '_blank' } : '')}
        rel="noopener noreferrer"
        onClick={onClick}
        onKeyDown={onClick}
      >
        <div className="h-8 xl:h-10 group p-1 inline-flex items-center text-base font-medium text-white hover:text-gray-300">
          {getIcon(iconName, 'fill-current h-full w-auto')}
          <p className="ml-1 xl:ml-3 xl:mr-2">{title}</p>
        </div>
      </a>
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
            <div className="w-16 text-white text-sm leading-tight text-center mr-2">
              Beta Version
            </div>
          </div>

          {/* Menu Items */}
          <ul className="hidden md:flex md:text-white md:items-center md:w-1/2 2xl:w-1/4 justify-end">
            {createMenuItem('About', 'About', ABOUT_LINK)}
            {createMenuItem('Support', 'QuestionCircleSolid', SUPPORT_LINK)}
            {isHome &&
              isGuest &&
              createMenuItem('Sign in / Register', 'Login', '', false, login)}
            {isHome ? (
              <li>
                <Link
                  to="/languages"
                  className="flex bg-bgRed px-8 py-2 rounded-full"
                >
                  Explore Languages{getIcon('ChevronRight', 'fill-current h-6')}
                </Link>
              </li>
            ) : (
              <UserMenu.Container />
            )}
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
              <li className="w-full my-3 p-1 text-fv-charcoal flex items-center rounded">
                Welcome
                {!user?.isAnonymous ? `, ${user?.firstName}!` : '!'}
              </li>
            )}
            {createMobileMenuItem('About', 'About', ABOUT_LINK)}
            {createMobileMenuItem(
              'Support',
              'QuestionCircleSolid',
              SUPPORT_LINK,
            )}
            {isHome &&
              createMobileMenuItem(
                'Explore Languages',
                'Dictionary',
                'languages',
                false,
              )}
            {isGuest
              ? createMobileMenuItem(
                  'Sign in / Register',
                  'Login',
                  '',
                  false,
                  login,
                )
              : createMobileMenuItem('Sign out', 'LogOut', '', false, logout)}
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
