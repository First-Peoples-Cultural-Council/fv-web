import { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { useCharacters } from 'common/dataHooks/useCharacters'
import { useParachuteSearch } from 'common/dataHooks/useGamesSearch'

const PUZZLES_PER_PAGE = 100
// Prevents infinite fetches on sites that don't have sords that meet the requirements
const MAX_FETCHES_WITHOUT_USABLE_PUZZLE = 10

function ParachuteData({ kids }) {
  const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(0)
  const [currentPuzzle, setCurrentPuzzle] = useState()
  const [responsesWithoutPuzzles, setResponsesWithoutPuzzles] = useState(0)

  const parachuteQueryResponse = useParachuteSearch({
    perPage: PUZZLES_PER_PAGE,
    kids,
  })

  const { data: characterData } = useCharacters()

  const goToNextPuzzle = useCallback(() => {
    const numberOfPuzzlesReturned = parachuteQueryResponse?.puzzles?.length || 0

    if (currentPuzzleIndex < numberOfPuzzlesReturned - 1) {
      const nextPuzzleIndex = currentPuzzleIndex + 1
      setCurrentPuzzleIndex(nextPuzzleIndex)
      setCurrentPuzzle(parachuteQueryResponse?.puzzles[nextPuzzleIndex])
    } else if (responsesWithoutPuzzles < MAX_FETCHES_WITHOUT_USABLE_PUZZLE) {
      // If we run out of puzzles trigger a fetch for another page
      parachuteQueryResponse?.refetch()
      setCurrentPuzzleIndex(0)
      setResponsesWithoutPuzzles(responsesWithoutPuzzles + 1)
    }
  }, [currentPuzzleIndex, responsesWithoutPuzzles, parachuteQueryResponse])

  useEffect(() => {
    if (!currentPuzzle && parachuteQueryResponse?.puzzles?.length > 0) {
      setResponsesWithoutPuzzles(0)
      setCurrentPuzzle(parachuteQueryResponse?.puzzles?.[0])
    }
  }, [currentPuzzle, parachuteQueryResponse?.puzzles])

  return {
    parachuteQueryResponse,
    puzzle: currentPuzzle?.puzzleParts,
    translation: currentPuzzle?.entry?.translations?.[0]?.text,
    audio: currentPuzzle?.entry?.relatedAudio?.[0],
    alphabet: characterData?.characters,
    goToNextPuzzle,
  }
}

const { bool } = PropTypes
ParachuteData.propTypes = {
  kids: bool,
}

export default ParachuteData
