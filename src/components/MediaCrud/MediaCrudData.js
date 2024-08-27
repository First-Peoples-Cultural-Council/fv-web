import { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { getFriendlyDocType } from 'common/utils/stringHelpers'
import { AUDIO, IMAGE, VIDEO } from 'common/constants'

function MediaCrudData({ type, maxFiles }) {
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

  return {
    selectedMedia,
    setSelectedMedia,
    mediaSelectHandler,
    clearSelectedMedia,
    typeLabelPlural: typePlural,
  }
}

const { number, oneOf } = PropTypes

MediaCrudData.propTypes = {
  type: oneOf([AUDIO, IMAGE, VIDEO]),
  maxFiles: number,
}

export default MediaCrudData
