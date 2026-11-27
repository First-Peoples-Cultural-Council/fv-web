import React from 'react'

// FPCC
import MembershipsPresentation from 'components/Memberships/MembershipsPresentation'
import MembershipsData from 'components/Memberships/MembershipsData'

function MembershipsContainer() {
  const { queryResponse, deleteMembership, site, page, setPage } =
    MembershipsData()

  return (
    <div id="MembershipsContainer">
      <MembershipsPresentation
        queryResponse={queryResponse}
        deleteMembership={deleteMembership}
        site={site}
        page={page}
        setPage={setPage}
      />
    </div>
  )
}

export default MembershipsContainer
