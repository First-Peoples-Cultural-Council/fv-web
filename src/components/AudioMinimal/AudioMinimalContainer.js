import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import AudioMinimalPresentation from './AudioMinimalPresentation'
import AudioMinimalData from './AudioMinimalData'

function AudioMinimalContainer({
  audioObject,
  icons,
  iconStyling,
  label,
  buttonStyling,
}) {
  const { buttonRef, isPlaying, onClick, onKeyPress } = AudioMinimalData({
    audioObject,
  })
  return (
    <AudioMinimalPresentation
      buttonRef={buttonRef}
      isPlaying={isPlaying}
      onClick={onClick}
      onKeyPress={onKeyPress}
      icons={icons}
      iconStyling={iconStyling}
      label={label}
      buttonStyling={buttonStyling}
    />
  )
}
// PROPTYPES
const { string, object } = PropTypes
AudioMinimalContainer.propTypes = {
  audioObject: object,
  icons: object,
  iconStyling: string,
  label: string,
  buttonStyling: string,
}

export default AudioMinimalContainer
