import { useState, useEffect } from 'react'
import { useLocation } from 'react-router'

// FPCC
import useSearchParamsState from 'common/hooks/useSearchParamsState'

function useSearchTerm({ displayValue = '' } = {}) {
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

  // Track whether to auto-fill the search term with displayValue
  const [useAutofill, setUseAutofill] = useState(true)

  const handleSearchTermChange = (event) => {
    event.preventDefault()
    setDisplayedSearchTerm(event.target.value)
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
    if (useAutofill && displayValue && !searchTermInUrl) {
      setDisplayedSearchTerm(displayValue)
      setSubmittedSearchTerm(displayValue)
      setUseAutofill(false) // Disable autofill after the first use
    }
  }, [displayValue, searchTermInUrl, useAutofill])

  useEffect(() => {
    // execute on path change if there is no query
    if (!searchTermInUrl && !displayValue) {
      setDisplayedSearchTerm('')
    }
  }, [location?.pathname, searchTermInUrl, displayValue])

  const clearSearchTerm = (event) => {
    event.preventDefault()
    setDisplayedSearchTerm('')
    setSubmittedSearchTerm('')
    removeSearchTermInUrl()
  }

  return {
    clearSearchTerm,
    displayedSearchTerm,
    submittedSearchTerm,
    setSubmittedSearchTerm,
    handleSearchTermChange,
    searchTermInUrl,
    setSearchTermInUrl,
  }
}

export default useSearchTerm
