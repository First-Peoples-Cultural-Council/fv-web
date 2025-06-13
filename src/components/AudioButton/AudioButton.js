import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { useAudiobar } from 'context/AudiobarContext'
import getIcon from 'common/utils/getIcon'

function AudioButton({ audioArray, hoverTooltip }) {
  const { setCurrentAudio } = useAudiobar()

  return audioArray?.map((audioObject) =>
    audioObject?.id ? (
      <button
        type="button"
        data-testid={`audio-btn-${audioObject.id}`}
        key={audioObject?.id}
        className="btn-tertiary btn-md-icon relative group"
        onClick={() => setCurrentAudio(audioObject)}
      >
        <div className="sr-only">Play audio</div>
        {getIcon('Audio', 'fill-current m-1 -translate-x-1')}
        {hoverTooltip ? (
          <div className="z-10 hidden group-hover:inline-flex absolute -bottom-8 -right-1 w-auto p-1 text-sm bg-charcoal-500 text-white text-center rounded-lg whitespace-nowrap">
            Play audio
          </div>
        ) : null}
      </button>
    ) : null,
  )
}
// PROPTYPES
const { array, string, bool } = PropTypes
AudioButton.propTypes = {
  audioArray: array,
  iconStyling: string,
  hoverTooltip: bool,
}

export default AudioButton
