import { useQuery } from '@tanstack/react-query'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC
import api from 'services/api'
import {
  SEARCH,
  TYPES,
  KIDS,
  GAMES,
  TYPE_PHRASE,
  HAS_TRANSLATION,
  SORT,
} from 'common/constants'
import { arrayShuffle } from 'common/utils/functionHelpers'

function PhraseScramblerData({ kids }) {
  const { sitename } = useParams()
  const [jumbledWords, setJumbledWords] = useState([])
  const [selectedWords, setSelectedWords] = useState([])
  const [gameCompleted, setGameCompleted] = useState(false)
  const [validAnswer, setValidAnswer] = useState(false)
  const [inputData, setInputData] = useState({
    title: '',
    translations: [],
    relatedAudio: [],
  })

  const wordClicked = (word) => {
    if (gameCompleted && !validAnswer) {
      setGameCompleted(false)
    }
    if (selectedWords.includes(word)) {
      // Removing word from selected words list
      setSelectedWords(
        selectedWords.filter((selectedWord) => selectedWord !== word),
      )
    } else {
      // Adding word to the selected words list
      setSelectedWords([...selectedWords, word])
    }
  }

  const checkAnswer = () => {
    const selectedAnswer = selectedWords.join(' ')
    if (selectedAnswer === inputData?.title) {
      setValidAnswer(true)
    }
    setGameCompleted(true)
  }

  const resetGame = () => {
    setSelectedWords([])
    setValidAnswer(false)
    setGameCompleted(false)
  }

  const newGame = () => {
    refetch()
    generateInputData()
    resetGame()
  }

  const _searchParams = new URLSearchParams({
    [TYPES]: TYPE_PHRASE,
    [GAMES]: true,
    [HAS_TRANSLATION]: true,
    [SORT]: 'random',
  })
  if (kids) {
    _searchParams.append(KIDS, kids)
  }

  const { data, isFetching, refetch } = useQuery(
    // Fetching only phrase word at a time
    [SEARCH, sitename],
    () =>
      api.search.get({
        sitename,
        searchParams: _searchParams.toString(),
        pageParam: 1,
        perPage: 1,
      }),
    {
      enabled: !!sitename,
    },
  )

  const generateInputData = () => {
    const newPhrase = data?.results?.[0]?.entry
    const translations = newPhrase?.translations?.map(
      (translation) => translation?.text,
    )
    setInputData({
      translations,
      title: newPhrase?.title,
      relatedAudio: newPhrase?.relatedAudio,
    })
    const correctAnswer = newPhrase?.title.split(' ')
    setJumbledWords(arrayShuffle([...correctAnswer]))
  }

  useEffect(() => {
    if (data?.count > 0) {
      generateInputData()
    }
  }, [data])

  return {
    isLoading: isFetching,
    translations: inputData?.translations,
    relatedAudio: inputData?.relatedAudio,
    jumbledWords,
    selectedWords,
    gameCompleted,
    validAnswer,
    wordClicked,
    checkAnswer,
    resetGame,
    newGame,
  }
}

const { bool } = PropTypes
PhraseScramblerData.propTypes = {
  kids: bool,
}

export default PhraseScramblerData
