import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import PropTypes from 'prop-types'

// FPCC
import {
  AUDIO,
  IMAGE,
  VIDEO,
  TYPES,
  HAS_SITE_FEATURE,
  SHARED_MEDIA,
  SORT,
  SORT_CREATED_DESC,
} from 'common/constants'
import { getPathForMediaType } from 'common/utils/mediaHelpers'
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import useSearchAllSitesLoader from 'common/dataHooks/useSearchAllSitesLoader'

function useMediaSearch({ type, library }) {
  const searchSharedMedia = library === SHARED_MEDIA
  const [searchParams, setSearchParams] = useSearchParams()

  const path = getPathForMediaType(type)

  const searchParamsQuery = searchParams.get('q') || ''
  const [currentFile, setCurrentFile] = useState() // Used for the sidebar to display the current selected file
  const [searchTerm, setSearchTerm] = useState(searchParamsQuery)
  const [searchInputValue, setSearchInputValue] = useState(searchParamsQuery)

  const siteSearchParams = new URLSearchParams({
    q: searchTerm,
    [TYPES]: type,
    [SORT]: searchTerm ? null : SORT_CREATED_DESC,
  })

  const sharedMediaSearchParams = new URLSearchParams({
    q: searchTerm,
    [TYPES]: type,
    [SORT]: searchTerm ? null : SORT_CREATED_DESC,
    [HAS_SITE_FEATURE]: SHARED_MEDIA,
  })

  // Fetch search results
  const siteSearchResponse = useSearchLoader({ searchParams: siteSearchParams })
  const sharedMediaSearchResponse = useSearchAllSitesLoader({
    searchParams: sharedMediaSearchParams,
  })

  const response = searchSharedMedia
    ? sharedMediaSearchResponse
    : siteSearchResponse

  const handleTextFieldChange = (event) => {
    event.preventDefault()
    setSearchInputValue(event.target.value)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    setSearchTerm(searchInputValue)
  }

  const handleSearchSubmitWithUrlSync = (event) => {
    handleSearchSubmit(event)
    setSearchParams({ q: searchInputValue })
  }

  useEffect(() => {
    if (!currentFile && response?.data?.pages?.[0]?.results) {
      const firstFile = response?.data?.pages?.[0]?.results?.[0]
      setCurrentFile(firstFile)
    }
  }, [currentFile, response?.data, type])

  const getLoadLabel = () => {
    if (response?.infiniteScroll?.isFetchingNextPage) {
      return 'Loading more...'
    }
    if (response?.infiniteScroll?.hasNextPage) {
      return 'Load more'
    }
    return 'End of results.'
  }

  return {
    handleSearchSubmit,
    handleSearchSubmitWithUrlSync,
    handleTextFieldChange,
    infiniteScroll: response?.infiniteScroll,
    isLoadingEntries: response?.isLoading,
    loadRef: response?.loadRef,
    media: response?.data,
    searchValue: searchInputValue,
    currentFile,
    setCurrentFile,
    loadLabel: getLoadLabel(),
    typePlural: path,
  }
}

const { oneOf, string } = PropTypes

useMediaSearch.propTypes = {
  type: oneOf([AUDIO, IMAGE, VIDEO]),
  library: string,
}

export default useMediaSearch
