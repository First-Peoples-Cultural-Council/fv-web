import React from 'react'

// FPCC
import ImportCreatePresentation from 'components/ImportCreate/ImportCreatePresentation'
import ImportCreateData from 'components/ImportCreate/ImportCreateData'
import SiteDocHead from 'components/SiteDocHead'

function ImportCreateContainer() {
  const { backHandler, submitHandler } = ImportCreateData()

  return (
    <>
      <SiteDocHead titleArray={['Create', 'Import Job']} />
      <ImportCreatePresentation
        backHandler={backHandler}
        submitHandler={submitHandler}
      />
    </>
  )
}

export default ImportCreateContainer
