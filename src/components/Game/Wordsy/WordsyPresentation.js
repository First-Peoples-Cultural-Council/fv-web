import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'
import Modal from 'components/Modal'
import Cell from 'components/Game/Wordsy/WordsyControls/Rows/Cell'
import Grid from 'components/Game/Wordsy/WordsyControls/Grid'
import Keyboard from 'components/Game/Wordsy/WordsyControls/Keyboard/Keyboard'

// From settings
const TRIES = 6

function WordsyPresentation({
  solution,
  orthography,
  orthographyPattern,
  languageConfig,
}) {
  const [isGameWon, setIsGameWon] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [guesses, setGuesses] = useState([])
  const [currentGuess, setCurrentGuess] = useState([])
  const [infoModalOpen, setInfoModalOpen] = useState(false)

  const isWordInWordList = (words, validGuesses, word) =>
    words.includes(word) || validGuesses.includes(word)

  const onChar = (value) => {
    if (
      currentGuess.length < languageConfig?.wordLength &&
      guesses.length < TRIES &&
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

    if (!(currentGuess.length === languageConfig?.wordLength)) {
      // Not enough letters dialog should pop up
    }

    if (
      !isWordInWordList(
        languageConfig.words,
        languageConfig.validGuesses,
        currentGuess.join(''),
      )
    ) {
      // Word not found dialog should pop up
    }

    const winningWord = currentGuess.join('') === solution
    if (
      currentGuess.length === languageConfig?.wordLength &&
      guesses.length < TRIES &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess([])

      if (winningWord) {
        setIsGameWon(true)
        return null
      }

      if (guesses.length === TRIES - 1) {
        setIsGameLost(true)
      }
    }
    return null
  }

  return (
    <section
      className="py-8 max-w-7xl mx-auto sm:px-6 lg:px-8 bg-white"
      data-testid="WordsyContainer"
    >
      <div className="flex w-80 mx-auto items-center mb-8">
        <h1 className="text-xl grow font-bold">Wordsy</h1>
        <button
          type="button"
          onClick={() => setInfoModalOpen(true)}
          onKeyDown={() => setInfoModalOpen(true)}
        >
          {getIcon('InfoCircleSolid', 'h-6 w-6 cursor-pointer')}
        </button>
      </div>

      <Grid
        guesses={guesses}
        solution={solution}
        currentGuess={currentGuess}
        orthographyPattern={orthographyPattern}
        wordLength={languageConfig?.wordLength}
      />

      <Keyboard
        orthography={orthography}
        onChar={onChar}
        onEnter={onEnter}
        onDelete={onDelete}
        solution={solution}
        guesses={guesses}
        orthographyPattern={orthographyPattern}
      />

      {/* Info modal */}
      <Modal.Presentation
        isOpen={infoModalOpen}
        closeHandler={() => setInfoModalOpen(false)}
      >
        <div className="bg-white rounded-lg p-6 lg:p-8 overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm sm:w-full">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            How to play
          </h3>
          <div className="mt-2">
            <p className="text-sm text-gray-500">
              Guess the word of the day in 6 tries. After each guess, the color
              of the tiles will change to show how close your guess was to the
              word.
            </p>

            <div className="flex justify-center mb-1 mt-4">
              <Cell value="W" status="correct" />
              <Cell value="E" />
              <Cell value="A" />
              <Cell value="R" />
              <Cell value="Y" />
            </div>
            <p className="text-sm text-gray-500">
              The letter W is in the word and in the correct spot.
            </p>

            <div className="flex justify-center mb-1 mt-4">
              <Cell value="P" />
              <Cell value="I" />
              <Cell value="L" status="present" />
              <Cell value="O" />
              <Cell value="T" />
            </div>
            <p className="text-sm text-gray-500">
              The letter L is in the word but in the wrong spot.
            </p>

            <div className="flex justify-center mb-1 mt-4">
              <Cell value="V" />
              <Cell value="A" />
              <Cell value="G" />
              <Cell value="U" status="absent" />
              <Cell value="E" />
            </div>
            <p className="text-sm text-gray-500">
              The letter U is not in the word in any spot.
            </p>
          </div>
        </div>
      </Modal.Presentation>
    </section>
  )
}

const { any } = PropTypes

WordsyPresentation.propTypes = {
  solution: any,
  orthography: any,
  orthographyPattern: any,
  languageConfig: any,
}

export default WordsyPresentation
