import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import ParachuteData from 'components/Game/Parachute/ParachuteData'
import ParachutePresentation from 'components/Game/Parachute/ParachutePresentation'
import LoadOrError from 'components/LoadOrError'
import SiteDocHead from 'components/SiteDocHead'

function ParachuteContainer({ kids }) {
  const {
    parachuteQueryResponse,
    puzzle,
    translation,
    audio,
    alphabet,
    newPuzzle,
  } = ParachuteData({ kids })
  return (
    <>
      <SiteDocHead titleArray={['Pull Together', 'Games']} />
      <LoadOrError queryResponse={parachuteQueryResponse}>
        <ParachutePresentation
          puzzle={puzzle}
          translation={translation}
          audio={audio}
          alphabet={alphabet}
          newPuzzle={newPuzzle}
        />
      </LoadOrError>
    </>
  )
}

const { bool } = PropTypes
ParachuteContainer.propTypes = {
  kids: bool,
}

export default ParachuteContainer
