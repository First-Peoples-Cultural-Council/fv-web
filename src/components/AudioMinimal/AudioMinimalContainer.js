import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import AudioMinimalPresentation from './AudioMinimalPresentation'
import AudioMinimalData from './AudioMinimalData'

// NB: This button DOESN'T trigger the Audiobar - primarily for use in Dashboard and on Kids site
function AudioMinimalContainer({ audioObject, styling, withLabel }) {
  const { buttonRef, isPlaying, onClick, onKeyPress } = AudioMinimalData({
    audioObject,
  })
  return (
    <AudioMinimalPresentation
      buttonRef={buttonRef}
      isPlaying={isPlaying}
      onClick={onClick}
      onKeyPress={onKeyPress}
      withLabel={withLabel}
      styling={styling}
      audioObject={audioObject}
    />
  )
}
// PROPTYPES
const { bool, string, object } = PropTypes
AudioMinimalContainer.propTypes = {
  audioObject: object,
  withLabel: bool,
  styling: string,
}

export default AudioMinimalContainer
