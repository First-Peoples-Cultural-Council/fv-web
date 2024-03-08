import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import PropTypes from 'prop-types'

// FPCC
import api from 'services/api'
import { KIDS, WORDSY } from 'common/constants'
import {
  getOrthographyPattern,
  isWordInWordList,
} from 'components/Game/Wordsy/Utils/helpers'

const MAX_TRIES = 7
const WORD_LENGTH = 5

function WordsyData({ kids }) {
  const [languageConfig, setLanguageConfig] = useState({
    orthography: [],
    orthographyPattern: [],
    words: [],
    validGuesses: [],
  })
  const [solution, setSolution] = useState('')

  const { sitename } = useParams()

  const _searchParams = new URLSearchParams()
  if (kids) {
    _searchParams.append(KIDS, kids)
  }

  const { data, isFetching } = useQuery(
    [WORDSY, sitename],
    () =>
      api.gameContent.getWordsyConfig({
        sitename,
        searchParams: _searchParams.toString(),
      }),
    { enabled: !!sitename },
  )

  useEffect(() => {
    const updatedLanguageConfig = {
      orthography: data?.orthography,
      orthographyPattern: getOrthographyPattern(data?.orthography),
      words: data?.words,
      validGuesses: data?.validGuesses,
    }
    setLanguageConfig(updatedLanguageConfig)
    setSolution(data?.solution)
  }, [data])

  // Game controls
  const [isGameOver, setIsGameOver] = useState(false)
  const [guesses, setGuesses] = useState([])
  const [currentGuess, setCurrentGuess] = useState([])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalData, setModalData] = useState({})

  const isValidInput = () =>
    currentGuess.length === WORD_LENGTH &&
    guesses.length < MAX_TRIES &&
    !isGameOver

  const isValidGuess = () =>
    isWordInWordList(
      languageConfig.words,
      languageConfig.validGuesses,
      currentGuess.join(''),
    )

  const openWarningModal = (text) => {
    setModalData({
      type: 'warning',
      text,
    })
    setIsModalOpen(true)
    setTimeout(() => {
      setIsModalOpen(false)
    }, 1000)
  }

  const checkAnswer = () => {
    if (!isValidInput()) {
      return
    }
    setGuesses([...guesses, currentGuess])
    setCurrentGuess([])

    if (currentGuess.join('') === solution) {
      setIsGameOver(true)
      setModalData({
        type: 'over',
        status: 'win',
        text: 'Well done!',
      })
      setIsModalOpen(true)
    } else if (guesses.length === MAX_TRIES - 1) {
      setIsGameOver(true)
      setModalData({
        type: 'over',
        status: 'lost',
        text: 'Maybe next time!',
      })
      setIsModalOpen(true)
    }
  }

  const onChar = (value) => {
    if (!isValidInput()) {
      const newGuess = currentGuess.concat([value])
      setCurrentGuess(newGuess)
    }
  }

  const onDelete = () => {
    let updatedCurrentGuess = [...currentGuess]
    updatedCurrentGuess = updatedCurrentGuess.slice(0, -1)
    setCurrentGuess(updatedCurrentGuess)
  }

  const onEnter = () => {
    if (isGameOver) {
      return
    }
    if (currentGuess.length !== WORD_LENGTH) {
      openWarningModal('Not Enough Letters.')
      return
    }
    if (!isValidGuess()) {
      openWarningModal('Word not found.')
      return
    }
    checkAnswer()
  }

  return {
    isFetching,
    tries: MAX_TRIES,
    solution,
    languageConfig,
    guesses,
    currentGuess,
    wordLength: WORD_LENGTH,
    onChar,
    onEnter,
    onDelete,
    isModalOpen,
    setIsModalOpen,
    modalData,
    setModalData,
  }
}

const { bool } = PropTypes
WordsyData.propTypes = {
  kids: bool,
}

export default WordsyData
