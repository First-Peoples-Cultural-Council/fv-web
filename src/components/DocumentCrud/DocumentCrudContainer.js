import React from 'react'

// FPCC
import LoadOrError from 'components/LoadOrError'
import DocumentCrudPresentation from 'components/DocumentCrud/DocumentCrudPresentation'
import DocumentCrudData from 'components/DocumentCrud/DocumentCrudData'

function DocumentCrudContainer() {
  const { queryResponse, submitHandler, backHandler } = DocumentCrudData()

  return (
    <LoadOrError queryResponse={queryResponse}>
      <DocumentCrudPresentation
        dataToEdit={queryResponse?.data}
        submitHandler={submitHandler}
        backHandler={backHandler}
      />
    </LoadOrError>
  )
}

export default DocumentCrudContainer
