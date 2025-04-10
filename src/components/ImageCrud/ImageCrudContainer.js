import React from 'react'

// FPCC
import LoadOrError from 'components/LoadOrError'
import ImageCrudPresentation from 'components/ImageCrud/ImageCrudPresentation'
import ImageCrudData from 'components/ImageCrud/ImageCrudData'

function ImageCrudContainer() {
  const { queryResponse, submitHandler, backHandler } = ImageCrudData()

  return (
    <LoadOrError queryResponse={queryResponse}>
      <ImageCrudPresentation
        dataToEdit={queryResponse?.data}
        submitHandler={submitHandler}
        backHandler={backHandler}
      />
    </LoadOrError>
  )
}

export default ImageCrudContainer
