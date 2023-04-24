import React from 'react'

// FPCC
import Parachute from 'components/Game/Parachute'
import Loading from 'components/Loading'

function ParachuteContainer() {
  const { isLoading, puzzle, translation, audio, alphabet, newPuzzle } = Parachute.Data()
  return (
    <Loading.Container isLoading={isLoading}>
      <Parachute.Presentation
        puzzle={puzzle}
        translation={translation}
        audio={audio}
        alphabet={alphabet}
        newPuzzle={newPuzzle}
      />
    </Loading.Container>
  )
}

export default ParachuteContainer
