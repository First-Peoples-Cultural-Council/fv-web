import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
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
  TYPES,
} from 'common/constants'
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import { useSiteStore } from 'context/SiteContext'

function MediaCrudData({ docType, maxFiles }) {
  const { site } = useSiteStore()
  const [searchParams] = useSearchParams()

  const docTypePlural = getFriendlyDocType({ docType, plural: true })

  const [selectedMedia, setSelectedMedia] = useState([])
  const searchParamsQuery = searchParams.get('q') || ''
  const [searchTerm, setSearchTerm] = useState(searchParamsQuery)
  const [searchInputValue, setSearchInputValue] = useState(searchParamsQuery)

  const _searchParams = new URLSearchParams({
    q: searchTerm,
    [TYPES]: docType,
    sort: searchTerm ? '' : 'created_desc',
  })
  const { data, infiniteScroll, isInitialLoading, loadRef } = useSearchLoader({
    searchParams: _searchParams,
  })

  const handleTextFieldChange = (event) => {
    event.preventDefault()
    setSearchInputValue(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    setSearchTerm(searchInputValue)
  }

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
    switch (docType) {
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

  const getLoadLabel = () => {
    if (infiniteScroll?.isFetchingNextPage) {
      return 'Loading more...'
    }
    if (infiniteScroll?.hasNextPage) {
      return 'Load more'
    }
    return 'End of results.'
  }

  return {
    site,
    handleSearchSubmit,
    handleTextFieldChange,
    infiniteScroll,
    loadRef,
    fetchedMedia: data,
    searchValue: searchInputValue,
    loadLabel: getLoadLabel(),
    selectedMedia,
    setSelectedMedia,
    mediaSelectHandler,
    clearSelectedMedia,
    docTypeLabelPlural: docTypePlural,
    isLoadingEntries: isInitialLoading,
    extensionList,
  }
}

const { number, oneOf } = PropTypes

MediaCrudData.propTypes = {
  docType: oneOf([AUDIO, IMAGE, VIDEO]),
  maxFiles: number,
}

export default MediaCrudData
