import React from 'react'

// FPCC
import AudiobarPresentation from 'components/Audiobar/AudiobarPresentation'
import AudiobarPresentationMobile from 'components/Audiobar/AudiobarPresentationMobile'
import AudiobarData from 'components/Audiobar/AudiobarData'

function AudiobarContainer() {
  const {
    data,
    curTime,
    duration,
    isPlaying,
    onPlayPauseClick,
    open,
    close,
    volume,
    onVolumeChange,
    rate,
    onRateChange,
  } = AudiobarData()
  if (!open) {
    return null
  }
  return window.innerWidth > 768 ? (
    <AudiobarPresentation
      data={data}
      curTime={curTime}
      duration={duration}
      isPlaying={isPlaying}
      onPlayPauseClick={onPlayPauseClick}
      open={open}
      close={close}
      volume={volume}
      onVolumeChange={onVolumeChange}
      rate={rate}
      onRateChange={onRateChange}
    />
  ) : (
    <AudiobarPresentationMobile
      data={data}
      curTime={curTime}
      duration={duration}
      isPlaying={isPlaying}
      onPlayPauseClick={onPlayPauseClick}
      open={open}
      close={close}
      rate={rate}
      onRateChange={onRateChange}
    />
  )
}

export default AudiobarContainer
