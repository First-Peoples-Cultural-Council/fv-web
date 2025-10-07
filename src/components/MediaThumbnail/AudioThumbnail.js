import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import AudioNative from 'components/AudioNative'
import { useAudio } from 'common/dataHooks/useAudio'

function AudioThumbnail(props) {
  const {
    id,
    containerStyles = 'relative w-72 block overflow-hidden',
    audioStyles = 'w-full',
    labelStyles = '',
    audioObject,
    ...other
  } = props

  // if an id is provided (not an audioBoject) fetch the audio object using the id
  const audioQueryResponse = useAudio({ id })
  const fetchedAudioObject = audioQueryResponse?.data

  return (
    <div className={containerStyles}>
      <AudioNative
        styling={audioStyles}
        audioObject={audioObject || fetchedAudioObject}
        {...other}
      />
      <p className={labelStyles}>
        {audioObject?.title || fetchedAudioObject?.title}
      </p>
    </div>
  )
}

// PROPTYPES
const { string, object } = PropTypes
AudioThumbnail.propTypes = {
  id: string,
  containerStyles: string,
  audioObject: object,
  audioStyles: string,
  labelStyles: string,
}

export default AudioThumbnail
