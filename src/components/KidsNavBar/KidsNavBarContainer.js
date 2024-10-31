import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import KidsNavBarPresentation from 'components/KidsNavBar/KidsNavBarPresentation'
import KidsData from 'components/Kids/KidsData'

function KidsNavBarContainer({ home = false }) {
  const { links, site } = KidsData()
  return <KidsNavBarPresentation links={links} site={site} home={home} />
}

// PROPTYPES
const { bool } = PropTypes
KidsNavBarContainer.propTypes = {
  home: bool,
}

export default KidsNavBarContainer
