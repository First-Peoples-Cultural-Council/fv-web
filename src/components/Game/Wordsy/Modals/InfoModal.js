import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

// FPCC
import Modal from 'components/Modal'
import Cell from 'components/Game/Wordsy/Grid/Cell'

function InfoModal({ isOpen, closeHandler }) {
  const { sitename } = useParams()

  return (
    <Modal.Presentation isOpen={isOpen} closeHandler={closeHandler}>
      <div className="bg-white rounded-lg p-6 overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm sm:w-full">
        <h3 className="text-lg leading-6 font-medium text-gray-900">
          How to play
        </h3>
        <div className="mt-2">
          <p className="text-sm text-gray-500">
            Guess the word of the day in 6 tries. After each guess, the color of
            the tiles will change to show how close your guess was to the word.
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

        <hr className="my-4" />
        <div className="text-sm text-gray-500">
          <p>
            This is an open source clone of the game Wordle adapted by
            FirstVoices. Check out{' '}
            <a
              href="https://github.com/cwackerfuss/reactle"
              className="inline-url"
              target="_blank"
            >
              the original code
            </a>{' '}
            by{' '}
            <a
              href="https://www.hannahmariepark.com/"
              className="inline-url"
              target="_blank"
            >
              Hannah Park
            </a>{' '}
            or have a look at{' '}
            <a
              href="https://github.com/roedoejet/AnyLanguage-Wordle"
              className="inline-url"
              target="_blank"
            >
              Aidan Pine&apos;s fork
            </a>{' '}
            and customize it for another language! Or, you can also{' '}
            <a
              href="https://www.nytimes.com/games/wordle/index.html"
              className="inline-url"
              target="_blank"
            >
              play the original here.
            </a>
          </p>
          <p>
            The words in this game were sourced from{' '}
            <a
              href={`/${sitename}/words`}
              className="inline-url"
              target="_blank"
            >
              the words on this site.
            </a>
          </p>
        </div>
      </div>
    </Modal.Presentation>
  )
}

const { bool, func } = PropTypes

InfoModal.propTypes = {
  isOpen: bool,
  closeHandler: func,
}

export default InfoModal
