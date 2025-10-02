import React from 'react'
import PropTypes from 'prop-types'

import DictionaryList from 'components/DictionaryList'
import DictionaryGrid from 'components/DictionaryGrid'
import SearchTypeSelector from 'components/SearchTypeSelector'

import { TYPE_DICTIONARY } from 'common/constants'
import ByAlphabetFilters from 'components/ByAlphabet/ByAlphabetFilters'
import DictionaryLinks from 'components/DictionaryLinks'

function ByAlphabetPresentation({
  characters,
  currentCharacter,
  searchInfiniteQueryResponse,
  searchType,
  setSearchType,
  labels,
  kids,
  sitename,
}) {
  return (
    <div
      data-testid="ByAlphabetPresentation"
      className="grid grid-cols-11 lg:p-2"
    >
      <div className="col-span-11 lg:col-span-3 mt-2 lg:mt-5 print:hidden">
        <ByAlphabetFilters
          currentCharacter={currentCharacter}
          sitename={sitename}
          characters={characters}
          searchType={searchType}
          kids={kids}
        />
        <div className="hidden lg:block my-5">
          <DictionaryLinks />
        </div>
      </div>

      <div className="col-span-11 lg:col-span-8 border-l-2 border-charcoal-200 lg:pl-3 xl:pl-6">
        <div className="block py-4">
          <div className="flex items-center border-b border-charcoal-100 px-3 pb-5 print:hidden">
            <SearchTypeSelector.Container
              selectedSearchType={searchType}
              setSearchType={setSearchType}
            />
          </div>
          <div className="hidden md:block p-2 print:block">
            <DictionaryList.Presentation
              infiniteQueryResponse={searchInfiniteQueryResponse}
              noResultsMessage={
                <>
                  There are currently no {labels?.lowercase} beginning with{' '}
                  <span className="text-2xl font-bold">
                    {currentCharacter.title}
                  </span>{' '}
                  on this language site.
                </>
              }
              sitename={sitename}
              entryLabel={labels?.singular}
              showType
            />
          </div>
          <div className="block md:hidden print:hidden">
            <DictionaryGrid.Presentation
              infiniteQueryResponse={searchInfiniteQueryResponse}
              sitename={sitename}
              showType={searchType === TYPE_DICTIONARY}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
// PROPTYPES
const { array, bool, func, object, string } = PropTypes
ByAlphabetPresentation.propTypes = {
  characters: array,
  currentCharacter: object,
  searchInfiniteQueryResponse: object,
  searchType: string,
  setSearchType: func,
  labels: object,
  kids: bool,
  sitename: string,
}

export default ByAlphabetPresentation
