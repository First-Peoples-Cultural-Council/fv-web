import React from 'react'
import NavBarPresentation from 'components/NavBar/NavBarPresentation'
import NavBarData from 'components/NavBar/NavBarData'

function NavBarContainer() {
  const { isHome, isSearchPage, menuData, title } = NavBarData()
  return <NavBarPresentation isHome={isHome} isSearchPage={isSearchPage} menuData={menuData} title={title} />
}

export default NavBarContainer
