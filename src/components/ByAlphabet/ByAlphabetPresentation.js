import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import DictionaryList from 'components/DictionaryList'
import DictionaryGrid from 'components/DictionaryGrid'
import AudioButton from 'components/AudioButton'
import SearchTypeSelector from 'components/SearchTypeSelector'
import getIcon from 'common/utils/getIcon'
import { CHAR, TYPES, TYPE_DICTIONARY } from 'common/constants'

function ByAlphabetPresentation({
  characters,
  currentCharacter,
  searchInfiniteQueryResponse,
  searchType,
  setSearchType,
  entryLabel,
  kids,
  sitename,
}) {
  const getAlphabetList = () =>
    characters.map(({ title, id }) => (
      <Link
        data-testid={`SearchFilter_${currentCharacter.id}`}
        className={`border col-span-1 font-medium inline-flex justify-center m-1 p-2 rounded-lg shadow text-3xl ${
          currentCharacter?.id === id ? 'bg-blumine-800 text-white' : ''
        }`}
        key={id}
        to={`/${sitename}/${
          kids ? 'kids/' : ''
        }alphabet/startsWith?${CHAR}=${title}&${TYPES}=${searchType}`}
      >
        {title}
      </Link>
    ))

  const getNoResultsMessage = () => {
    let typeLabel = ''
    switch (searchType) {
      case 'WORD':
        typeLabel = 'words'
        break
      case 'PHRASE':
        typeLabel = 'phrases'
        break
      default:
        typeLabel = 'entries'
        break
    }
    return (
      <>
        There are currently no {typeLabel} beginning with{' '}
        <span className="text-2xl font-bold">{currentCharacter.title}</span> on
        this language site.
      </>
    )
  }
  return (
    <>
      <span className="hidden text-4xl font-bold text-center print:block">
        {currentCharacter.title}
      </span>
      <div className="grid grid-cols-11 md:p-2">
        <div className="col-span-11 md:col-span-4 xl:col-span-3 mt-2 md:mt-5 print:hidden">
          <div className="hidden md:block xl:p-2">
            <div
              data-testid={`SearchFilter_${currentCharacter.id}`}
              className="font-medium flex justify-center mx-auto p-2 xl:p-4 text-5xl xl:text-7xl text-blumine-800"
            >
              {currentCharacter.title}
              {currentCharacter?.relatedAudio?.length > 0 && (
                <div className="ml-2">
                  <AudioButton
                    audioArray={currentCharacter?.relatedAudio}
                    iconStyling="fill-current h-8 w-8"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="block md:p-3">
            <div className="grid grid-cols-6 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 mx-auto md:pt-5 md:border-t-2 md:border-charcoal-200">
              {getAlphabetList()}
            </div>
          </div>
          {kids ? null : (
            <div className="hidden lg:block mt-5">
              <h2 className="text-2xl font-medium ml-7 text-charcoal-900">
                BROWSE BY:
              </h2>
              <ul className="list-none">
                <li
                  id="CategoryLink"
                  className="inline-block md:block transition duration-500 ease-in-out md:my-3 md:ml-8"
                >
                  <Link
                    className="transition duration-500 ease-in-out p-3 grow rounded-lg capitalize cursor-pointer text-xl text-charcoal-900"
                    to={`/${sitename}/categories?${TYPES}=${searchType}`}
                  >
                    {getIcon(
                      'Categories',
                      'inline-flex fill-current w-8 lg:mr-5',
                    )}
                    Categories
                  </Link>
                </li>
                <li
                  id="WordsLink"
                  className="inline-block md:block transition duration-500 ease-in-out md:my-3 md:ml-8"
                >
                  <Link
                    className="transition duration-500 ease-in-out p-3 grow rounded-lg capitalize cursor-pointer text-xl text-charcoal-900"
                    to={`/${sitename}/words`}
                  >
                    {getIcon('Word', 'inline-flex fill-current w-8 lg:mr-5')}
                    Words
                  </Link>
                </li>
                <li
                  id="PhrasesLink"
                  className="inline-block md:block transition duration-500 ease-in-out md:my-3 md:ml-8"
                >
                  <Link
                    className="transition duration-500 ease-in-out p-3 grow rounded-lg capitalize cursor-pointer text-xl text-charcoal-900"
                    to={`/${sitename}/phrases`}
                  >
                    {getIcon(
                      'Phrase',
                      'inline-flex fill-current w-8 lg:mr-5 mb-2',
                    )}
                    Phrases
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>

        {kids ? (
          <div className="min-h-220 col-span-11 md:col-span-7 xl:col-span-8">
            <div className="bg-charcoal-50 p-4 min-h-screen">
              <DictionaryGrid.Presentation
                infiniteQueryResponse={searchInfiniteQueryResponse}
                sitename={sitename}
                showType={searchType === TYPE_DICTIONARY}
                hasSideNav
                kids
              />
            </div>
          </div>
        ) : (
          <div className="min-h-220 col-span-11 md:col-span-7 xl:col-span-8 border-l-2 border-charcoal-200 md:pl-3 xl:pl-6">
            <div className="block py-4">
              <div className="flex items-center border-b border-charcoal-100 px-3 pb-5 print:hidden">
                <SearchTypeSelector.Container
                  selectedSearchType={searchType}
                  setSearchType={setSearchType}
                  accentColor="blumine-800"
                />
              </div>
              <div className="hidden md:block p-2 print:block">
                <DictionaryList.Presentation
                  infiniteQueryResponse={searchInfiniteQueryResponse}
                  noResultsMessage={getNoResultsMessage()}
                  sitename={sitename}
                  entryLabel={entryLabel}
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
        )}
      </div>
      <div ref={searchInfiniteQueryResponse?.loadRef} className="w-full h-5" />
    </>
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
  entryLabel: string,
  kids: bool,
  sitename: string,
}

export default ByAlphabetPresentation
