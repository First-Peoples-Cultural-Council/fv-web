import { useCallback, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { usePhraseScramblerSearch } from 'common/dataHooks/useGamesSearch'
import { arrayShuffle } from 'common/utils/functionHelpers'
import { normalizeSpaces } from 'common/utils/stringHelpers'

function PhraseScramblerData({ kids }) {
  const [jumbledWords, setJumbledWords] = useState([])
  const [selectedWords, setSelectedWords] = useState([])
  const [gameCompleted, setGameCompleted] = useState(false)
  const [validAnswer, setValidAnswer] = useState(false)
  const [inputData, setInputData] = useState({
    title: '',
    translations: [],
    relatedAudio: [],
  })

  const queryResponse = usePhraseScramblerSearch({ kids })

  const generateInputData = useCallback(() => {
    const newPhrase = queryResponse?.data?.results?.[0]?.entry
    const translations = newPhrase?.translations?.map((translation) =>
      normalizeSpaces(translation?.text),
    )
    const phraseTitle = normalizeSpaces(newPhrase?.title)
    setInputData({
      translations,
      title: phraseTitle,
      relatedAudio: newPhrase?.relatedAudio.slice(0, 3), // take at max 3 audio files for hints
    })
    let correctAnswer = phraseTitle.split(' ')
    correctAnswer = correctAnswer.map((text, index) => ({
      id: index,
      text,
    }))
    const shuffledWords = arrayShuffle([...correctAnswer])
    setJumbledWords(shuffledWords)
  }, [queryResponse?.data?.results])

  const wordClicked = (wordObj) => {
    if (gameCompleted && !validAnswer) {
      setGameCompleted(false)
    }
    if (selectedWords.some((obj) => obj.id === wordObj?.id)) {
      // if word is already selected, removing word from selected words list
      setSelectedWords(
        selectedWords.filter((selectedWord) => selectedWord.id !== wordObj?.id),
      )
    } else {
      // Adding word to the selected words list
      setSelectedWords([...selectedWords, wordObj])
    }
  }

  const checkAnswer = () => {
    const selectedAnswer = selectedWords
      .map((wordObj) => wordObj?.text)
      .join(' ')
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
    queryResponse?.refetch()
    generateInputData()
    resetGame()
  }

  useEffect(() => {
    if (queryResponse?.data?.count > 0 && !inputData?.title) {
      generateInputData()
    }
  }, [queryResponse, generateInputData, inputData])

  return {
    queryResponse,
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
