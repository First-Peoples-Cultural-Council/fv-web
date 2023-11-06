import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import NavBarPresentation from 'components/NavBar/NavBarPresentation'
import NavBarData from 'components/NavBar/NavBarData'

function NavBarContainer({ siteLoading }) {
  const {
    isHome,
    isSearchPage,
    mobileNavbarOpen,
    openCloseMobileNavbar,
    site,
  } = NavBarData()
  return (
    <NavBarPresentation
      siteLoading={siteLoading}
      isHome={isHome}
      isSearchPage={isSearchPage}
      mobileNavbarOpen={mobileNavbarOpen}
      openCloseMobileNavbar={openCloseMobileNavbar}
      site={site}
    />
  )
}

// PROPTYPES
const { bool } = PropTypes
NavBarContainer.propTypes = {
  siteLoading: bool,
}

export default NavBarContainer
