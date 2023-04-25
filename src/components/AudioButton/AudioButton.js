import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { useAudiobar } from 'context/AudiobarContext'
import getIcon from 'common/getIcon'

function AudioButton({ audioArray, iconStyling, hoverTooltip }) {
  const { setAudioArray } = useAudiobar()

  const audioButtons = audioArray.map((audioId, index) => (
    <button
      key={index}
      className="print:hidden relative group"
      onClick={() => setAudioArray([audioId])}
    >
      <label className="sr-only">Play audio</label>
      {getIcon('Audio', iconStyling)}
      {hoverTooltip ? (
        <div className="z-10 hidden group-hover:inline-flex absolute -bottom-8 -right-1 w-auto p-1 text-sm bg-fv-charcoal-light text-white text-center rounded-lg whitespace-nowrap">
          Play audio
        </div>
      ) : null}
    </button>
  ))
  return audioArray?.length > 0 ? audioButtons : ''
}
// PROPTYPES
const { array, string, bool } = PropTypes
AudioButton.propTypes = {
  audioArray: array,
  iconStyling: string,
  hoverTooltip: bool,
}

AudioButton.defaultProps = {
  iconStyling:
    'fill-current text-fv-charcoal-light hover:text-fv-charcoal m-1 h-10 w-10',
}

export default AudioButton
