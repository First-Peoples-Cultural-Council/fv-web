import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { GlobalConfiguration } from 'src/GlobalConfiguration'

import Parachute from 'components/Game/Parachute'

function GamePresentation({ siteId, sitename, gameId, alphabetId }) {
  const [isLoaded, setIsLoaded] = useState(false)

  switch (gameId) {
    case 'parachute':
      return <Parachute.Container />
    case 'wordle':
      return (
        <div className={`${isLoaded ? '' : 'hidden'}`}>
          <iframe
            id="GameIframe"
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
        <div className={`${isLoaded ? '' : 'hidden'}`}>
          <iframe
            id="GameIframe"
            onLoad={() => setIsLoaded(true)}
            src={`${GlobalConfiguration.V1_URL}/games/${gameId}?siteId=${siteId}&iframe=true&alphabetId=${alphabetId}`}
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
  }
}

// PROPTYPES
const { string } = PropTypes
GamePresentation.propTypes = {
  siteId: string,
  sitename: string,
  gameId: string,
  alphabetId: string,
}

export default GamePresentation
