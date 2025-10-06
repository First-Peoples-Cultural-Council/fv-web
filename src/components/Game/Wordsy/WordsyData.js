import { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { useWordsySearch } from 'common/dataHooks/useGamesSearch'
import { isWordInWordList } from 'components/Game/Wordsy/Utils/helpers'

const MAX_TRIES = 7
const WORD_LENGTH = 5

function WordsyData({ kids }) {
  const queryResponse = useWordsySearch({ kids })
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
      queryResponse?.data?.words,
      queryResponse?.data?.validGuesses,
      currentGuess.join(''),
    )

  const openWarningModal = (text) => {
    setModalData({
      status: 'warning',
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

    if (currentGuess.join('') === queryResponse?.data?.solution) {
      setIsGameOver(true)
      setModalData({
        status: 'win',
        text: 'Well done!',
      })
      setIsModalOpen(true)
    } else if (guesses.length === MAX_TRIES - 1) {
      setIsGameOver(true)
      setModalData({
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
    queryResponse,
    tries: MAX_TRIES,
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
