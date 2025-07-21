import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import { AUDIO, IMAGE, VIDEO } from 'common/constants'
import { getPathForMediaType } from 'common/utils/mediaHelpers'
import useSearchTerm from 'common/hooks/useSearchTerm'
import useSiteMediaSearch from 'common/dataHooks/useSiteMediaSearch'
import useSharedMediaSearch from 'common/dataHooks/useSharedMediaSearch'

function useMediaSearchWithUrlSync({ type, searchSharedMedia = false }) {
  const path = getPathForMediaType(type)
  const [currentFile, setCurrentFile] = useState(null) // Used for the sidebar to display the current selected file

  const {
    displayedSearchTerm,
    handleSearchTermChange,
    submittedSearchTerm,
    setSubmittedSearchTerm,
    searchTermInUrl,
    setSearchTermInUrl,
  } = useSearchTerm()

  // Fetch search results
  const siteSearchResponse = useSiteMediaSearch({
    type,
    searchTerm: submittedSearchTerm,
  })
  const sharedMediaSearchResponse = useSharedMediaSearch({
    type,
    searchTerm: submittedSearchTerm,
    enabled: searchSharedMedia,
  })

  const infiniteQueryResponse = searchSharedMedia
    ? sharedMediaSearchResponse
    : siteSearchResponse

  const handleSearchSubmitWithUrlSync = (event) => {
    event.preventDefault()
    setSubmittedSearchTerm(displayedSearchTerm)
    setCurrentFile(null)
    if (displayedSearchTerm !== searchTermInUrl) {
      setSearchTermInUrl(displayedSearchTerm)
    }
  }

  useEffect(() => {
    if (!currentFile && infiniteQueryResponse?.data?.pages?.[0]?.results) {
      const firstFile = infiniteQueryResponse?.data?.pages?.[0]?.results?.[0]
      setCurrentFile(firstFile)
    }
  }, [currentFile, infiniteQueryResponse?.data, type])

  return {
    ...infiniteQueryResponse,
    displayedSearchTerm,
    handleSearchSubmitWithUrlSync,
    handleSearchTermChange,
    currentFile,
    setCurrentFile,
    typePlural: path,
  }
}

const { bool, oneOf } = PropTypes

useMediaSearchWithUrlSync.propTypes = {
  searchSharedMedia: bool,
  type: oneOf([AUDIO, IMAGE, VIDEO]),
}

export default useMediaSearchWithUrlSync
