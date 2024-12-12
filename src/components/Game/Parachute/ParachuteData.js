import { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { useCharacters } from 'common/dataHooks/useCharacters'
import { useParachuteSearch } from 'common/dataHooks/useGamesSearch'

const PUZZLES_PER_PAGE = 100
const MAX_PAGES_WITHOUT_USABLE_PUZZLE = 10

function ParachuteData({ kids }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [currentPuzzle, setCurrentPuzzle] = useState()
  const [pagesWithoutUsablePuzzle, setPagesWithoutUsablePuzzle] = useState(1)

  const parachuteQueryResponse = useParachuteSearch({
    perPage: PUZZLES_PER_PAGE,
    kids,
  })

  const { data: characterData } = useCharacters()
  const characters = characterData?.characters?.map((item) => item?.title)

  const nextWord = useCallback(() => {
    if (
      currentWordIndex <
      Math.min(
        PUZZLES_PER_PAGE,
        (parachuteQueryResponse?.data?.count || {}) - 1,
      )
    ) {
      setCurrentWordIndex(currentWordIndex + 1)
    } else {
      // If we run out of puzzles trigger a fetch for another page
      parachuteQueryResponse?.refetch()
      setCurrentWordIndex(0)
      setPagesWithoutUsablePuzzle(pagesWithoutUsablePuzzle + 1)
    }
  }, [currentWordIndex, pagesWithoutUsablePuzzle, parachuteQueryResponse])

  useEffect(() => {
    const getPuzzle = () => {
      if (parachuteQueryResponse?.puzzles[currentWordIndex]?.length > 0) {
        setPagesWithoutUsablePuzzle(0)
        return parachuteQueryResponse?.puzzles[currentWordIndex]
      }
      if (pagesWithoutUsablePuzzle < MAX_PAGES_WITHOUT_USABLE_PUZZLE) {
        // If the puzzle pieces array is empty then go to the next word
        nextWord()
      }
      // If we have already fetched the max number of pages and still not found a usable puzzle return an empty array to prevent possible infinite requests
      return []
    }

    if (parachuteQueryResponse?.data?.results) {
      setCurrentPuzzle(getPuzzle())
    }
  }, [
    currentWordIndex,
    nextWord,
    pagesWithoutUsablePuzzle,
    parachuteQueryResponse,
  ])

  return {
    parachuteQueryResponse,
    puzzle: currentPuzzle,
    translation:
      parachuteQueryResponse?.data?.results?.[currentWordIndex]?.entry
        ?.translations?.[0]?.text,
    audio:
      parachuteQueryResponse?.data?.results?.[currentWordIndex]?.entry
        ?.relatedAudio?.[0],
    alphabet: characters,
    newPuzzle: nextWord,
  }
}

const { bool } = PropTypes
ParachuteData.propTypes = {
  kids: bool,
}

export default ParachuteData
