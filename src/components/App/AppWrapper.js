import React from 'react'
import PropTypes from 'prop-types'

import Audiobar from 'components/Audiobar'
import Footer from 'components/Footer'
import AppNavBar from 'components/AppNavBar'

function AppWrapper({ children, isHome = false }) {
  return (
    <div id="AppWrapper" className="overflow-hidden bg-white">
      <header className="fixed w-full top-0 z-50 print:hidden">
        <AppNavBar.Presentation isHome={isHome} />
      </header>
      <div className={isHome ? '' : 'pt-16 min-h-screen'}>{children}</div>
      <footer>
        <Footer.Presentation />
      </footer>
      <Audiobar.Container />
    </div>
  )
}

// PROPTYPES
const { bool, node } = PropTypes
AppWrapper.propTypes = {
  children: node,
  isHome: bool,
}

export default AppWrapper
