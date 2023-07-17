import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Howl, Howler } from 'howler'

// FPCC
import { AUDIO, ORIGINAL } from 'common/constants'
import { getMediaPath } from 'common/utils/mediaHelpers'
function AudioMinimalData({ audioObject }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const buttonRef = useRef()
  const src = getMediaPath({
    mediaObject: audioObject,
    type: AUDIO,
    size: ORIGINAL,
  })
  const [sound, setSound] = useState({ id: '', howl: null })

  const onAudioClick = () => {
    Howler.stop()
    if (isPlaying) {
      return
    }
    let soundToPlay
    if (sound?.howl) {
      soundToPlay = sound.howl
    } else {
      const newHowl = new Howl({
        src: [src],
        html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
        onplay() {
          setIsPlaying(true)
        },
        onend() {
          setIsPlaying(false)
        },
        onstop() {
          setIsPlaying(false)
        },
      })
      soundToPlay = newHowl
      setSound({ id: audioObject?.id, howl: newHowl })
    }
    soundToPlay.play()
  }

  return {
    isPlaying,
    onClick: () => onAudioClick(),
    onKeyPress: ({ code }) => {
      if (code === 'Enter') onAudioClick()
    },
    buttonRef,
  }
}

// PROPTYPES
const { object } = PropTypes
AudioMinimalData.propTypes = {
  audioObject: object.isRequired,
}

export default AudioMinimalData
