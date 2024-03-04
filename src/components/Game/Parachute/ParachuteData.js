import { useState, useEffect } from 'react'
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

  const {
    data,
    isInitialLoading,
    isError,
    puzzles,
    refetch: getNextPage,
  } = useParachuteSearch({
    perPage: PUZZLES_PER_PAGE,
    kids,
  })

  useEffect(() => {
    if (isError) {
      // This should not navigate to the error page. Instead, show the same page but with no results.
    }
  }, [isError])

  const { data: characterData } = useCharacters()
  const characters = characterData?.characters?.map((item) => item?.title)

  const nextWord = () => {
    if (
      currentWordIndex < Math.min(PUZZLES_PER_PAGE, (data?.count || {}) - 1)
    ) {
      setCurrentWordIndex(currentWordIndex + 1)
    } else {
      // If we run out of puzzles trigger a fetch for another page
      getNextPage()
      setCurrentWordIndex(0)
      setPagesWithoutUsablePuzzle(pagesWithoutUsablePuzzle + 1)
    }
  }

  useEffect(() => {
    const getPuzzle = () => {
      if (puzzles[currentWordIndex]?.length > 0) {
        setPagesWithoutUsablePuzzle(0)
        return puzzles[currentWordIndex]
      }
      // If we have already fetched the max number of pages and still not found a usable puzzle return an empty array to prevent possible infinite requests
      if (pagesWithoutUsablePuzzle < MAX_PAGES_WITHOUT_USABLE_PUZZLE) {
        // If the puzzle pieces array is empty then go to the next word
        nextWord()
      }
      return []
    }

    if (data?.results) {
      setCurrentPuzzle(getPuzzle())
    }
  }, [currentWordIndex, data])

  let isLoading = true

  // After data has been fetched, and if we still don't have a puzzle,
  // we will be showing the error message.
  if (!isInitialLoading && !currentPuzzle) {
    isLoading = false
  }

  let gameData = {
    isLoading,
    puzzle: [],
  }

  if (!!currentPuzzle && characters) {
    gameData = {
      isLoading: false,
      puzzle: currentPuzzle,
      translation:
        data?.results?.[currentWordIndex]?.entry?.translations?.[0]?.text,
      audio: data?.results?.[currentWordIndex]?.entry?.relatedAudio?.[0],
      alphabet: characters,
      newPuzzle: nextWord,
    }
  }

  return gameData
}

const { bool } = PropTypes
ParachuteData.propTypes = {
  kids: bool,
}

export default ParachuteData
