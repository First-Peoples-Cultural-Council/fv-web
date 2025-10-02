import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import Tabs from 'components/Tabs'
import { TYPE_DICTIONARY, TYPE_PHRASE, TYPE_WORD } from 'common/constants'

function SearchTypeSelectorContainer({ selectedSearchType, setSearchType }) {
  const dictionaryTypes = [
    { label: 'WORDS', icon: 'Word', value: TYPE_WORD },
    {
      label: 'PHRASES',
      icon: 'Phrase',
      value: TYPE_PHRASE,
    },
    {
      label: 'BOTH',
      icon: 'All',
      value: TYPE_DICTIONARY,
    },
  ]

  return (
    <div id="SearchTypeSelectorContainer">
      <Tabs.Presentation
        tabs={dictionaryTypes}
        selectedValue={selectedSearchType}
        setValue={setSearchType}
      />
    </div>
  )
}

// PROPTYPES
const { func, oneOf } = PropTypes
SearchTypeSelectorContainer.propTypes = {
  setSearchType: func,
  selectedSearchType: oneOf([TYPE_DICTIONARY, TYPE_PHRASE, TYPE_WORD]),
}

export default SearchTypeSelectorContainer
