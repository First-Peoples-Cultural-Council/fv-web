import { useState } from 'react'
import PropTypes from 'prop-types'

import { DOC_BOOK, DOC_PHRASE, DOC_SONG, DOC_STORY, DOC_WORD } from 'common/constants'

function useSearchType({ initialSearchType = 'ALL' }) {
  const [selectedSearchType, setSelectedSearchType] = useState(initialSearchType)

  const setSelectedSearchTypeWithDefaults = (newSearchType = 'ALL') => {
    setSelectedSearchType(newSearchType)
  }

  const allSearchTypes = {}
  const addSearchTypeData = (searchDocType, label, labelPlural) => {
    allSearchTypes[searchDocType] = { searchDocType, label, labelPlural }
  }

  addSearchTypeData('SONG_AND_STORY', 'song / story', 'songs / stories')
  addSearchTypeData('BOOK', 'song / story', 'songs / stories')
  addSearchTypeData('SONG', 'song', 'songs')
  addSearchTypeData('STORY', 'story', 'stories')

  addSearchTypeData('WORD_AND_PHRASE', 'word / phrase', 'words / phrases')
  addSearchTypeData('PHRASE', 'phrase', 'phrases')
  addSearchTypeData('WORD', 'word', 'words')

  addSearchTypeData('ALL', 'language entry', 'language entries')

  const getSearchTypeFromDocTypes = (docTypes) => {
    if (docTypes.length == 2) {
      if (docTypes.indexOf(DOC_PHRASE) >= 0 && docTypes.indexOf(DOC_WORD) >= 0) {
        return 'WORD_AND_PHRASE'
      }

      if (docTypes.indexOf(DOC_SONG) >= 0 && docTypes.indexOf(DOC_STORY) >= 0) {
        return 'BOOK'
      }
    }

    if (docTypes.length == 1) {
      if (docTypes.indexOf(DOC_BOOK) >= 0) {
        return 'BOOK'
      }

      if (docTypes.indexOf(DOC_PHRASE) >= 0) {
        return 'PHRASE'
      }

      if (docTypes.indexOf(DOC_SONG) >= 0) {
        return 'SONG'
      }

      if (docTypes.indexOf(DOC_STORY) >= 0) {
        return 'STORY'
      }

      if (docTypes.indexOf(DOC_WORD) >= 0) {
        return 'WORD'
      }
    }

    return 'ALL'
  }

  const getSearchLabel = ({ searchType: searchDocType, plural = false }) => {
    const key =
      Object.keys(allSearchTypes).indexOf(searchDocType?.toUpperCase()) > -1 ? searchDocType.toUpperCase() : 'ALL'
    const typeData = allSearchTypes[key]
    const searchLabel = plural ? typeData.labelPlural : typeData.label
    return searchLabel
  }

  const handleSearchTypeChange = (event, key) => {
    setSelectedSearchType(key)
  }

  return {
    searchType: selectedSearchType,
    allSearchTypes,
    setSearchType: setSelectedSearchTypeWithDefaults,
    getSearchTypeFromDocTypes,
    getSearchLabel,
    handleSearchTypeChange,
  }
}

// PROPTYPES
const { string } = PropTypes
useSearchType.propTypes = {
  initialSearchType: string,
}

export default useSearchType
