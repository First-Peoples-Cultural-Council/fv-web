import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import GamePresentation from 'components/Game/GamePresentation'
import GameData from 'components/Game/GameData'

function GameContainer({ kids }) {
  const { gameId, sitename } = GameData()
  return <GamePresentation gameId={gameId} sitename={sitename} kids={kids} />
}

const { bool } = PropTypes
GameContainer.propTypes = {
  kids: bool,
}

export default GameContainer
