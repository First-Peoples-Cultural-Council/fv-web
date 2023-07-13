import { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import {
  DOMAIN_LANGUAGE,
  DOMAIN_BOTH,
  DOMAIN_TRANSLATION,
} from 'common/constants'

function useSearchLanguage({ entryLabel = 'Language Entry' }) {
  const [searchLanguage, setSearchLanguage] = useState()

  const searchLanguageOptions = {
    [DOMAIN_BOTH]: 'All',
    [DOMAIN_TRANSLATION]: 'Translation',
    [DOMAIN_LANGUAGE]: entryLabel,
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
