import { useEffect, useState } from 'react'
import { Howl, Howler } from 'howler'

// FPCC
import { useAudiobar } from 'context/AudiobarContext'
import { AUDIO } from 'common/constants'
import { getMediaPath } from 'common/utils/mediaHelpers'

function AudiobarData() {
  const { currentAudio, setCurrentAudio } = useAudiobar()

  const [curTime, setCurTime] = useState('0:00')
  const [duration, setDuration] = useState('0:00')
  const [isOpen, setIsOpen] = useState(false)
  const [dataToUse, setDataToUse] = useState()
  const [isPlaying, setIsPlaying] = useState(false)
  const [sound, setSound] = useState({ id: '', howl: null })

  useEffect(() => {
    if (currentAudio) {
      sound?.howl?.stop()
      setIsOpen(true)
      generateSound(currentAudio)
      const formattedData = audioDataAdaptor(currentAudio)
      setDataToUse(formattedData)
    }

    return function cleanup() {
      setCurrentAudio()
    }
  }, [currentAudio])

  const generateSound = (object) => {
    const src = getMediaPath({ mediaObject: object, type: AUDIO })
    const newHowl = new Howl({
      src: [src],
      rate,
      html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
      onload() {
        setDuration(formatTime(Math.round(newHowl.duration())))
      },
      onplay() {
        setIsPlaying(true)
        requestAnimationFrame(step)
      },
      onpause() {
        setIsPlaying(false)
      },
      onend() {
        setIsPlaying(false)
      },
    })

    const step = () => {
      // Determine our current seek position.
      const seek = newHowl?.seek() || 0
      const currentTime = formatTime(Math.round(seek))
      setCurTime(currentTime)

      // If the sound is still playing, continue stepping.
      if (newHowl?.playing()) {
        window.requestAnimationFrame(step)
      }
    }

    setSound({ id: object?.id, howl: newHowl })
    newHowl.play()
  }

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60) || 0
    const seconds = secs - minutes * 60 || 0
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const audioDataAdaptor = (object) => {
    let label = object?.title || ''

    if (object?.title?.length > 0 && object?.description > 0) {
      label = `${object?.title} - ${object?.description}`
    } else if (object?.description?.length > 0) {
      label = object?.description
    }

    return {
      id: object?.id,
      title: object?.title || '',
      description: object?.description || '',
      acknowledgement: object?.acknowledgement || '',
      speakers: object?.speakers || [],
      downloadLink: object?.original?.path || '',
      fileSize: object?.original?.fileSize || '',
      label,
    }
  }

  const onPlayPauseClick = () => {
    if (isPlaying) {
      sound?.howl?.pause()
    } else {
      sound?.howl?.play()
    }
  }

  // Volume
  const [volume, setVolume] = useState(5)

  const onVolumeChange = (val) => {
    const volumeDecimal = val / 10
    Howler.volume(volumeDecimal)
    setVolume(val)
  }

  const onClose = () => {
    setIsOpen(false)
    sound?.howl?.pause()
    setIsPlaying(false)
  }

  // Rate
  const [rate, setRate] = useState(1)

  const onRateChange = () => {
    let newRate
    if (rate >= 1.5) {
      newRate = 0.5
    } else {
      newRate = rate + 0.25
    }
    setRate(newRate)
    sound?.howl?.rate(newRate)
  }

  return {
    data: dataToUse,
    curTime,
    duration,
    isPlaying,
    onPlayPauseClick,
    open: isOpen,
    close: onClose,
    volume,
    onVolumeChange,
    rate,
    onRateChange,
  }
}

export default AudiobarData
