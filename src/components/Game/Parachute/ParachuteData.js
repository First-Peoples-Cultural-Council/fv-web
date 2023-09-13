import { useState, useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import { arrayShuffle } from 'common/utils/functionHelpers'
import api from 'services/api'

const PUZZLES = 100

function ParachuteData() {
  const { site } = useSiteStore()

  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [resultsCount, setResultsCount] = useState()

  const randomIntBetween = (min, max) =>
    Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) +
    Math.ceil(min)

  const [pageParam, setPageParam] = useState(0)

  const { data } = useQuery(
    ['gameContent', site?.id + pageParam],
    () =>
      api.gameContent.get({
        siteId: site?.id,
        pageParam,
        perPage: PUZZLES,
      }),
    {
      enabled: !!site?.id,
    },
  )

  useEffect(() => {
    if (!resultsCount && data?.resultsCount) {
      setResultsCount(data?.resultsCount)
    }
  }, [data])

  const nextWord = () => {
    if (currentWordIndex < (data?.resultsCount % PUZZLES) - 1) {
      setCurrentWordIndex(currentWordIndex + 1)
    } else {
      // If we run out of puzzles trigger a fetch for a random page from the results - V1_FUDGE - the new search endpoint should send random
      setPageParam(randomIntBetween(0, Math.ceil(resultsCount / PUZZLES)))
      setCurrentWordIndex(0)
    }
  }

  const getCharacters = () => {
    // V1_FUDGE - in future get separated characters from BE
    const combinedWords = data?.entries
      .map((word) => word?.properties?.['dc:title'])
      .join('')
    const uniqueCharacters = [...combinedWords].filter(
      (value, index) =>
        value !== ' ' && [...combinedWords].indexOf(value) === index,
    )
    arrayShuffle(uniqueCharacters)
    return uniqueCharacters
  }

  const createPuzzle = (word) => {
    const spreadWord = [...word]
    const puzzleParts = []
    spreadWord.forEach((letter) => {
      if (letter === ' ') {
        puzzleParts.push({ letter: ' ', found: true })
      } else {
        puzzleParts.push({ letter, found: false })
      }
    })

    return puzzleParts
  }

  return data?.entries.length > 0
    ? {
        isLoading: false,
        puzzle: createPuzzle(
          data?.entries?.[currentWordIndex]?.properties['dc:title'],
        ),
        translation:
          data?.entries?.[currentWordIndex]?.properties['fv:definitions']?.[0]
            ?.translation,
        audio:
          data?.entries?.[currentWordIndex]?.properties?.[
            'fv:related_audio'
          ]?.[0],
        alphabet: getCharacters(),
        newPuzzle: nextWord,
      }
    : {
        isLoading: true,
      }
}

export default ParachuteData
