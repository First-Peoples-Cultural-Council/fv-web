import { useState, useRef } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useInfiniteQuery } from 'react-query'
import PropTypes from 'prop-types'

// FPCC
import { useSiteStore } from 'context/SiteContext'
import useIntersectionObserver from 'common/useIntersectionObserver'
import api from 'services/api'
import { getFriendlyDocType } from 'common/stringHelpers'
import {
  SUPPORTED_IMAGE_EXTENSIONS,
  SUPPORTED_VIDEO_EXTENSIONS,
  SUPPORTED_AUDIO_EXTENSIONS,
  DOC_AUDIO,
  DOC_IMAGE,
  DOC_VIDEO,
} from 'common/constants/docTypes'

function MediaCrudData({ docType, maxFiles }) {
  const { site } = useSiteStore()
  const { search } = useLocation()
  const { sitename } = useParams()
  const navigate = useNavigate()

  const searchParamsQuery = new URLSearchParams(search).get('q') ? new URLSearchParams(search).get('q') : ''
  const pluralDocTypeLabel = getFriendlyDocType({ docType: docType, plural: true })

  const [selectedMedia, setSelectedMedia] = useState([])
  const [searchTerm, setSearchTerm] = useState(searchParamsQuery)
  const [searchInputValue, setSearchInputValue] = useState(searchParamsQuery)

  // Data Fetch
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, refetch } = useInfiniteQuery(
    [`${docType}-search`, searchTerm],
    ({ pageParam = 0 }) =>
      api.media.get({ siteId: site?.uid, searchTerm: searchTerm, type: docType, pageParam: pageParam }),
    {
      // The query will not execute until the siteId exists
      enabled: !!site?.uid,
      getNextPageParam: (lastPage) => lastPage.nextPage,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  )

  const infiniteScroll = { fetchNextPage, hasNextPage, isFetchingNextPage }

  const loadRef = useRef(null)
  useIntersectionObserver({
    target: loadRef,
    onIntersect: fetchNextPage,
    enabled: hasNextPage,
  })

  const getLoadLabel = () => {
    if (infiniteScroll?.isFetchingNextPage) {
      return 'Loading more...'
    } else if (infiniteScroll?.hasNextPage) {
      return 'Load more'
    } else {
      return 'End of results.'
    }
  }

  const handleTextFieldChange = (event) => {
    event.preventDefault()
    setSearchInputValue(event.target.value)
  }
  const handleSearchSubmit = (event) => {
    event.preventDefault()
    setSearchTerm(searchInputValue)
    if (docType) {
      // If in modal trigger refetch NOT navigate
      refetch()
    } else if (searchInputValue) {
      navigate(`/${sitename}/dashboard/media/browser?type=${pluralDocTypeLabel}&q=${searchInputValue}`)
    } else if (!searchInputValue) {
      navigate(`/${sitename}/dashboard/media/browser?type=${pluralDocTypeLabel}`)
    }
  }

  const mediaSelectHandler = (docId) => {
    let updatedSelectedMedia = [...selectedMedia]
    if (selectedMedia.some((elemId) => elemId == docId)) {
      updatedSelectedMedia = updatedSelectedMedia.filter((elemId) => elemId != docId)
    } else if (maxFiles && updatedSelectedMedia.length == maxFiles) {
      if (maxFiles == 1) {
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
      case DOC_IMAGE:
        return SUPPORTED_IMAGE_EXTENSIONS
      case DOC_VIDEO:
        return SUPPORTED_VIDEO_EXTENSIONS
      case DOC_AUDIO:
        return SUPPORTED_AUDIO_EXTENSIONS
      default:
        return SUPPORTED_IMAGE_EXTENSIONS
    }
  })()

  const docTypeLabelPlural = getFriendlyDocType({ docType, plural: true, isAnd: true })

  return {
    site,
    handleSearchSubmit,
    handleTextFieldChange,
    infiniteScroll,
    isLoadingEntries: isLoading,
    loadRef,
    fetchedMedia: data,
    searchValue: searchInputValue,
    loadLabel: getLoadLabel(),
    selectedMedia: selectedMedia,
    setSelectedMedia: setSelectedMedia,
    mediaSelectHandler: mediaSelectHandler,
    clearSelectedMedia: clearSelectedMedia,
    docTypeLabelPlural: docTypeLabelPlural,
    extensionList: extensionList,
  }
}

const { number, oneOf } = PropTypes

MediaCrudData.propTypes = {
  docType: oneOf([DOC_AUDIO, DOC_IMAGE, DOC_VIDEO]),
  maxFiles: number,
}

export default MediaCrudData
