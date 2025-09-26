import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Howler } from 'howler'

// FPCC
import { getMediaPath } from 'common/utils/mediaHelpers'
import { AUDIO } from 'common/constants'

function AudioNativePresentation({
  audioObject,
  styling = 'text-charcoal-900 mx-auto print:hidden',
}) {
  const src = audioObject
    ? getMediaPath({ mediaObject: audioObject, type: AUDIO })
    : ''

  useEffect(() => {
    function handleMultiplPlayers(e) {
      const audio = document.getElementsByTagName('audio')
      for (let i = 0, len = audio.length; i < len; i += 1) {
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
const { object, string } = PropTypes
AudioNativePresentation.propTypes = {
  audioObject: object,
  styling: string,
}

export default AudioNativePresentation
