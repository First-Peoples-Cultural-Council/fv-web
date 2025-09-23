import React from 'react'

// FPCC
import SongCrudPresentation from 'components/SongCrud/SongCrudPresentation'
import SongCrudData from 'components/SongCrud/SongCrudData'
import Loading from 'components/Loading'
import SiteDocHead from 'components/SiteDocHead'

function SongCrudContainer() {
  const { backHandler, dataToEdit, deleteHandler, isLoading, submitHandler } =
    SongCrudData()

  const isCreate = !(
    dataToEdit &&
    (dataToEdit.id || dataToEdit.uuid || dataToEdit.title)
  )
  const action = isCreate ? 'Create' : 'Edit'

  return (
    <Loading.Container isLoading={isLoading}>
      <SiteDocHead
        titleArray={[
          `${action} Song`,
          !isCreate ? dataToEdit?.title : null,
        ].filter(Boolean)}
      />
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
