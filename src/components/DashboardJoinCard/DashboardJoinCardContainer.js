import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import DashboardJoinCardData from 'components/DashboardJoinCard/DashboardJoinCardData'
import DashboardJoinCardPresentation from 'components/DashboardJoinCard/DashboardJoinCardPresentation'

function DashboardJoinCardContainer({ joinRequest }) {
  const { handleIgnore, handleApprove } = DashboardJoinCardData({ joinRequest })
  return (
    <div id="DashboardJoinCardContainer">
      <DashboardJoinCardPresentation
        joinRequest={joinRequest}
        handleIgnore={handleIgnore}
        handleApprove={handleApprove}
      />
    </div>
  )
}

// PROPTYPES
const { object } = PropTypes
DashboardJoinCardContainer.propTypes = {
  joinRequest: object,
}

export default DashboardJoinCardContainer
