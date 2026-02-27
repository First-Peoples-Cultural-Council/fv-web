import React from 'react'

// FPCC
import ImportCrudPresentation from 'components/ImportCrud/ImportCrudPresentation'
import ImportCrudData from 'components/ImportCrud/ImportCrudData'
import LoadOrError from 'components/LoadOrError'
import SiteDocHead from 'components/SiteDocHead'

function ImportCrudContainer() {
  const { backHandler, importJobId, queryResponse, submitHandler } =
    ImportCrudData()

  const action = importJobId ? 'Edit' : 'Create'

  return (
    <LoadOrError queryResponse={queryResponse} bypass={!importJobId}>
      <SiteDocHead titleArray={[`${action} Import Job`]} />
      <ImportCrudPresentation
        backHandler={backHandler}
        dataToEdit={queryResponse?.data}
        submitHandler={submitHandler}
      />
    </LoadOrError>
  )
}

export default ImportCrudContainer
