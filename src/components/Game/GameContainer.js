import React from 'react'

// FPCC
import GamePresentation from 'components/Game/GamePresentation'
import GameData from 'components/Game/GameData'

function GameContainer() {
  const { gameId, siteId, sitename, alphabetId } = GameData()
  return (
    <GamePresentation
      gameId={gameId}
      siteId={siteId}
      sitename={sitename}
      alphabetId={alphabetId}
    />
  )
}

export default GameContainer
