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

const MAX_TRIES = 6
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
  const [isWinModalOpen, setIsWinModalOpen] = useState(false)
  const [isLostModalOpen, setIsLostModalOpen] = useState(false)

  const onChar = (value) => {
    if (
      currentGuess.length < WORD_LENGTH &&
      guesses.length < MAX_TRIES &&
      !isGameWon
    ) {
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
    // The return text is not used anywhere, adding that as placeholders to prevent sonar
    // from raising warning about not having different returns in different conditionals
    if (isGameWon || isGameLost) {
      return 'game-over'
    }

    if (currentGuess.length !== WORD_LENGTH) {
      setNotEnoughLettersModalOpen(true)
      setTimeout(() => setNotEnoughLettersModalOpen(false), 1000)
      return 'not-enough-letters'
    }

    if (
      !isWordInWordList(
        languageConfig.words,
        languageConfig.validGuesses,
        currentGuess.join(''),
      )
    ) {
      setWordNotFoundModalOpen(true)
      setTimeout(() => setWordNotFoundModalOpen(false), 1000)
      return 'word-not-found'
    }

    const winningWord = currentGuess.join('') === solution
    if (
      currentGuess.length === WORD_LENGTH &&
      guesses.length < MAX_TRIES &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess([])

      if (winningWord) {
        setIsGameWon(true)
        setIsWinModalOpen(true)
        return 'game-won'
      }

      if (guesses.length === MAX_TRIES - 1) {
        setIsGameLost(true)
        setIsLostModalOpen(true)
        return 'game-lost'
      }
    }
    return null
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
    isWinModalOpen,
    setIsWinModalOpen,
    isLostModalOpen,
    setIsLostModalOpen,
  }
}

const { bool } = PropTypes
WordsyData.propTypes = {
  kids: bool,
}

export default WordsyData
