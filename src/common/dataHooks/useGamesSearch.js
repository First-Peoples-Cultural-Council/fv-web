import { useQuery } from '@tanstack/react-query'
import { useParams, useSearchParams } from 'react-router'

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
  TYPE_PHRASE,
  MINWORDS,
  WORDSY,
} from 'common/constants'
import { getOrthographyPattern } from 'components/Game/Wordsy/Utils/helpers'

export function useParachuteSearch({ perPage, kids }) {
  const { sitename } = useParams()

  const [searchParams] = useSearchParams()
  const _searchParams = searchParams.get(TYPES)
    ? searchParams
    : new URLSearchParams({
        [GAMES]: true,
        [TYPES]: TYPE_WORD,
        [HAS_AUDIO]: true,
        [HAS_TRANSLATION]: true,
        [SORT]: 'random',
        [HAS_UNRECOGNIZED_CHARS]: false,
      })
  if (kids) {
    _searchParams.append(KIDS, kids)
  }
  const searchParamString = _searchParams.toString()

  const getPuzzles = (data) => {
    const puzzles = []
    // If no words are found during the search then return an array with a single empty puzzle
    if (data?.count === 0 || !data?.results) {
      return puzzles
    }

    for (const item of data?.results || []) {
      const splitCharsBaseArray = item?.entry?.splitCharsBase
      // If the splitCharsBase is not empty, generate a puzzle
      if (splitCharsBaseArray?.length > 4) {
        const puzzleParts = []
        splitCharsBaseArray.forEach((letter, index) => {
          if (letter === ' ') {
            puzzleParts.push({ id: index, letter: ' ', found: true })
          } else {
            puzzleParts.push({ id: index, letter, found: false })
          }
        })
        puzzles.push({ ...item, puzzleParts })
      }
    }
    return puzzles
  }

  const queryResponse = useQuery({
    queryKey: [SEARCH, sitename, searchParamString, perPage],
    queryFn: () =>
      api.search.getParachute({
        sitename,
        searchParams: searchParamString,
        perPage,
      }),
    select: (data) => ({ ...data, puzzles: getPuzzles(data) }),
  })

  return queryResponse
}

export function usePhraseScramblerSearch({ kids }) {
  const { sitename } = useParams()
  const _searchParams = new URLSearchParams({
    [TYPES]: TYPE_PHRASE,
    [GAMES]: true,
    [HAS_TRANSLATION]: true,
    [SORT]: 'random',
    [MINWORDS]: 2,
  })
  if (kids) {
    _searchParams.append(KIDS, kids)
  }

  const queryResponse = useQuery({
    queryKey: [SEARCH, sitename],
    queryFn: () =>
      api.search.get({
        sitename,
        searchParams: _searchParams.toString(),
        pageParam: 1,
        perPage: 1, // Fetching one phrase at a time
      }),
  })
  return queryResponse
}

export function useWordsySearch({ kids }) {
  const { sitename } = useParams()
  const _searchParams = new URLSearchParams()
  if (kids) {
    _searchParams.append(KIDS, kids)
  }

  const queryResponse = useQuery({
    queryKey: [WORDSY, sitename],
    queryFn: () =>
      api.gameContent.getWordsyConfig({
        sitename,
        searchParams: _searchParams.toString(),
      }),
    select: (data) => ({
      ...data,
      orthographyPattern: getOrthographyPattern(data?.orthography),
    }),
  })

  return queryResponse
}
