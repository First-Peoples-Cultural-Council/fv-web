import React, { useContext, createContext, useMemo, useState } from 'react'

const AudiobarContext = createContext()

function useAudiobar() {
  const context = useContext(AudiobarContext)
  if (!context) {
    throw new Error('useAudiobar must be used within AudioProvider')
  }
  const [currentAudio, setCurrentAudio] = context
  return {
    currentAudio,
    setCurrentAudio,
  }
}

function AudiobarProvider(props) {
  const [currentAudio, setCurrentAudio] = useState()
  const value = useMemo(() => [currentAudio, setCurrentAudio], [currentAudio])
  return <AudiobarContext.Provider value={value} {...props} />
}

export { AudiobarProvider, useAudiobar }
