import React from 'react'

// FPCC
import SongCrudPresentation from 'components/SongCrud/SongCrudPresentation'
import SongCrudData from 'components/SongCrud/SongCrudData'
import Loading from 'components/Loading'

function SongCrudContainer() {
  const { backHandler, dataToEdit, deleteHandler, isLoading, submitHandler } =
    SongCrudData()

  return (
    <Loading.Container isLoading={isLoading}>
      <SongCrudPresentation
        backHandler={backHandler}
        dataToEdit={dataToEdit}
        submitHandler={submitHandler}
        deleteHandler={deleteHandler}
      />
    </Loading.Container>
  )
}

export default SongCrudContainer
