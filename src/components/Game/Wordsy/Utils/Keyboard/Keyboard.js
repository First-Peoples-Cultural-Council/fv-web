import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

// FPCC
import Key from 'components/Game/Wordsy/Utils/Keyboard/Key'

export const getStatuses = (solution, guesses, orthographyPattern) => {
  const charObj = {}
  const solutionChars = solution.split(orthographyPattern).filter((i) => i)
  guesses.forEach((word) => {
    word.forEach((letter, i) => {
      if (!solutionChars.includes(letter)) {
        charObj[letter] = 'absent'
      }

      if (letter === solutionChars[i]) {
        charObj[letter] = 'correct'
      }

      if (charObj[letter] !== 'correct') {
        charObj[letter] = 'present'
      }
    })
  })

  return charObj
}

function Keyboard({
  orthography,
  onChar,
  onDelete,
  onEnter,
  solution,
  guesses,
  orthographyPattern,
}) {
  const firstRow = orthography.slice(0, Math.floor(orthography.length * 0.4))
  const secondRow = orthography.slice(
    Math.floor(orthography.length * 0.4),
    Math.floor(orthography.length * 0.7),
  )
  const thirdRow = orthography.slice(
    Math.floor(orthography.length * 0.7),
    orthography.length,
  )

  const onClick = (value) => {
    if (value === 'ENTER') {
      onEnter()
    } else if (value === 'DELETE') {
      onDelete()
    } else {
      onChar(value)
    }
  }

  useEffect(() => {
    const listener = (e) => {
      if (e.code === 'Enter') {
        onEnter()
      } else if (e.code === 'Backspace') {
        onDelete()
      }
      // To be confirmed if we want to accept input from keyboard
      // else {
      //   const key = e.key.toUpperCase()
      //   if (key.length === 1 && key >= 'A' && key <= 'Z') {
      //     onChar(key)
      //   }
      // }
    }
    window.addEventListener('keyup', listener)
    return () => {
      window.removeEventListener('keyup', listener)
    }
  }, [onEnter, onDelete, onChar])

  const charStatuses = getStatuses(solution, guesses, orthographyPattern)

  return (
    <div>
      <div className="flex justify-center mb-1">
        {firstRow.map((char) => (
          <Key
            value={char}
            key={`key-${char}`}
            onClick={onClick}
            status={charStatuses[char]}
          />
        ))}
      </div>
      <div className="flex justify-center mb-1">
        {secondRow.map((char) => (
          <Key
            value={char}
            key={`key-${char}`}
            onClick={onClick}
            status={charStatuses[char]}
          />
        ))}
      </div>
      <div className="flex justify-center">
        <Key width={65.4} value="ENTER" onClick={onClick}>
          Enter
        </Key>
        {thirdRow.map((char) => (
          <Key
            value={char}
            key={`key-${char}`}
            onClick={onClick}
            status={charStatuses[char]}
          />
        ))}
        <Key width={65.4} value="DELETE" onClick={onClick}>
          Delete
        </Key>
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
