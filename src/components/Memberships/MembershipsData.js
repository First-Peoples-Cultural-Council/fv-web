import { useState } from 'react'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import {
  useMemberships,
  useMembershipDelete,
} from 'common/dataHooks/useMemberships'

function MembershipsData() {
  const { site } = useSiteStore()
  const [page, setPage] = useState(1)
  const queryResponse = useMemberships({ page })
  const { onSubmit: deleteMembership } = useMembershipDelete()

  return {
    deleteMembership,
    site,
    queryResponse,
    page,
    setPage,
  }
}

export default MembershipsData
