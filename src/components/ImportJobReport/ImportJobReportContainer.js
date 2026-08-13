import React from 'react'
import { useParams } from 'react-router'

// FPCC
import ImportJobReportPresentation from 'components/ImportJobReport/ImportJobReportPresentation'
import { useImportJob } from 'common/dataHooks/useImportJobs'
import LoadOrError from 'components/LoadOrError'
import SiteDocHead from 'components/SiteDocHead'

function ImportJobReportContainer() {
  const { sitename, id } = useParams()
  const queryResponse = useImportJob({ id })

  return (
    <LoadOrError queryResponse={queryResponse}>
      <SiteDocHead titleArray={['Import Job Validation']} />
      <ImportJobReportPresentation
        importJob={queryResponse?.data}
        sitename={sitename}
      />
    </LoadOrError>
  )
}

export default ImportJobReportContainer
