import React from 'react'

// FPCC
import GalleryCrudPresentation from 'components/GalleryCrud/GalleryCrudPresentation'
import GalleryCrudData from 'components/GalleryCrud/GalleryCrudData'
import Loading from 'components/Loading'

function GalleryCrudContainer() {
  const { backHandler, dataToEdit, deleteHandler, isLoading, submitHandler } =
    GalleryCrudData()

  return (
    <Loading.Container isLoading={isLoading}>
      <GalleryCrudPresentation
        backHandler={backHandler}
        dataToEdit={dataToEdit}
        submitHandler={submitHandler}
        deleteHandler={deleteHandler}
      />
    </Loading.Container>
  )
}

export default GalleryCrudContainer
