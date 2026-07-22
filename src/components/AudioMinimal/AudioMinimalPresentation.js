import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'

function AudioMinimalPresentation({
  audioId,
  buttonRef,
  buttonStyling = 'btn-tertiary btn-md-icon bg-inherit',
  isPlaying = false,
  label,
  onClick = () => {},
  onKeyPress = () => {},
}) {
  return (
    <button
      data-testid={`audio-btn-${audioId}`}
      type="button"
      onClick={onClick}
      onKeyDown={onKeyPress}
      ref={buttonRef}
      aria-live="off"
      aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
      className={buttonStyling}
    >
      {isPlaying === true ? getIcon('StopCircle') : getIcon('Audio')}
      {label && <span>{label}</span>}
    </button>
  )
}
// PROPTYPES
const { func, bool, object, string } = PropTypes
AudioMinimalPresentation.propTypes = {
  audioId: string,
  buttonStyling: string,
  isPlaying: bool,
  label: string,
  buttonRef: object,
  onClick: func,
  onKeyPress: func,
}

export default AudioMinimalPresentation
