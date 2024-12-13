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

function useMediaSearch({ type, searchSharedMedia }) {
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
    enabled: searchSharedMedia,
  })

  const infiniteQueryResponse = searchSharedMedia
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
    if (!currentFile && infiniteQueryResponse?.data?.pages?.[0]?.results) {
      const firstFile = infiniteQueryResponse?.data?.pages?.[0]?.results?.[0]
      setCurrentFile(firstFile)
    }
  }, [currentFile, infiniteQueryResponse?.data, type])

  return {
    ...infiniteQueryResponse,
    handleSearchSubmit,
    handleSearchSubmitWithUrlSync,
    handleTextFieldChange,
    searchValue: searchInputValue,
    currentFile,
    setCurrentFile,
    typePlural: path,
  }
}

const { oneOf, bool } = PropTypes

useMediaSearch.propTypes = {
  type: oneOf([AUDIO, IMAGE, VIDEO]),
  searchSharedMedia: bool,
}

export default useMediaSearch
