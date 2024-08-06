import { useState, useEffect } from 'react'
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

function useSearchDomain({ searchType }) {
  const [searchDomainInUrl, setSearchDomainInUrl] = useSearchParamsState({
    searchParamName: DOMAIN,
    defaultValue: DOMAIN_BOTH,
  })

  const [searchDomain, setSearchDomain] = useState(DOMAIN_BOTH)

  // This is to keep searchDomain and searchDomainInUrl in sync when on url driven pages
  useEffect(() => {
    if (searchDomainInUrl && searchDomainInUrl !== searchDomain) {
      setSearchDomain(searchDomainInUrl)
    }
  }, [searchDomain, searchDomainInUrl])

  const labels = getPresentationPropertiesForType(searchType)

  const searchDomainOptions = {
    [DOMAIN_BOTH]: 'All',
    [DOMAIN_TRANSLATION]: 'Translation',
    [DOMAIN_LANGUAGE]: makeTitleCase(labels.plural),
  }

  const handleSearchDomainNavigation = (value) => {
    setSearchDomain(value)
    setSearchDomainInUrl(value)
  }

  return {
    searchDomain,
    setSearchDomain,
    searchDomainInUrl,
    setSearchDomainInUrl,
    searchDomainOptions,
    handleSearchDomainNavigation,
  }
}

// PROPTYPES
const { string } = PropTypes

useSearchDomain.propTypes = {
  searchType: string,
}

export default useSearchDomain
