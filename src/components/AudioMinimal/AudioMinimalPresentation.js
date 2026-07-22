import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'

function AudioMinimalPresentation({
  audioObject,
  buttonRef,
  styling = 'btn-tertiary btn-md-icon bg-inherit',
  isPlaying = false,
  withLabel = false,
  onClick = () => {},
  onKeyPress = () => {},
}) {
  return (
    <button
      data-testid={`audio-btn-${audioObject?.id}`}
      type="button"
      onClick={onClick}
      onKeyDown={onKeyPress}
      ref={buttonRef}
      aria-live="off"
      aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
      className={styling}
    >
      {isPlaying === true ? getIcon('StopCircle') : getIcon('Audio')}
      {withLabel && (
        <span>{audioObject?.speakers?.[0]?.name || 'Speaker'}</span>
      )}
    </button>
  )
}
// PROPTYPES
const { func, bool, object, string } = PropTypes
AudioMinimalPresentation.propTypes = {
  audioObject: object,
  styling: string,
  isPlaying: bool,
  withLabel: bool,
  buttonRef: object,
  onClick: func,
  onKeyPress: func,
}

export default AudioMinimalPresentation
