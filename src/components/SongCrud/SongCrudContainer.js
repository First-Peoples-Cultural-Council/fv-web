import React from 'react'

// FPCC
import SongCrudPresentation from 'components/SongCrud/SongCrudPresentation'
import SongCrudData from 'components/SongCrud/SongCrudData'
import Loading from 'components/Loading'
import SiteDocHead from 'components/SiteDocHead'

function SongCrudContainer() {
  const { backHandler, dataToEdit, deleteHandler, isLoading, submitHandler } =
    SongCrudData()

  const isEdit = Boolean(dataToEdit && (dataToEdit.id || dataToEdit.title))

  const action = isEdit ? 'Edit' : 'Create'
  const entryLabel = isEdit ? dataToEdit?.title : null

  return (
    <Loading.Container isLoading={isLoading}>
      <SiteDocHead
        titleArray={[`${action} Song`, isEdit ? entryLabel : null].filter(
          Boolean,
        )}
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
