import React, { useContext, createContext, useMemo, useState } from 'react'

const AudiobarContext = createContext()

function useAudiobar() {
  const context = useContext(AudiobarContext)
  if (!context) {
    throw new Error('useAudiobar must be used within AudioProvider')
  }
  const [audioArray, setAudioArray] = context
  return {
    audioArray,
    setAudioArray,
  }
}

function AudiobarProvider(props) {
  const [audioArray, setAudioArray] = useState()
  const value = useMemo(() => [audioArray, setAudioArray], [audioArray])
  return <AudiobarContext.Provider value={value} {...props} />
}

export { AudiobarProvider, useAudiobar }
