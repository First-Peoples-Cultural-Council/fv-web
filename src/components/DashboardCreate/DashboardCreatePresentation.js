import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import DashboardLanding from 'components/DashboardLanding'

function DashboardCreatePresentation({ tileContent, headerContent, site }) {
  return <DashboardLanding.Presentation tileContent={tileContent} headerContent={headerContent} site={site} />
}
// PROPTYPES
const { array, object } = PropTypes
DashboardCreatePresentation.propTypes = {
  tileContent: array,
  headerContent: object,
  site: object,
}

export default DashboardCreatePresentation
