import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'

import Parachute from 'components/Game/Parachute'
import { hasWordleEnabled } from 'common/utils/gameHelpers'
import getIcon from 'common/utils/getIcon'

function GamePresentation({ sitename, gameId }) {
  const [isLoaded, setIsLoaded] = useState(false)

  const icon = getIcon(
    'InfoCircleSolid',
    'fill-current text-word h-12 w-12 md:h-20 md:w-20 mx-auto',
  )

  const navigate = useNavigate()

  switch (gameId) {
    case 'parachute':
      return <Parachute.Container />
    case 'wordle':
      if (hasWordleEnabled(sitename)) {
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
      }
      return (
        <div className="w-full text-center text-2xl mt-32">
          {/* Message to be updated after confirmation. Ref: FW-3510 */}
          <div>{icon}</div>
          <h2 className="text-2xl font-bold tracking-tight text-fv-charcoal sm:text-3xl mt-4">
            This firstvoices language site has not been set up for WORDLE yet.
          </h2>
          <button
            type="button"
            onClick={() => navigate(`/${sitename}/games`)}
            className="mx-auto flex items-center rounded-md bg-primary mt-6 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Browse more games on the site.
          </button>
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
