import React from 'react'

// FPCC
import ImportJobMediaPresentation from 'components/ImportJobMedia/ImportJobMediaPresentation'
import ImportJobMediaData from 'components/ImportJobMedia/ImportJobMediaData'
import LoadOrError from 'components/LoadOrError'
import SiteDocHead from 'components/SiteDocHead'

function ImportJobMediaContainer() {
  const { queryResponse, uppy } = ImportJobMediaData()

  return (
    <LoadOrError queryResponse={queryResponse}>
      <SiteDocHead titleArray={['Edit', 'Import Job Media']} />
      <ImportJobMediaPresentation importJob={queryResponse?.data} uppy={uppy} />
    </LoadOrError>
  )
}

export default ImportJobMediaContainer
