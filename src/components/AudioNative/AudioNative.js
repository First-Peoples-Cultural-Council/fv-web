import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Howler } from 'howler'

// FPCC
import { getMediaUrl } from 'common/urlHelpers'

function AudioNativePresentation({ audioId, styling }) {
  const src = audioId ? getMediaUrl({ type: 'audio', id: audioId }) : ''

  useEffect(() => {
    function handleMultiplPlayers(e) {
      const audio = document.getElementsByTagName('audio')
      for (let i = 0, len = audio.length; i < len; i++) {
        if (audio[i] !== e.target) {
          audio[i].pause()
        }
      }
    }

    document.addEventListener('play', handleMultiplPlayers, true)

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('play', handleMultiplPlayers)
    }
  })

  const onPlay = () => {
    Howler.stop()
  }

  return (
    <audio className={styling} src={src} controls onPlay={() => onPlay()} />
  )
}
// PROPTYPES
const { string } = PropTypes
AudioNativePresentation.propTypes = {
  audioId: string,
  styling: string,
}
AudioNativePresentation.defaultProps = {
  styling: 'text-black mx-auto print:hidden',
}

export default AudioNativePresentation
