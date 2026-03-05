import { useState } from 'react'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import {
  useImportJobs,
  useImportJobDelete,
} from 'common/dataHooks/useImportJobs'
import { LANGUAGE_ADMIN } from 'common/constants/roles'

function DashboardImportsData() {
  const { site } = useSiteStore()
  const [page, setPage] = useState(1)
  const queryResponse = useImportJobs({ page })
  const { mutate: deleteImportJob } = useImportJobDelete()

  const headerContent = {
    title: 'Batch Imports',
    subtitle:
      'Validate and submit batch imports to the FirstVoices Staff for upload to your site',
    icon: 'Document',
  }

  const tileContent = [
    {
      icon: 'Create',
      name: 'Add a new import',
      description:
        'Upload a completed batch template to initiate a batch dictionary import job.',
      href: `/${site?.sitename}/dashboard/create/import`,
      iconColor: 'blumine-800',
      auth: LANGUAGE_ADMIN,
    },
  ]

  return {
    deleteImport: (id) => deleteImportJob(id),
    headerContent,
    tileContent,
    site,
    queryResponse,
    page,
    setPage,
  }
}

export default DashboardImportsData
