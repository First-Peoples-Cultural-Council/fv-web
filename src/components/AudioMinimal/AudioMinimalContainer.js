import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import AudioMinimalPresentation from './AudioMinimalPresentation'
import AudioMinimalData from './AudioMinimalData'

function AudioMinimalContainer({
  src,
  id,
  icons,
  iconStyling,
  label,
  buttonStyling,
}) {
  const { buttonRef, isPlaying, onClick, onKeyPress } = AudioMinimalData({
    src,
    id,
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
  id: string,
  src: string,
  icons: object,
  iconStyling: string,
  label: string,
  buttonStyling: string,
}

export default AudioMinimalContainer
