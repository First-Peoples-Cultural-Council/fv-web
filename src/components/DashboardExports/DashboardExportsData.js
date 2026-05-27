import { useState } from 'react'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import {
  useExportJobs,
  useExportJobDelete,
} from 'common/dataHooks/useExportJobs'

function DashboardExportsData() {
  const { site } = useSiteStore()
  const [page, setPage] = useState(1)
  const queryResponse = useExportJobs({ page })
  const { mutate: deleteExportJob } = useExportJobDelete()

  const headerContent = {
    title: 'Exports',
    subtitle: 'Export dictionary content from your site to csv',
    icon: 'Document',
  }

  return {
    deleteExport: (id) => deleteExportJob(id),
    headerContent,
    site,
    queryResponse,
    page,
    setPage,
  }
}

export default DashboardExportsData
