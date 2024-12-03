import React from 'react'

// FPCC
import NavBarPresentation from 'components/NavBar/NavBarPresentation'
import NavBarData from 'components/NavBar/NavBarData'

function NavBarContainer() {
  const {
    isHome,
    isSearchPage,
    mobileNavbarOpen,
    openCloseMobileNavbar,
    site,
  } = NavBarData()
  return (
    <NavBarPresentation
      isHome={isHome}
      isSearchPage={isSearchPage}
      mobileNavbarOpen={mobileNavbarOpen}
      openCloseMobileNavbar={openCloseMobileNavbar}
      site={site}
    />
  )
}

export default NavBarContainer
