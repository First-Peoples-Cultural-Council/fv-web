import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// FPCC
import Key from 'components/Game/Wordsy/Keyboard/Key'
import { CHAR_CORRECT, CHAR_ABSENT, CHAR_PRESENT } from 'common/constants'

function Keyboard({
  orthography,
  onChar,
  onDelete,
  onEnter,
  solution,
  guesses,
  orthographyPattern,
}) {
  const getCharStatuses = () => {
    const charObj = {}
    const solutionChars = solution?.split(orthographyPattern).filter(Boolean)
    guesses?.forEach((word) => {
      word.forEach((letter, i) => {
        if (!solutionChars.includes(letter)) {
          charObj[letter] = CHAR_ABSENT
        } else if (letter === solutionChars[i]) {
          charObj[letter] = CHAR_CORRECT
        } else if (charObj[letter] !== CHAR_CORRECT) {
          charObj[letter] = CHAR_PRESENT
        }
      })
    })

    return charObj
  }

  const charStatuses = getCharStatuses()

  useEffect(() => {
    const listener = (e) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace' || e.code === 'Delete') {
        onDelete()
      }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  return (
    <div className="py-1 md:py-2">
      <div className="flex justify-center max-w-xl mx-auto px-1">
        <div className="flex flex-wrap justify-center gap-x-1.5 gap-y-2">
          {orthography?.map((char) => (
            <Key
              value={char}
              key={`key-${char}`}
              onClick={onChar}
              status={charStatuses[char]}
            />
          ))}
        </div>
      </div>
      <div>
        <div className="flex justify-center space-x-1.5 my-2">
          <button
            data-testid="enter-btn"
            type="button"
            className="flex items-center justify-center rounded-sm text-base cursor-pointer select-none h-10 w-16 bg-charcoal-100 hover:bg-charcoal-200 active:bg-charcoal-300"
            onClick={() => onDelete()}
          >
            Delete
          </button>
          <button
            data-testid="enter-btn"
            type="button"
            className="flex items-center justify-center rounded-sm text-base cursor-pointer select-none h-10 w-16 bg-charcoal-100 hover:bg-charcoal-200 active:bg-charcoal-300"
            onClick={() => onEnter()}
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  )
}

const { any } = PropTypes

Keyboard.propTypes = {
  orthography: any,
  onChar: any,
  onDelete: any,
  onEnter: any,
  solution: any,
  guesses: any,
  orthographyPattern: any,
}

export default Keyboard
