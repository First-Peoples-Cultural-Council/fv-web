import { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import {
  DOMAIN,
  DOMAIN_LANGUAGE,
  DOMAIN_BOTH,
  DOMAIN_TRANSLATION,
} from 'common/constants'
import useSearchParamsState from 'common/hooks/useSearchParamsState'
import {
  makeTitleCase,
  getPresentationPropertiesForType,
} from 'common/utils/stringHelpers'

function useSearchLanguage({ searchType }) {
  const [searchLanguage, setSearchLanguage] = useState()

  const [searchLanguageInUrl, setSearchLanguageInUrl] = useSearchParamsState({
    searchParamName: DOMAIN,
    defaultValue: DOMAIN_BOTH,
  })

  const labels = getPresentationPropertiesForType(searchType)

  const searchLanguageOptions = {
    [DOMAIN_BOTH]: 'All',
    [DOMAIN_TRANSLATION]: 'Translation',
    [DOMAIN_LANGUAGE]: makeTitleCase(labels.plural),
  }

  return {
    searchLanguage,
    setSearchLanguage,
    searchLanguageInUrl,
    setSearchLanguageInUrl,
    searchLanguageOptions,
  }
}

// PROPTYPES
const { string } = PropTypes

useSearchLanguage.propTypes = {
  entryLabel: string,
}

export default useSearchLanguage
