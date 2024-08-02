import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { useAudiobar } from 'context/AudiobarContext'
import getIcon from 'common/utils/getIcon'

function AudioButton({
  audioArray,
  iconStyling = 'fill-current text-fv-charcoal-light hover:text-fv-charcoal m-1 h-10 w-10',
  hoverTooltip,
}) {
  const { setCurrentAudio } = useAudiobar()

  return audioArray?.map((audioObject) =>
    audioObject?.id ? (
      <button
        type="button"
        key={audioObject?.id}
        className="print:hidden relative group"
        onClick={() => setCurrentAudio(audioObject)}
      >
        <div className="sr-only">Play audio</div>
        {getIcon('Audio', iconStyling)}
        {hoverTooltip ? (
          <div className="z-10 hidden group-hover:inline-flex absolute -bottom-8 -right-1 w-auto p-1 text-sm bg-fv-charcoal-light text-white text-center rounded-lg whitespace-nowrap">
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
