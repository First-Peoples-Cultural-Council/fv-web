import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import KidsNavBarPresentation from 'components/KidsNavBar/KidsNavBarPresentation'
import KidsNavBarData from 'components/KidsNavBar/KidsNavBarData'

function KidsNavBarContainer({ home }) {
  const { links, logoUrl, sitename, siteTitle } = KidsNavBarData()
  return (
    <KidsNavBarPresentation links={links} logoUrl={logoUrl} sitename={sitename} siteTitle={siteTitle} home={home} />
  )
}

// PROPTYPES
const { bool } = PropTypes
KidsNavBarContainer.propTypes = {
  home: bool,
}

KidsNavBarContainer.defaultProps = {
  home: false,
}

export default KidsNavBarContainer
