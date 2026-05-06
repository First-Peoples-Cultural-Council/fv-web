import React from 'react'

// FPCC
import ImportCrudPresentation from 'components/ImportCrud/ImportCrudPresentation'
import ImportCrudData from 'components/ImportCrud/ImportCrudData'
import SiteDocHead from 'components/SiteDocHead'

function ImportCrudContainer() {
  const { backHandler, submitHandler } = ImportCrudData()

  return (
    <>
      <SiteDocHead titleArray={['Create', 'Import Job']} />
      <ImportCrudPresentation
        backHandler={backHandler}
        submitHandler={submitHandler}
      />
    </>
  )
}

export default ImportCrudContainer
