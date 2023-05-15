import React from 'react'

// FPCC
import GamePresentation from 'components/Game/GamePresentation'
import GameData from 'components/Game/GameData'

function GameContainer() {
  const { gameId, sitename } = GameData()
  return <GamePresentation gameId={gameId} sitename={sitename} />
}

export default GameContainer
