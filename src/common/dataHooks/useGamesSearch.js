import { useQuery } from '@tanstack/react-query'
import { useParams, useSearchParams } from 'react-router-dom'

// FPCC
import api from 'services/api'
import {
  SEARCH,
  TYPES,
  KIDS,
  TYPE_WORD,
  HAS_AUDIO,
  HAS_TRANSLATION,
  GAMES,
  SORT,
  HAS_UNRECOGNIZED_CHARS,
} from 'common/constants'

export function useParachuteSearch({ perPage }) {
  const { sitename } = useParams()

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
  const searchParamString = _searchParams.toString()

  const { data, refetch } = useQuery(
    [SEARCH, sitename],
    () =>
      api.search.getParachute({
        sitename,
        searchParams: searchParamString,
        perPage,
      }),
    {
      enabled: !!sitename,
    },
  )

  const getPuzzles = () => {
    // If no words are found during the search then return an array with a single empty puzzle
    if (data?.count === 0) {
      return [[]]
    }
    const splitCharsBaseArray = data?.results?.map(
      (item) => item?.entry?.splitCharsBase,
    )
    const puzzles = splitCharsBaseArray?.map((splitCharsBase) => {
      // If the splitCharsBase is not empty, generate a puzzle
      if (splitCharsBase?.length > 0) {
        const puzzleParts = []
        splitCharsBase.forEach((letter) => {
          if (letter === ' ') {
            puzzleParts.push({ letter: ' ', found: true })
          } else {
            puzzleParts.push({ letter, found: false })
          }
        })
        return puzzleParts
      }
      return []
    })
    return puzzles
  }

  return {
    data,
    puzzles: getPuzzles(),
    refetch,
  }
}
