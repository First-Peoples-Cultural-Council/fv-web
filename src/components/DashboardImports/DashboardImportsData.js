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

  const tileContent = {
    id: 'import-create',
    icon: 'Create',
    name: 'Begin a new batch import',
    description:
      'Upload a completed csv, along with any related media, and start the validation process.',
    href: `/${site?.sitename}/dashboard/create/import`,
    iconColor: 'blumine-800',
    auth: LANGUAGE_ADMIN,
  }

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
