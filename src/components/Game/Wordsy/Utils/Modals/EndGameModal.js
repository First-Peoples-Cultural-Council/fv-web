import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Modal from 'components/Modal'
import CountdownTimer from 'components/Game/Wordsy/Utils/CountdownTimer'

function EndGameModal({
  isModalOpen,
  setIsModalOpen,
  status,
  text,
  solution,
  sitename,
}) {
  const modalStyles =
    'rounded-lg p-6 lg:p-8 overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm sm:w-full'
  const modalTextStyles =
    status === 'win' ? 'bg-green-200 text-gray-900' : 'text-white bg-red-200'
  const hrBackground = status === 'win' ? 'bg-gray-700' : 'bg-gray-100'
  return (
    <Modal.Presentation
      isOpen={isModalOpen}
      closeHandler={() => setIsModalOpen(false)}
    >
      <div className={`${modalTextStyles} ${modalStyles}`}>
        <h3 className="text-sm text-center font-medium">{text}</h3>
        <hr
          className={`${hrBackground} w-48 h-1  border-0 rounded my-4 mx-auto`}
        />
        <div className={`mt-4 ${modalTextStyles}`}>
          <h3>
            Solution for the day is{' '}
            <span className="font-bold">{solution}</span>.
          </h3>
          <div className="mt-4 flex justify-between">
            <button
              type="button"
              className="px-5 py-2 mx-2 bg-primary hover:bg-primary-dark font-medium rounded-lg shadow-sm text-base text-center text-white"
            >
              Look up <span className="font-bold">{solution}</span> in{' '}
              <span className="font-bold">{sitename}</span>.
            </button>
            <h3>
              Next word in <CountdownTimer />
            </h3>
          </div>
        </div>
      </div>
    </Modal.Presentation>
  )
}

const { bool, func, string } = PropTypes

EndGameModal.propTypes = {
  isModalOpen: bool,
  setIsModalOpen: func,
  status: string,
  text: string,
  solution: string,
  sitename: string,
}

export default EndGameModal
