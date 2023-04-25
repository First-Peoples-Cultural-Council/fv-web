import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Tabs from 'components/Tabs'
import useSearchType from 'common/search/useSearchBoxNavigation'

function SearchTypeSelectorContainer({
  accentColor,
  selectedSearchType,
  setSearchType,
}) {
  const { allSearchTypes } = useSearchType({})

  const dictionaryTypes = [
    { label: 'WORDS', icon: 'Word', value: allSearchTypes.WORD.searchDocType },
    {
      label: 'PHRASES',
      icon: 'Phrase',
      value: allSearchTypes.PHRASE.searchDocType,
    },
    {
      label: 'BOTH',
      icon: 'All',
      value: allSearchTypes.WORD_AND_PHRASE.searchDocType,
    },
  ]

  return (
    <div id="SearchTypeSelectorContainer">
      <Tabs.Presentation
        tabs={dictionaryTypes}
        selectedValue={selectedSearchType}
        setValue={setSearchType}
        accentColor={accentColor}
      />
    </div>
  )
}

// PROPTYPES
const { func, oneOf, string } = PropTypes
SearchTypeSelectorContainer.propTypes = {
  accentColor: string,
  setSearchType: func,
  selectedSearchType: oneOf(['WORD', 'PHRASE', 'WORD_AND_PHRASE']),
}

export default SearchTypeSelectorContainer
