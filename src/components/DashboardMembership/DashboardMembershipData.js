import { useState } from 'react'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { useMemberships } from 'common/dataHooks/useMemberships'

function DashboardMembershipData() {
  const { site } = useSiteStore()
  const [page, setPage] = useState(1)
  const queryResponse = useMemberships({ page })

  const headerContent = {
    title: 'Member Management',
    subtitle:
      'Manage users and provide access to different functionality based on their designated user roles.',
    icon: 'Members',
  }

  return {
    headerContent,
    site,
    queryResponse,
    page,
    setPage,
  }
}

export default DashboardMembershipData
