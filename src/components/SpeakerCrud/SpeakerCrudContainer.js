import React from 'react'

// FPCC
import SpeakerCrudPresentation from 'components/SpeakerCrud/SpeakerCrudPresentation'
import SpeakerCrudData from 'components/SpeakerCrud/SpeakerCrudData'
import Loading from 'components/Loading'
import SiteDocHead from 'components/SiteDocHead'

function SpeakerCrudContainer() {
  const { backHandler, dataToEdit, isLoading, submitHandler, deleteHandler } =
    SpeakerCrudData()

  return (
    <Loading.Container isLoading={isLoading}>
      <SiteDocHead titleArray={['Create Speaker']} />
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
