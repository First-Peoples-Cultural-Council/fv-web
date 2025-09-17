import React from 'react'
import PropTypes from 'prop-types'
import { Link, useParams } from 'react-router'

// FPCC
import CountdownTimer from 'components/Game/Wordsy/Utils/CountdownTimer'

function EndGameModal({ status, solution, text }) {
  const { sitename } = useParams()
  const statusColor = status === 'win' ? 'wordsy-correct' : 'wordsy-present'

  return (
    <div className="bg-white space-y-10 text-charcoal-900 rounded-lg p-6 lg:p-20 overflow-hidden shadow-xl transform transition-all lg:w-1/3-screen">
      <div className="space-y-4">
        <h3 className={`text-center text-4xl font-bold text-${statusColor}`}>
          {text}
        </h3>
        <hr className="bg-blumine-800 w-48 h-1 border-0 rounded-sm mx-auto" />
      </div>
      <div className="space-y-2">
        <div>Today&apos;s word is:</div>
        <div className="font-bold text-3xl">{solution}</div>
      </div>
      <div className="text-charcoal-900 h-2 mb-4">
        <CountdownTimer />
      </div>
      <Link
        to={{
          pathname: `/${sitename}/words`,
          search: `?q=${solution}&types=word`,
        }}
        className="btn-primary btn-md"
      >
        Look up <span className="font-bold ml-2">{solution}</span>
      </Link>
    </div>
  )
}

const { string } = PropTypes

EndGameModal.propTypes = {
  status: string,
  text: string,
  solution: string,
}

export default EndGameModal
