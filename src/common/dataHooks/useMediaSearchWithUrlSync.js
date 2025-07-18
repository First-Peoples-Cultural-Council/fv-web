import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import {
  AUDIO,
  IMAGE,
  VIDEO,
  TYPES,
  SORT,
  SORT_CREATED_DESC,
} from 'common/constants'
import { getPathForMediaType } from 'common/utils/mediaHelpers'
import useSearchLoader from 'common/dataHooks/useSearchLoader'
import useSearchTerm from 'common/hooks/useSearchTerm'

function useMediaSearchWithUrlSync({ type }) {
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

  const siteSearchParams = new URLSearchParams({
    q: submittedSearchTerm,
    [TYPES]: type,
    [SORT]: submittedSearchTerm ? null : SORT_CREATED_DESC,
  })

  const infiniteQueryResponse = useSearchLoader({
    searchParams: siteSearchParams,
  })

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

const { oneOf } = PropTypes

useMediaSearchWithUrlSync.propTypes = {
  type: oneOf([AUDIO, IMAGE, VIDEO]),
}

export default useMediaSearchWithUrlSync
