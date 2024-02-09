import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import DictionaryList from 'components/DictionaryList'
import DictionaryGrid from 'components/DictionaryGrid'
import SearchDictionaryForm from 'components/SearchDictionaryForm'
import getIcon from 'common/utils/getIcon'
import {
  TYPES,
  TYPE_DICTIONARY,
  TYPE_PHRASE,
  TYPE_WORD,
} from 'common/constants'

function DictionaryPresentation({
  actions,
  searchType,
  infiniteScroll,
  loadRef,
  isLoadingEntries,
  items,
  kids,
  labels,
  moreActions,
  sitename,
  count,
}) {
  const linkStyle = {
    li: 'block transition duration-500 ease-in-out ml-5 xl:ml-8',
    link: 'flex items-center transition duration-500 ease-in-out p-2 grow rounded-lg capitalize cursor-pointer text-lg xl:text-xl text-fv-charcoal',
    icon: 'inline-flex fill-current w-6 xl:w-8 mr-2 xl:mr-5',
  }
  return (
    <>
      <section
        id="DictionaryPresentation"
        className={`bg-gradient-to-b from-${labels.color} to-${labels.color}-dark p-5 print:hidden`}
      >
        <div className="mx-auto lg:w-3/5">
          <SearchDictionaryForm.Container kids={kids} searchType={searchType} />
        </div>
      </section>
      {kids ? (
        <div className="lg:px-20 bg-gray-100">
          <DictionaryGrid.Presentation
            infiniteScroll={infiniteScroll}
            isLoading={isLoadingEntries}
            items={items}
            sitename={sitename}
            showType={searchType === TYPE_DICTIONARY}
            kids
          />
        </div>
      ) : (
        <div className="grid grid-cols-12">
          <div className="hidden lg:block print:hidden col-span-2 mt-5">
            <h1
              className={`flex items-center text-3xl xl:text-4xl text-${labels.color}Text ml-4 xl:ml-7 mb-8`}
            >
              {labels.uppercase}
            </h1>
            <h2 className="block text-xl xl:text-2xl font-medium text-fv-charcoal ml-4 xl:ml-7">
              BROWSE BY:
            </h2>
            <ul className="inline-block list-none">
              <li id="CategoryLink" className={linkStyle.li}>
                <Link
                  className={linkStyle.link}
                  to={`/${sitename}/categories?${TYPES}=${searchType}`}
                >
                  {getIcon('Categories', linkStyle.icon)}
                  <p>Categories</p>
                </Link>
              </li>
              <li id="AlphabetLink" className={linkStyle.li}>
                <Link
                  className={linkStyle.link}
                  to={`/${sitename}/alphabet?${TYPES}=${searchType}`}
                >
                  {getIcon('Alphabet', linkStyle.icon)}
                  <p>Alphabet</p>
                </Link>
              </li>
              {searchType !== TYPE_WORD && (
                <li id="DocLink" className={linkStyle.li}>
                  <Link className={linkStyle.link} to={`/${sitename}/words`}>
                    {getIcon('Word', linkStyle.icon)}
                    <p>Words</p>
                  </Link>
                </li>
              )}
              {searchType !== TYPE_PHRASE && (
                <li id="DocLink" className={linkStyle.li}>
                  <Link className={linkStyle.link} to={`/${sitename}/phrases`}>
                    {getIcon('Phrase', linkStyle.icon)}
                    <p>Phrases</p>
                  </Link>
                </li>
              )}
              <li
                className={`${linkStyle.li} p-2 grow text-lg xl:text-xl text-fv-charcoal`}
              >
                Results: {count}{' '}
                {searchType === TYPE_PHRASE ? `phrases` : `words`}
              </li>
            </ul>
          </div>
          <div className="min-h-220 col-span-12 lg:col-span-10">
            <div className="hidden md:block p-2 print:block">
              <DictionaryList.Presentation
                actions={actions}
                infiniteScroll={infiniteScroll}
                isLoading={isLoadingEntries}
                items={items}
                moreActions={moreActions}
                sitename={sitename}
                entryLabel={labels.singular}
                showType={searchType === TYPE_DICTIONARY}
              />
            </div>
            <div className="block md:hidden print:hidden">
              <DictionaryGrid.Presentation
                actions={actions}
                infiniteScroll={infiniteScroll}
                isLoading={isLoadingEntries}
                items={items}
                moreActions={moreActions}
                sitename={sitename}
                showType={searchType === TYPE_DICTIONARY}
              />
            </div>
          </div>
        </div>
      )}
      <div ref={loadRef} className="w-full h-10" />
    </>
  )
}
// PROPTYPES
const { array, bool, object, string, number } = PropTypes
DictionaryPresentation.propTypes = {
  actions: array,
  searchType: string,
  infiniteScroll: object,
  loadRef: object,
  isLoadingEntries: bool,
  items: object,
  kids: bool,
  labels: object,
  moreActions: array,
  sitename: string,
  count: number,
}

export default DictionaryPresentation
