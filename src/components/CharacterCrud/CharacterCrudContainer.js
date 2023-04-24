import React from 'react'

// FPCC
import CharacterCrudPresentation from 'components/CharacterCrud/CharacterCrudPresentation'
import CharacterCrudData from 'components/CharacterCrud/CharacterCrudData'
import Loading from 'components/Loading'

function CharacterCrudContainer() {
  const { backHandler, dataToEdit, isLoading, submitHandler } = CharacterCrudData()

  return (
    <Loading.Container isLoading={isLoading}>
      <CharacterCrudPresentation backHandler={backHandler} dataToEdit={dataToEdit} submitHandler={submitHandler} />
    </Loading.Container>
  )
}

export default CharacterCrudContainer
