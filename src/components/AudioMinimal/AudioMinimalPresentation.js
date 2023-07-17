import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import getIcon from 'common/utils/getIcon'

function AudioMinimalPresentation({
  buttonRef,
  buttonStyling,
  icons,
  iconStyling,
  isPlaying,
  label,
  onClick,
  onKeyPress,
}) {
  const iconsDefault = {
    Play: getIcon('PlayCircle', iconStyling),
    Stop: getIcon('StopCircle', iconStyling),
  }
  const Icons = { ...iconsDefault, ...icons }

  return (
    <button
      type="button"
      onClick={onClick}
      onKeyDown={onKeyPress}
      ref={buttonRef}
      aria-live="off"
      aria-label={isPlaying ? 'Pause audio' : 'Play audio'}
      className={buttonStyling}
    >
      {isPlaying === true ? Icons.Stop : Icons.Play}
      {label}
    </button>
  )
}
// PROPTYPES
const { func, bool, object, string } = PropTypes
AudioMinimalPresentation.propTypes = {
  /** Use to override the default icons. Eg: icons={{Play: jsx, Pause: jsx, Error: jsx}}  */
  icons: object,
  /** Use to style icons */
  iconStyling: string,
  /** Use to style encasing button */
  buttonStyling: string,
  isPlaying: bool,
  /** Optional abel for button */
  label: string,
  buttonRef: object,
  onClick: func,
  onKeyPress: func,
}
AudioMinimalPresentation.defaultProps = {
  iconStyling: 'fill-current w-7 h-7 lg:w-8 lg:h-8 xl:w-12 xl:h-12',
  buttonStyling: '',
  isPlaying: false,
  onClick: () => {},
  onKeyPress: () => {},
}

export default AudioMinimalPresentation
