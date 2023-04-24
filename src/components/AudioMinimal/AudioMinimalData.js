import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { Howl, Howler } from 'howler'
function AudioMinimalData({ src }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const buttonRef = useRef()
  const [sound, setSound] = useState({ src: src, howl: null })

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
        onplay: function () {
          setIsPlaying(true)
        },
        onend: function () {
          setIsPlaying(false)
        },
        onstop: function () {
          setIsPlaying(false)
        },
      })
      soundToPlay = newHowl
      setSound({ src: src, howl: newHowl })
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
