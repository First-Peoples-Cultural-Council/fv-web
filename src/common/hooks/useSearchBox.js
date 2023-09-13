import { useState, useEffect } from 'react'
import { useSearchParams, useLocation } from 'react-router-dom'

function useSearchBox() {
  const location = useLocation()
  // update search settings when url changes
  const [searchParams] = useSearchParams()
  const searchParamQuery = searchParams.get('q') || ''

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

  // This is to keep submittedSearchTerm and searchParamQuery in sync when on url driven pages
  useEffect(() => {
    if (searchParamQuery && searchParamQuery !== submittedSearchTerm) {
      setSubmittedSearchTerm(searchParamQuery)
    }
  }, [searchParamQuery, submittedSearchTerm, setSubmittedSearchTerm])

  // If Url Query Param exists on load or if it changes, set the displayed search term
  useEffect(() => {
    if (searchParamQuery) {
      setDisplayedSearchTerm(searchParamQuery)
    }
  }, [searchParamQuery, setDisplayedSearchTerm])

  useEffect(() => {
    // execute on path change if there is no query
    if (!searchParamQuery) {
      setDisplayedSearchTerm('')
    }
  }, [location?.pathname, searchParamQuery])

  return {
    displayedSearchTerm,
    setDisplayedSearchTerm,
    submittedSearchTerm,
    setSubmittedSearchTerm,
    handleSearchTermChange,
    handleSearchTermSubmit,
  }
}

export default useSearchBox
