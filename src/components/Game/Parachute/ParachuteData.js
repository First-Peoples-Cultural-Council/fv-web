import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

// FPCC
import {
  TYPES,
  KIDS,
  TYPE_WORD,
  HAS_AUDIO,
  HAS_TRANSLATION,
  GAMES,
  SORT,
  HAS_UNRECOGNIZED_CHARS,
} from 'common/constants'
import { useCharacters } from 'common/dataHooks/useCharacters'
import { useParachuteSearch } from 'common/dataHooks/useGamesSearch'

const PUZZLES = 100
const MAXPAGESWITHOUTUSABLEPUZZLE = 10

function ParachuteData() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [pageSize, setPageSize] = useState()
  const [puzzle, setPuzzle] = useState()
  const [pagesWithoutUsablePuzzle, setPagesWithoutUsablePuzzle] = useState(0)

  const [searchParams] = useSearchParams()
  const _searchParams = searchParams.get(TYPES)
    ? searchParams
    : new URLSearchParams({
        [GAMES]: true,
        [TYPES]: TYPE_WORD,
        [KIDS]: true,
        [HAS_AUDIO]: true,
        [HAS_TRANSLATION]: true,
        [SORT]: 'random',
        [HAS_UNRECOGNIZED_CHARS]: false,
      })

  const { data, refetch: getNextPage } = useParachuteSearch({
    searchParams: _searchParams,
    perPage: PUZZLES,
  })

  const { data: characterData } = useCharacters()
  const characters = characterData?.characters?.map((item) => item?.title)

  const nextWord = () => {
    if (currentWordIndex < Math.min(pageSize, (data?.count || {}) - 1)) {
      setCurrentWordIndex(currentWordIndex + 1)
    } else {
      // If we run out of puzzles trigger a fetch for another page
      getNextPage()
      setCurrentWordIndex(0)
      setPagesWithoutUsablePuzzle(pagesWithoutUsablePuzzle + 1)
    }
  }

  useEffect(() => {
    const createPuzzle = (splitCharsBase) => {
      // If the splitCharsBase is not empty generate a puzzle
      if (splitCharsBase?.length > 0) {
        const puzzleParts = []
        splitCharsBase.forEach((letter) => {
          if (letter === ' ') {
            puzzleParts.push({ letter: ' ', found: true })
          } else {
            puzzleParts.push({ letter, found: false })
          }
        })

        setPagesWithoutUsablePuzzle(0)
        return puzzleParts
      }
      // If we have already fetched the max number of pages and still not found a usable puzzle return an empty array to prevent possible infinite requests
      if (pagesWithoutUsablePuzzle < MAXPAGESWITHOUTUSABLEPUZZLE) {
        // If the splitCharsBase is empty then go to the next word
        nextWord()
      }
      return []
    }

    if (!pageSize && data?.pageSize) {
      setPageSize(data?.pageSize)
    }
    if (data?.results) {
      setPuzzle(
        createPuzzle(data?.results?.[currentWordIndex]?.entry?.splitCharsBase),
      )
    }
  }, [data?.results, currentWordIndex, pageSize, data?.pageSize])

  return pageSize > 0 && characters?.length > 0
    ? {
        isLoading: false,
        puzzle,
        translation:
          data?.results?.[currentWordIndex]?.entry?.translations?.[0]?.text,
        audio: data?.results?.[currentWordIndex]?.entry?.relatedAudio?.[0],
        alphabet: characters,
        newPuzzle: nextWord,
      }
    : {
        isLoading: true,
      }
}

export default ParachuteData
