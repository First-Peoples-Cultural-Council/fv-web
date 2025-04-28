import { useParams } from 'react-router'

// FPCC
import { useSiteStore } from 'context/SiteContext'

function GameData() {
  const { id } = useParams()
  const { site } = useSiteStore()

  function getGameId(path) {
    switch (path) {
      case 'parachute':
      case 'pull-together':
        return 'parachute'
      case 'phrasescrambler':
        return 'phrasescrambler'
      case 'wordsy':
        return 'wordsy'
      default:
        return path
    }
  }

  return {
    gameId: getGameId(id),
    sitename: site?.sitename,
  }
}

export default GameData
