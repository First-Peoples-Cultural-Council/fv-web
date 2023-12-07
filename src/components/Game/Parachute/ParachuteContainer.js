import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Parachute from 'components/Game/Parachute'
import Loading from 'components/Loading'

function ParachuteContainer({ kids }) {
  const { isLoading, puzzle, translation, audio, alphabet, newPuzzle } =
    Parachute.Data({ kids })
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

const { bool } = PropTypes
ParachuteContainer.propTypes = {
  kids: bool,
}

export default ParachuteContainer
