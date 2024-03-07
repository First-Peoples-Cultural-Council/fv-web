import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Cell from 'components/Game/Wordsy/Grid/Cell'

function getGuessStatuses(solution, guess, orthographyPattern) {
  // Utility function to get status for each guess
  const splitSolution = solution.split(orthographyPattern).filter((i) => i)
  const splitGuess = guess

  const solutionCharsTaken = Array(splitSolution.length).fill(false)

  const statuses = Array.from(Array(guess.length))

  // handle all correct cases first
  splitGuess.forEach((letter, i) => {
    if (letter === splitSolution[i]) {
      statuses[i] = 'correct'
      solutionCharsTaken[i] = true
    }
  })

  splitGuess.forEach((letter, i) => {
    if (statuses[i]) return

    if (!splitSolution.includes(letter)) {
      // handles the absent case
      statuses[i] = 'absent'
      return
    }

    // handles the present's case
    const indexOfPresentChar = splitSolution.findIndex(
      (x, index) => x === letter && !solutionCharsTaken[index],
    )

    if (indexOfPresentChar > -1) {
      statuses[i] = 'present'
      solutionCharsTaken[indexOfPresentChar] = true
    } else {
      statuses[i] = 'absent'
    }
  })

  return statuses
}

function CompletedRow({ solution, guess, orthographyPattern }) {
  const statuses = getGuessStatuses(solution, guess, orthographyPattern)
  return (
    <div className="flex justify-center mb-1">
      {guess.map((letter, index) => (
        // Non-unique cells for non-unique guesses, using index in the key
        // eslint-disable-next-line react/no-array-index-key
        <Cell key={`guess-${index}`} value={letter} status={statuses[index]} /> // NOSONAR
      ))}
    </div>
  )
}

const { any } = PropTypes

CompletedRow.propTypes = {
  solution: any,
  guess: any,
  orthographyPattern: any,
}

export default CompletedRow
