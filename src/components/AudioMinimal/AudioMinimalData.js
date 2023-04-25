import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Howl, Howler } from 'howler'
function AudioMinimalData({ src }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const buttonRef = useRef()
  const [sound, setSound] = useState({ src, howl: null })

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
        src: [src, src, src],
        format: ['webm', 'wav', 'mp3'],
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
      setSound({ src, howl: newHowl })
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
const { string } = PropTypes
AudioMinimalData.propTypes = {
  src: string.isRequired,
}

export default AudioMinimalData
