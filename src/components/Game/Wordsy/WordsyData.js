import { useState } from 'react'

// FPCC
import {
  setOrthographyPattern,
  isWordInWordList,
} from 'components/Game/Wordsy/Utils/helpers'

const GAME_SETTINS = {
  tries: 6,
}
const SOLUTION = 's̲ps̲os̲'

function WordsyData() {
  const solution = SOLUTION

  const languageConfig = {}

  // Set orthography pattern
  languageConfig.orthographyPattern = setOrthographyPattern(
    languageConfig.orthography,
  )

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
      currentGuess.length < languageConfig?.wordLength &&
      guesses.length < GAME_SETTINS.tries &&
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
    if (isGameWon || isGameLost) {
      return null
    }

    if (currentGuess.length !== languageConfig?.wordLength) {
      setNotEnoughLettersModalOpen(true)
    }

    if (
      !isWordInWordList(
        languageConfig.words,
        languageConfig.validGuesses,
        currentGuess.join(''),
      )
    ) {
      setWordNotFoundModalOpen(true)
      setTimeout(() => setWordNotFoundModalOpen(false), 2000)
    }

    const winningWord = currentGuess.join('') === solution
    if (
      currentGuess.length === languageConfig?.wordLength &&
      guesses.length < GAME_SETTINS.tries &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess([])

      if (winningWord) {
        setIsGameWon(true)
        setIsWinModalOpen(true)
        return null
      }

      if (guesses.length === GAME_SETTINS.tries - 1) {
        setIsGameLost(true)
        setIsLostModalOpen(true)
      }
    }
    return null
  }

  return {
    tries: GAME_SETTINS.tries,
    solution, // Should be coming from languageConfig ?
    languageConfig,
    guesses,
    currentGuess,
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

export default WordsyData
