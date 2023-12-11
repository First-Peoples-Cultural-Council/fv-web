import { useState, useEffect } from 'react'
import { navigate, useParams } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import {
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
    translations: [],
    title: '',
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
    // Reset game state
    setSelectedWords([])
    setValidAnswer(false)
    setGameCompleted(false)
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

  const { data, isInitialLoading, isError, error } = useSearchLoader({
    searchParams: _searchParams,
  })

  useEffect(() => {
    if (isError) {
      navigate(
        `/${sitename}/error?status=${error?.response?.status}&statusText=${error?.response?.statusText}&url=${error?.response?.url}`,
        { replace: true },
      )
    }
  }, [isError])

  useEffect(() => {
    if (data?.pages?.[0]?.count > 0) {
      const newPhrase = data?.pages?.[0]?.results?.[0]
      const translations = newPhrase?.translations?.map(
        (translation) => translation?.text,
      )
      setInputData({
        translations,
        title: newPhrase?.title,
      })
    }
  }, [data])

  useEffect(() => {
    const correctAnswer = inputData?.title.split(' ')
    setJumbledWords(arrayShuffle([...correctAnswer]))
  }, [inputData?.title])

  return {
    isInitialLoading,
    translations: inputData?.translations,
    jumbledWords,
    selectedWords,
    gameCompleted,
    validAnswer,
    wordClicked,
    checkAnswer,
    resetGame,
  }
}

const { bool } = PropTypes
PhraseScramblerData.propTypes = {
  kids: bool,
}

export default PhraseScramblerData
