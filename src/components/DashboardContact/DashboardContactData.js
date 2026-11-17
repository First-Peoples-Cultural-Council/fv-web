import { useState } from 'react'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import {
  useOrganizations,
  useOrganizationDelete,
} from 'common/dataHooks/useOrganizations'
import { useContactUs } from 'common/dataHooks/useContactUs'

function DashboardContactData() {
  const { site } = useSiteStore()
  const [page, setPage] = useState(1)

  const contactUsQueryResponse = useContactUs()
  const queryResponse = useOrganizations({ page })
  const { onSubmit: deleteOrganization } = useOrganizationDelete()

  const headerContent = {
    title: 'Contact Info',
    subtitle:
      'Manage the contact information displayed on your site Contact page.',
    icon: 'Mail',
  }

  return {
    deleteOrganization,
    headerContent,
    site,
    queryResponse,
    page,
    setPage,
    emailList: contactUsQueryResponse?.data?.[0]?.emailList || [],
  }
}

export default DashboardContactData
