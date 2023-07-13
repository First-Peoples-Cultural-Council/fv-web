import { useState } from 'react'

function useSearchBox() {
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
