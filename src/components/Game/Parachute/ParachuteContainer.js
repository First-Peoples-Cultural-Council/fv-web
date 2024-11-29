import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import ParachuteData from 'components/Game/Parachute/ParachuteData'
import ParachutePresentation from 'components/Game/Parachute/ParachutePresentation'
import Loading from 'components/Loading'
import SiteDocHead from 'components/SiteDocHead'

function ParachuteContainer({ kids }) {
  const { isLoading, puzzle, translation, audio, alphabet, newPuzzle } =
    ParachuteData({ kids })
  return (
    <Loading.Container isLoading={isLoading}>
      <SiteDocHead titleArray={['Pull Together', 'Games']} />
      <ParachutePresentation
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
