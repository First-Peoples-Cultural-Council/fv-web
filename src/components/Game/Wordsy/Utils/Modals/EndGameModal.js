import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Modal from 'components/Modal'
import CountdownTimer from 'components/Game/Wordsy/Utils/CountdownTimer'

function EndGameModal({ isModalOpen, setIsModalOpen, status, text, solution }) {
  const modalStyles =
    'text-gray-900 rounded-lg p-6 lg:p-8 overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm sm:w-full'
  const modalTextStyles = status === 'win' ? 'bg-green-200' : 'bg-red-200'

  return (
    <Modal.Presentation
      isOpen={isModalOpen}
      closeHandler={() => setIsModalOpen(false)}
    >
      <div className={`${modalTextStyles} ${modalStyles}`}>
        <h3 className="text-sm text-center font-medium">{text}</h3>

        <hr className="bg-gray-700 w-48 h-1  border-0 rounded my-4 mx-auto" />

        <div className={`mt-4 ${modalTextStyles}`}>
          <h3>
            Today&apos;s word is: <span className="font-bold">{solution}</span>.
          </h3>
          <div className="mt-4 flex justify-between">
            <button
              type="button"
              className="px-5 py-2 mx-2 bg-primary hover:bg-primary-dark font-medium rounded-lg shadow-sm text-base text-center text-white"
            >
              Look up <span className="font-bold">{solution}</span>.
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
}

export default EndGameModal
