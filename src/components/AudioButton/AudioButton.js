import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import { useAudiobar } from 'context/AudiobarContext'
import getIcon from 'common/utils/getIcon'
import Tooltip from 'components/Tooltip'

function AudioButton({ audioArray }) {
  const { setCurrentAudio } = useAudiobar()

  return audioArray?.map((audioObject) =>
    audioObject?.id ? (
      <Tooltip key={audioObject?.id} message="Play audio">
        <label htmlFor={`audio-btn-${audioObject.id}`} className="sr-only">
          Play audio
        </label>
        <button
          type="button"
          id={`audio-btn-${audioObject.id}`}
          data-testid={`audio-btn-${audioObject.id}`}
          key={audioObject?.id}
          className="btn-tertiary btn-md-icon"
          onClick={() => setCurrentAudio(audioObject)}
        >
          {getIcon('Audio')}
        </button>
      </Tooltip>
    ) : null,
  )
}
// PROPTYPES
const { array } = PropTypes
AudioButton.propTypes = {
  audioArray: array,
}

export default AudioButton
