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
  const [isGameWon, setIsGameWon] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [guesses, setGuesses] = useState([])
  const [currentGuess, setCurrentGuess] = useState([])
  const [infoModalOpen, setInfoModalOpen] = useState(false)
  const [notEnoughLettersModalOpen, setNotEnoughLettersModalOpen] =
    useState(false)
  const [wordNotFoundModalOpen, setWordNotFoundModalOpen] = useState(false)

  const [isEndGameModalOpen, setIsEndGameModalOpen] = useState(false)
  const [endGameModalContent, setEndGameModalContent] = useState({})

  const isValidInput = () =>
    currentGuess.length === WORD_LENGTH &&
    guesses.length < MAX_TRIES &&
    !isGameWon

  const isGameOver = () => isGameWon || isGameLost

  const isValidGuess = () =>
    isWordInWordList(
      languageConfig.words,
      languageConfig.validGuesses,
      currentGuess.join(''),
    )

  const openNotEnoughLettersModal = () => {
    setNotEnoughLettersModalOpen(true)
    setTimeout(() => setNotEnoughLettersModalOpen(false), 1000)
  }

  const openNotFoundModal = () => {
    setWordNotFoundModalOpen(true)
    setTimeout(() => setWordNotFoundModalOpen(false), 1000)
  }

  const checkAnswer = () => {
    if (!isValidInput()) {
      return
    }
    setGuesses([...guesses, currentGuess])
    setCurrentGuess([])

    if (currentGuess.join('') === solution) {
      setIsGameWon(true)
      setIsEndGameModalOpen(true)
      setEndGameModalContent({
        status: 'win',
        text: 'Well done!',
      })
    } else if (guesses.length === MAX_TRIES - 1) {
      setIsGameLost(true)
      setIsEndGameModalOpen(true)
      setEndGameModalContent({
        status: 'lost',
        text: 'Maybe next time!',
      })
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
    if (isGameOver()) {
      return
    }
    if (currentGuess.length !== WORD_LENGTH) {
      openNotEnoughLettersModal()
      return
    }
    if (!isValidGuess()) {
      openNotFoundModal()
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
    infoModalOpen,
    setInfoModalOpen,
    notEnoughLettersModalOpen,
    setNotEnoughLettersModalOpen,
    wordNotFoundModalOpen,
    setWordNotFoundModalOpen,
    isEndGameModalOpen,
    setIsEndGameModalOpen,
    endGameModalContent,
  }
}

const { bool } = PropTypes
WordsyData.propTypes = {
  kids: bool,
}

export default WordsyData
