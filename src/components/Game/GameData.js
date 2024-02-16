import { useParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'

function GameData() {
  const { id } = useParams()
  const { site } = useSiteStore()

  function getGameId(path) {
    switch (path) {
      case 'memory':
        return 'concentration' // Backend refers to Memory as concentration
      case 'jigsaw':
        return 'jigsaw'
      case 'parachute':
      case 'pull-together':
        return 'parachute'
      case 'phrasescrambler':
        return 'phrasescrambler'
      case 'quiz':
        return 'quiz'
      case 'wordsy':
        return 'wordsy'
      case 'wordsearch':
        return 'wordsearch'
      default:
        return null
    }
  }

  return {
    gameId: getGameId(id),
    sitename: site?.sitename,
  }
}

export default GameData
