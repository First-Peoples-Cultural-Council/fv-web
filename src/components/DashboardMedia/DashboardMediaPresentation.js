import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import DashboardLanding from 'components/DashboardLanding'

function DashboardMediaPresentation({ tileContent, headerContent, site }) {
  return (
    <DashboardLanding.Presentation
      tileContent={tileContent}
      headerContent={headerContent}
      site={site}
    />
  )
}
// PROPTYPES
const { array, object } = PropTypes
DashboardMediaPresentation.propTypes = {
  tileContent: array,
  headerContent: object,
  site: object,
}

export default DashboardMediaPresentation
