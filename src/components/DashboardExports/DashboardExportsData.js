import { useState } from 'react'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import {
  useExportJobs,
  useExportJobDelete,
} from 'common/dataHooks/useExportJobs'
import { ASSISTANT, TYPES, TYPE_DICTIONARY } from 'common/constants'

function DashboardExportsData() {
  const { site } = useSiteStore()
  const [page, setPage] = useState(1)
  const queryResponse = useExportJobs({ page })
  const { mutate: deleteExportJob } = useExportJobDelete()

  const headerContent = {
    title: 'Exports',
    subtitle: 'Export dictionary content from your site to csv.',
    icon: 'Spreadsheet',
  }

  const tileContent = {
    id: 'import-create',
    icon: 'Create',
    name: 'Generate a new batch export',
    description:
      'Set the parameters for your export on the dictionary search page and then export the results.',
    href: `/${site?.sitename}/dashboard/advanced-search?${TYPES}=${TYPE_DICTIONARY}`,
    iconColor: 'blumine-800',
    auth: ASSISTANT,
  }

  return {
    deleteExport: (id) => deleteExportJob(id),
    headerContent,
    tileContent,
    site,
    queryResponse,
    page,
    setPage,
  }
}

export default DashboardExportsData
