import React from 'react'
import PropTypes from 'prop-types'

//
import DictionaryGrid from 'components/DictionaryGrid'
import { TYPE_DICTIONARY } from 'common/constants'
import ByAlphabetFilters from 'components/ByAlphabet/ByAlphabetFilters'

function ByAlphabetKids({
  characters,
  currentCharacter,
  searchInfiniteQueryResponse,
  searchType,
  sitename,
}) {
  return (
    <div data-testid="ByAlphabetKids" className="grid grid-cols-11 md:p-2">
      <div className="col-span-11 md:col-span-4 xl:col-span-3 mt-2 md:mt-5 print:hidden">
        <ByAlphabetFilters
          currentCharacter={currentCharacter}
          sitename={sitename}
          characters={characters}
          searchType={searchType}
          kids
        />
      </div>
      <div className="col-span-11 md:col-span-7 xl:col-span-8">
        <div className="bg-charcoal-50 p-4">
          <DictionaryGrid.Presentation
            infiniteQueryResponse={searchInfiniteQueryResponse}
            sitename={sitename}
            showType={searchType === TYPE_DICTIONARY}
            hasSideNav
            kids
          />
        </div>
      </div>
    </div>
  )
}
// PROPTYPES
const { array, object, string } = PropTypes
ByAlphabetKids.propTypes = {
  characters: array,
  currentCharacter: object,
  searchInfiniteQueryResponse: object,
  searchType: string,
  sitename: string,
}

export default ByAlphabetKids
