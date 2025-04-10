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
    ...other
  } = props

  const audioQueryResponse = useAudio({ id })
  const mediaObject = audioQueryResponse?.data

  return (
    <div className={containerStyles}>
      <AudioNative styling={audioStyles} audioObject={mediaObject} {...other} />
      <p className={labelStyles}>{mediaObject?.title}</p>
    </div>
  )
}

// PROPTYPES
const { string } = PropTypes
AudioThumbnail.propTypes = {
  id: string,
  containerStyles: string,
  audioStyles: string,
  labelStyles: string,
}

export default AudioThumbnail
