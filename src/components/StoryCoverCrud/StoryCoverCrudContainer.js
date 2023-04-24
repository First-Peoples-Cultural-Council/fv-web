import React from 'react'

// FPCC
import StoryCoverCrudPresentation from 'components/StoryCoverCrud/StoryCoverCrudPresentation'
import StoryCoverCrudData from 'components/StoryCoverCrud/StoryCoverCrudData'

function StoryCoverCrudContainer() {
  const { dataToEdit, submitHandler } = StoryCoverCrudData()
  return <StoryCoverCrudPresentation dataToEdit={dataToEdit} submitHandler={submitHandler} />
}

export default StoryCoverCrudContainer
