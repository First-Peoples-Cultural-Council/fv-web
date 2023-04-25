import { useParams } from 'react-router-dom'

// FPCC
import { useSiteStore } from 'context/SiteContext'

function GameData() {
  const { id } = useParams()
  const { site } = useSiteStore()
  const { uid, children } = site

  function getGameId(path) {
    switch (path) {
      case 'memory':
        return 'concentration' // Backend refers to Memory as concentration
      case 'jigsaw':
        return 'jigsaw'
      case 'parachute':
        return 'parachute'
      case 'quiz':
        return 'quiz'
      case 'wordle':
        return 'wordle'
      case 'wordscramble':
        return 'wordscramble'
      case 'wordsearch':
        return 'wordsearch'
      default:
        return null
    }
  }

  return {
    gameId: getGameId(id),
    siteId: uid,
    sitename: site?.sitename,
    alphabetId: children?.Alphabet,
  }
}

export default GameData
