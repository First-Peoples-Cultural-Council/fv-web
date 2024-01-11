import React from 'react'
import PropTypes from 'prop-types'

import Parachute from 'components/Game/Parachute'
import PhraseScrambler from 'components/Game/PhraseScrambler'
import Wordsy from 'components/Game/Wordsy'

function GamePresentation({ gameId, kids }) {
  switch (gameId) {
    case 'parachute':
      return <Parachute.Container kids={kids} />
    case 'phrasescrambler':
      return <PhraseScrambler.Container kids={kids} />
    case 'wordsy':
      return <Wordsy.Container kids={kids} />
    default:
      return (
        <div className="w-full text-center text-2xl">
          {gameId} - Game in construction
        </div>
      )
  }
}

// PROPTYPES
const { string, bool } = PropTypes
GamePresentation.propTypes = {
  gameId: string,
  kids: bool,
}

export default GamePresentation
