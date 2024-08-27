import { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { getFriendlyDocType } from 'common/utils/stringHelpers'
import {
  SUPPORTED_IMAGE_EXTENSIONS,
  SUPPORTED_VIDEO_EXTENSIONS,
  SUPPORTED_AUDIO_EXTENSIONS,
  AUDIO,
  IMAGE,
  VIDEO,
} from 'common/constants'
import { useSiteStore } from 'context/SiteContext'

function MediaCrudData({ type, maxFiles }) {
  const { site } = useSiteStore()

  const typePlural = getFriendlyDocType({ type, plural: true })

  const [selectedMedia, setSelectedMedia] = useState([])

  const mediaSelectHandler = (docId) => {
    let updatedSelectedMedia = [...selectedMedia]
    if (selectedMedia.some((elemId) => elemId === docId)) {
      updatedSelectedMedia = updatedSelectedMedia.filter(
        (elemId) => elemId !== docId,
      )
    } else if (maxFiles && updatedSelectedMedia.length === maxFiles) {
      if (maxFiles === 1) {
        updatedSelectedMedia = [docId]
      } else {
        return
      }
    } else {
      updatedSelectedMedia = [...updatedSelectedMedia, docId]
    }
    setSelectedMedia(updatedSelectedMedia)
  }

  const clearSelectedMedia = () => {
    setSelectedMedia([])
  }

  const extensionList = (() => {
    switch (type) {
      case IMAGE:
        return SUPPORTED_IMAGE_EXTENSIONS
      case VIDEO:
        return SUPPORTED_VIDEO_EXTENSIONS
      case AUDIO:
        return SUPPORTED_AUDIO_EXTENSIONS
      default:
        return SUPPORTED_IMAGE_EXTENSIONS
    }
  })()

  return {
    site,
    selectedMedia,
    setSelectedMedia,
    mediaSelectHandler,
    clearSelectedMedia,
    typeLabelPlural: typePlural,
    extensionList,
  }
}

const { number, oneOf } = PropTypes

MediaCrudData.propTypes = {
  type: oneOf([AUDIO, IMAGE, VIDEO]),
  maxFiles: number,
}

export default MediaCrudData
