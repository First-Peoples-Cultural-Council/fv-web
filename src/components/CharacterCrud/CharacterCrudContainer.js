import React from 'react'

// FPCC
import CharacterCrudPresentation from 'components/CharacterCrud/CharacterCrudPresentation'
import CharacterCrudData from 'components/CharacterCrud/CharacterCrudData'
import LoadOrError from 'components/LoadOrError'

function CharacterCrudContainer() {
  const { backHandler, characterQueryResponse, submitHandler } =
    CharacterCrudData()

  return (
    <LoadOrError queryResponse={characterQueryResponse}>
      <CharacterCrudPresentation
        backHandler={backHandler}
        dataToEdit={characterQueryResponse?.data || null}
        submitHandler={submitHandler}
      />
    </LoadOrError>
  )
}

export default CharacterCrudContainer
