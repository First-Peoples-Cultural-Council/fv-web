import React from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router-dom'

// FPCC
import Modal from 'components/Modal'
import CountdownTimer from 'components/Game/Wordsy/Utils/CountdownTimer'

function EndGameModal({ isModalOpen, setIsModalOpen, status, text, solution }) {
  const { sitename } = useParams()

  const modalStyles =
    'text-fv-charcoal rounded-lg p-6 lg:p-8 overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm sm:w-full'
  const modalTextStyles = status === 'win' ? 'bg-wordsy-green' : 'bg-wordsy-red'

  return (
    <Modal.Presentation
      isOpen={isModalOpen}
      closeHandler={() => setIsModalOpen(false)}
    >
      <div className={`${modalTextStyles} ${modalStyles}`}>
        <h3 className="text-sm text-center font-medium">{text}</h3>

        <hr className="bg-fv-charcoal w-48 h-1  border-0 rounded my-4 mx-auto" />

        <div className={`mt-4 ${modalTextStyles}`}>
          <h3>
            Today&apos;s word is: <span className="font-bold">{solution}</span>.
          </h3>
          <div className="mt-4 flex justify-between">
            <Link
              to={{
                pathname: `/${sitename}/words`,
                search: `?q=${solution}&types=word`,
              }}
              className="px-5 py-2 mx-2 bg-primary hover:bg-primary-dark font-medium rounded-lg shadow-sm text-base text-center text-white"
            >
              Look up <span className="font-bold">{solution}</span>.
            </Link>
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
