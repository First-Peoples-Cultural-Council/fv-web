import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import KidsNavBarPresentation from 'components/KidsNavBar/KidsNavBarPresentation'
import KidsNavBarData from 'components/KidsNavBar/KidsNavBarData'

function KidsNavBarContainer({ home = false }) {
  const { links, site } = KidsNavBarData()
  return <KidsNavBarPresentation links={links} site={site} home={home} />
}

// PROPTYPES
const { bool } = PropTypes
KidsNavBarContainer.propTypes = {
  home: bool,
}

export default KidsNavBarContainer
