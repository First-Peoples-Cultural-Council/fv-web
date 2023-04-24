import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { Howl, Howler } from 'howler'

// FPCC
import api from 'services/api'
import { useAudiobar } from 'context/AudiobarContext'
import { getMediaUrl } from 'common/urlHelpers'
import { getReadableFileSize } from 'common/stringHelpers'

function AudiobarData() {
  const { audioArray, setAudioArray } = useAudiobar()
  const audioId = audioArray?.[0]

  const [curTime, setCurTime] = useState('0:00')
  const [duration, setDuration] = useState('0:00')
  const [isOpen, setIsOpen] = useState(false)
  const [dataToUse, setDataToUse] = useState()
  const [isPlaying, setIsPlaying] = useState(false)
  const [sound, setSound] = useState({ id: '', howl: null })

  useEffect(() => {
    if (audioArray?.[0]?.length > 0) {
      sound?.howl?.stop()
      setIsOpen(true)
      generateSound(audioId)
    }
    if (audioArray?.length < 1) {
      setIsOpen(false)
    }
    return function cleanup() {
      setAudioArray()
    }
  }, [audioArray])

  const generateSound = (id) => {
    const src = getMediaUrl({ id: audioId, type: 'audio' })
    const newHowl = new Howl({
      src: [src, src, src],
      format: ['webm', 'wav', 'mp3'],
      rate: rate,
      html5: true, // Force to HTML5 so that the audio can stream in (best for large files).
      onload: function () {
        setDuration(formatTime(Math.round(newHowl.duration())))
      },
      onplay: function () {
        setIsPlaying(true)
        requestAnimationFrame(step)
      },
      onpause: function () {
        setIsPlaying(false)
      },
      onend: function () {
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

    setSound({ id: id, howl: newHowl })
    newHowl.play()
  }

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60) || 0
    const seconds = secs - minutes * 60 || 0
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  }

  // Data fetch
  const { data } = useQuery(['Audio', audioId], () => api.document.get({ id: audioId, contextParameters: 'media' }), {
    enabled: !!audioArray?.[0],
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  })

  useEffect(() => {
    if (data !== undefined) {
      const formattedData = audioDataAdaptor(data)
      setDataToUse(formattedData)
    }
  }, [data])

  const audioDataAdaptor = (audioData) => {
    const properties = audioData?.properties
    const file = properties?.['file:content']
    const contextParameters = audioData?.contextParameters?.media
    const speakers = []
    contextParameters?.sources?.forEach((source) => speakers.push(source?.['dc:title']))
    const recorders = []
    contextParameters?.recorders?.forEach((source) => recorders.push(source?.['dc:title']))

    let label = properties?.['dc:title'] || ''

    if (properties?.['dc:title']?.length > 0 && properties?.['dc:description'] > 0) {
      label = `${properties?.['dc:title']} - ${properties?.['dc:description']}`
    } else if (properties?.['dc:description']?.length > 0) {
      label = properties?.['dc:description']
    }

    return {
      id: audioData?.uid,
      title: properties?.['dc:title'] || '',
      description: properties?.['dc:description'] || '',
      acknowledgement: properties?.['fvm:acknowledgement'] || '',
      speakers: speakers,
      recorders: recorders,
      downloadLink: `/nuxeo/nxfile/default/${audioData?.uid}/file:content/${file?.name}`,
      fileSize: getReadableFileSize(file?.length),
      label: label,
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
