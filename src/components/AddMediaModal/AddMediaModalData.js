import { useState } from 'react'
import PropTypes from 'prop-types'

function AddMediaModalData({ maxFiles }) {
  const [selectedMedia, setSelectedMedia] = useState([])

  const mediaSelectHandler = (id) => {
    let updatedSelectedMedia = [...selectedMedia]
    if (selectedMedia.some((elemId) => elemId === id)) {
      updatedSelectedMedia = updatedSelectedMedia.filter(
        (elemId) => elemId !== id,
      )
    } else if (maxFiles && updatedSelectedMedia.length === maxFiles) {
      if (maxFiles === 1) {
        updatedSelectedMedia = [id]
      } else {
        return
      }
    } else {
      updatedSelectedMedia = [...updatedSelectedMedia, id]
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
  }
}

const { number } = PropTypes

AddMediaModalData.propTypes = {
  maxFiles: number,
}

export default AddMediaModalData
