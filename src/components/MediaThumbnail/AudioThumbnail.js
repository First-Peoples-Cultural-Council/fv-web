import React from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

// FPCC
import AudioNative from 'components/AudioNative'
import { useAudioObject } from 'common/dataHooks/useMedia'
import { AUDIO } from 'common/constants'

function AudioThumbnail(props) {
  const { id, type, containerStyles, audioStyles, labelStyles, ...other } =
    props

  const { sitename } = useParams()

  const mediaObject = useAudioObject({ sitename, id })

  return (
    <div className={containerStyles}>
      <AudioNative styling={audioStyles} audioObject={mediaObject} {...other} />
      <p className={labelStyles}>{mediaObject?.title}</p>
    </div>
  )
}

// PROPTYPES
const { string, oneOf } = PropTypes
AudioThumbnail.propTypes = {
  id: string,
  containerStyles: string,
  audioStyles: string,
  labelStyles: string,
  type: oneOf([AUDIO]),
}

AudioThumbnail.defaultProps = {
  containerStyles: 'elative w-72 block overflow-hidden',
  audioStyles: 'w-full',
  labelStyles: '',
}

export default AudioThumbnail
