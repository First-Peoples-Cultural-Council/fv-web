import React from 'react'

// FPCC
import SpeakerCrudPresentation from 'components/SpeakerCrud/SpeakerCrudPresentation'
import SpeakerCrudData from 'components/SpeakerCrud/SpeakerCrudData'
import Loading from 'components/Loading'
import SiteDocHead from 'components/SiteDocHead'

function SpeakerCrudContainer() {
  const { backHandler, dataToEdit, isLoading, submitHandler, deleteHandler } =
    SpeakerCrudData()

  const isEdit = Boolean(
    dataToEdit &&
      (dataToEdit.id || dataToEdit.uuid || dataToEdit.title || dataToEdit.name),
  )

  const action = isEdit ? 'Edit' : 'Create'
  const entryLabel = isEdit ? dataToEdit?.name || dataToEdit?.title : null

  return (
    <Loading.Container isLoading={isLoading}>
      <SiteDocHead
        titleArray={[`${action} Speaker`, isEdit ? entryLabel : null].filter(
          Boolean,
        )}
      />
      <SpeakerCrudPresentation
        backHandler={backHandler}
        dataToEdit={dataToEdit}
        submitHandler={submitHandler}
        deleteHandler={deleteHandler}
      />
    </Loading.Container>
  )
}

export default SpeakerCrudContainer
