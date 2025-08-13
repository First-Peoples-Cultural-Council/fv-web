import { useState } from 'react'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import {
  useMemberships,
  useMembershipDelete,
} from 'common/dataHooks/useMemberships'

function DashboardMembershipData() {
  const { site } = useSiteStore()
  const [page, setPage] = useState(1)
  const queryResponse = useMemberships({ page })
  const { onSubmit: deleteMembership } = useMembershipDelete()

  const headerContent = {
    title: 'Member Management',
    subtitle:
      'Manage members of your site and provide access for team members to different functionality based on their designated roles.',
    icon: 'Members',
  }

  return {
    deleteMembership,
    headerContent,
    site,
    queryResponse,
    page,
    setPage,
  }
}

export default DashboardMembershipData
