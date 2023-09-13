import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

// FPCC
import {
  TYPE_PHRASE,
  TYPE_SONG,
  TYPE_STORY,
  TYPE_WORD,
  TYPE_DICTIONARY,
  TYPE_ENTRY,
  TYPES,
} from 'common/constants'
import { getPresentationPropertiesForType } from 'common/utils/stringHelpers'
import useSearchParamsState from 'common/hooks/useSearchParamsState'

function useSearchType({ initialSearchType = TYPE_ENTRY }) {
  const [searchTypeInUrl, setSearchTypeInUrl] = useSearchParamsState({
    searchParamName: TYPES,
    defaultValue: initialSearchType,
  })

  const [selectedSearchType, setSelectedSearchType] =
    useState(initialSearchType)

  const setSelectedSearchTypeWithDefaults = (newSearchType = TYPE_ENTRY) => {
    setSelectedSearchType(newSearchType)
  }

  const getSearchTypeLabel = ({ searchType, plural = false }) => {
    const labels = getPresentationPropertiesForType(searchType)
    if (plural) return labels.plural
    return labels.singular
  }

  const handleSearchTypeChange = (event, key) => {
    setSelectedSearchType(key)
  }

  // This is to keep selectedSearchType and searchTypeInUrl in sync when on url driven pages
  useEffect(() => {
    if (searchTypeInUrl && searchTypeInUrl !== selectedSearchType) {
      setSelectedSearchTypeWithDefaults(searchTypeInUrl)
    }
  }, [selectedSearchType, searchTypeInUrl])

  return {
    searchType: selectedSearchType,
    setSearchType: setSelectedSearchTypeWithDefaults,
    searchTypeInUrl,
    setSearchTypeInUrl,
    getSearchTypeLabel,
    handleSearchTypeChange,
  }
}

// PROPTYPES
const { oneOf } = PropTypes
useSearchType.propTypes = {
  initialSearchType: oneOf([
    TYPE_PHRASE,
    TYPE_SONG,
    TYPE_STORY,
    TYPE_WORD,
    TYPE_DICTIONARY,
    TYPE_ENTRY,
  ]),
}

export default useSearchType
