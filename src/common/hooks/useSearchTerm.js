import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// FPCC
import useSearchParamsState from 'common/hooks/useSearchParamsState'

function useSearchTerm() {
  const location = useLocation()
  // update search settings when url changes
  const [searchTermInUrl, setSearchTermInUrl, removeSearchTermInUrl] =
    useSearchParamsState({
      searchParamName: 'q',
      defaultValue: '',
    })

  // basic search term state
  const [displayedSearchTerm, setDisplayedSearchTerm] = useState('')
  const [submittedSearchTerm, setSubmittedSearchTerm] = useState('')

  const handleSearchTermChange = (event) => {
    event.preventDefault()
    setDisplayedSearchTerm(event.target.value)
  }

  const handleSearchTermSubmit = (event) => {
    event.preventDefault()
    setSubmittedSearchTerm(displayedSearchTerm)
  }

  // This is to keep submittedSearchTerm and searchTermInUrl in sync when on url driven pages
  useEffect(() => {
    if (searchTermInUrl && searchTermInUrl !== submittedSearchTerm) {
      setSubmittedSearchTerm(searchTermInUrl)
    }
  }, [searchTermInUrl, submittedSearchTerm, setSubmittedSearchTerm])

  // If Url Query Param exists on load or if it changes, set the displayed search term
  useEffect(() => {
    if (searchTermInUrl) {
      setDisplayedSearchTerm(searchTermInUrl)
    }
  }, [searchTermInUrl, setDisplayedSearchTerm])

  useEffect(() => {
    // execute on path change if there is no query
    if (!searchTermInUrl) {
      setDisplayedSearchTerm('')
    }
  }, [location?.pathname, searchTermInUrl])

  return {
    displayedSearchTerm,
    setDisplayedSearchTerm,
    submittedSearchTerm,
    setSubmittedSearchTerm,
    handleSearchTermChange,
    handleSearchTermSubmit,
    searchTermInUrl,
    setSearchTermInUrl,
    removeSearchTermInUrl,
  }
}

export default useSearchTerm
