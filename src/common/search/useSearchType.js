import { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import {
  TYPE_PHRASE,
  TYPE_SONG,
  TYPE_STORY,
  TYPE_WORD,
  TYPE_DICTIONARY,
  TYPE_ENTRY,
} from 'common/constants'
import { getPresentationPropertiesForType } from 'common/utils/stringHelpers'

function useSearchType({ initialSearchType = TYPE_ENTRY }) {
  const [selectedSearchType, setSelectedSearchType] =
    useState(initialSearchType)

  const setSelectedSearchTypeWithDefaults = (newSearchType = TYPE_ENTRY) => {
    setSelectedSearchType(newSearchType)
  }

  const getSearchLabel = ({ searchType, plural = false }) => {
    const labels = getPresentationPropertiesForType(searchType)
    if (plural) return labels.plural
    return labels.singular
  }

  const handleSearchTypeChange = (event, key) => {
    setSelectedSearchType(key)
  }

  return {
    searchType: selectedSearchType,
    setSearchType: setSelectedSearchTypeWithDefaults,
    getSearchLabel,
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
