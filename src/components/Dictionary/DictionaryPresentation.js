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
  infiniteQueryResponse,
  kids,
  labels,
  moreActions,
  sitename,
}) {
  const linkStyle = {
    li: 'block transition duration-500 ease-in-out ml-5 xl:ml-8',
    link: 'flex items-center transition duration-500 ease-in-out p-2 grow rounded-lg capitalize cursor-pointer text-lg xl:text-xl text-charcoal-900',
    icon: 'inline-flex fill-current w-6 xl:w-8 mr-2 xl:mr-5',
  }

  const count =
    infiniteQueryResponse?.data?.pages?.[0]?.count < 10000
      ? infiniteQueryResponse?.data?.pages?.[0]?.count
      : '10000+'

  return (
    <>
      <section
        id="DictionaryPresentation"
        className={`bg-gradient-to-b from-${labels.color} to-${labels.textColor} p-5 print:hidden`}
      >
        <div className="mx-auto lg:w-3/5">
          <SearchDictionaryForm.Container
            kids={kids}
            initialSearchType={searchType}
          />
        </div>
      </section>
      {kids ? (
        <div className="lg:px-20 bg-charcoal-50">
          <DictionaryGrid.Presentation
            infiniteScroll={infiniteQueryResponse?.infiniteScroll}
            isLoading={infiniteQueryResponse?.isPending}
            items={infiniteQueryResponse?.data}
            sitename={sitename}
            showType={searchType === TYPE_DICTIONARY}
            kids
          />
        </div>
      ) : (
        <div className="grid grid-cols-12">
          <div className="hidden lg:block print:hidden col-span-2 mt-5">
            <div className="mb-12 ml-4 xl:ml-7 space-y-2">
              <h1 className={`text-3xl xl:text-4xl text-${labels.textColor}`}>
                {labels.uppercase}
              </h1>
              <div
                className={`${
                  count ? '' : 'opacity-0'
                } text-sm xl:text-base text-charcoal-900`}
              >
                Results: {count}
              </div>
            </div>

            <h2 className="block text-xl xl:text-2xl font-medium text-charcoal-900 ml-4 xl:ml-7">
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
            </ul>
          </div>
          <div className="min-h-220 col-span-12 lg:col-span-10">
            <div className="hidden md:block p-2 print:block">
              <DictionaryList.Presentation
                actions={actions}
                infiniteScroll={infiniteQueryResponse?.infiniteScroll}
                isLoading={infiniteQueryResponse?.isPending}
                items={infiniteQueryResponse?.data}
                moreActions={moreActions}
                sitename={sitename}
                entryLabel={labels.singular}
                showType={searchType === TYPE_DICTIONARY}
              />
            </div>
            <div className="block md:hidden print:hidden">
              <DictionaryGrid.Presentation
                actions={actions}
                infiniteScroll={infiniteQueryResponse?.infiniteScroll}
                isLoading={infiniteQueryResponse?.isPending}
                items={infiniteQueryResponse?.data}
                moreActions={moreActions}
                sitename={sitename}
                showType={searchType === TYPE_DICTIONARY}
              />
            </div>
          </div>
        </div>
      )}
      <div ref={infiniteQueryResponse?.loadRef} className="w-full h-10" />
    </>
  )
}
// PROPTYPES
const { array, bool, object, string } = PropTypes
DictionaryPresentation.propTypes = {
  actions: array,
  searchType: string,
  infiniteQueryResponse: object,
  kids: bool,
  labels: object,
  moreActions: array,
  sitename: string,
}

export default DictionaryPresentation
