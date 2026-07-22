import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import AudioMinimalPresentation from './AudioMinimalPresentation'
import AudioMinimalData from './AudioMinimalData'

function AudioMinimalContainer({ audioObject, buttonStyling, label }) {
  const { buttonRef, isPlaying, onClick, onKeyPress } = AudioMinimalData({
    audioObject,
  })
  return (
    <AudioMinimalPresentation
      buttonRef={buttonRef}
      isPlaying={isPlaying}
      onClick={onClick}
      onKeyPress={onKeyPress}
      label={label}
      buttonStyling={buttonStyling}
      audioId={audioObject?.id}
    />
  )
}
// PROPTYPES
const { string, object } = PropTypes
AudioMinimalContainer.propTypes = {
  audioObject: object,
  label: string,
  buttonStyling: string,
}

export default AudioMinimalContainer
