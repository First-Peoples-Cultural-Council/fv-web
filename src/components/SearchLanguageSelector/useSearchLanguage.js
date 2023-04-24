import { useState } from 'react'
import PropTypes from 'prop-types'

function useSearchLanguage({ entryLabel = 'Language Entry' }) {
  const [searchLanguage, setSearchLanguage] = useState()

  const searchLanguageOptions = {
    BOTH: 'All',
    ENGLISH: 'Translation',
    LANGUAGE: entryLabel,
  }

  const handleSearchLanguageChange = (event, key) => {
    setSearchLanguage(key)
  }

  return {
    searchLanguage,
    setSearchLanguage,
    searchLanguageOptions,
    handleSearchLanguageChange,
  }
}

// PROPTYPES
const { string } = PropTypes

useSearchLanguage.propTypes = {
  entryLabel: string,
}

export default useSearchLanguage
