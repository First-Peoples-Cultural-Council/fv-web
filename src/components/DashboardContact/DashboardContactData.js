import { useState } from 'react'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import {
  useOrganizations,
  useOrganizationDelete,
} from 'common/dataHooks/useOrganizations'

function DashboardContactData() {
  const { site } = useSiteStore()
  const [page, setPage] = useState(1)
  const queryResponse = useOrganizations({ page })
  const { onSubmit: deleteOrganization } = useOrganizationDelete()

  const headerContent = {
    title: 'Contact Info',
    subtitle:
      'Manage the contact information displayed on your site Contact page.',
    icon: 'Mail',
  }

  const tileContent = [
    {
      id: 'organization-create',
      icon: 'Create',
      name: 'Add an organization',
      description:
        'Add a new organization with contact info to your Contact page',
      href: `/${site?.sitename}/dashboard/create/organization`,
      iconColor: 'blumine-800',
    },
  ]

  return {
    deleteOrganization,
    headerContent,
    site,
    queryResponse,
    page,
    setPage,
    tileContent,
  }
}

export default DashboardContactData
