import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Parachute from 'components/Game/Parachute'

function GamePresentation({ sitename, gameId }) {
  const [isLoaded, setIsLoaded] = useState(false)

  switch (gameId) {
    case 'parachute':
      return <Parachute.Container />
    case 'wordle':
      return (
        <div className={`${isLoaded ? '' : 'hidden'}`}>
          <iframe
            id="GameIframe"
            title="Wordle"
            onLoad={() => setIsLoaded(true)}
            src={`https://games.firstvoices.io/wordle/?language=${sitename}`}
            allowFullScreen
            style={{
              marginTop: '35px',
              minHeight: '100vh',
              overflow: 'hidden',
              border: 'none',
            }}
            width="100%"
          />
        </div>
      )
    default:
      return (
        <div className="w-full text-center text-2xl">
          {gameId} - Game in construction
        </div>
      )
  }
}

// PROPTYPES
const { string } = PropTypes
GamePresentation.propTypes = {
  sitename: string,
  gameId: string,
}

export default GamePresentation
