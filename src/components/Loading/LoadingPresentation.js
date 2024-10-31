import React from 'react'
import PropTypes from 'prop-types'

function LoadingPresentation({ height }) {
  return (
    <div
      id="LoadingPresentation"
      className={`flex items-center justify-center mx-auto w-full ${height}`}
    >
      <div>
        <div className="flex justify-center items-center">
          <div className="bg-scarlet-400 w-6 h-6 lg:w-10 lg:h-10 rounded-full m-5 lg:m-8 animate-pulse-blur" />
          <div
            className="bg-ochre-400 w-6 h-6 lg:w-10 lg:h-10 rounded-full m-5 lg:m-8 animate-pulse-blur"
            style={{ animationDelay: '0.2s' }}
          />
          <div
            className="bg-jade-400 w-6 h-6 lg:w-10 lg:h-10 rounded-full m-5 lg:m-8 animate-pulse-blur"
            style={{ animationDelay: '0.4s' }}
          />
          <div
            className="bg-blumine-400 w-6 h-6 lg:w-10 lg:h-10 rounded-full m-5 lg:m-8 animate-pulse-blur"
            style={{ animationDelay: '0.6s' }}
          />
        </div>
        <div className="text-center text-xl font-medium">Loading...</div>
      </div>
    </div>
  )
}

// PROPTYPES
const { string } = PropTypes
LoadingPresentation.propTypes = {
  height: string,
}

export default LoadingPresentation
