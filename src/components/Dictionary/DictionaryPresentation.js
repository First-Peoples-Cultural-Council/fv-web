import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import DictionaryList from 'components/DictionaryList'
import DictionaryGrid from 'components/DictionaryGrid'
import SearchDictionaryForm from 'components/SearchDictionaryForm'
import getIcon from 'common/getIcon'

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
  onSortByClick,
  sitename,
  sorting,
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
            showType={searchType === 'WORD_AND_PHRASE'}
            kids
          />
        </div>
      ) : (
        <div className="grid grid-cols-12">
          <div className="hidden lg:block print:hidden col-span-2 mt-5">
            <h1
              className={`flex items-center text-3xl xl:text-4xl text-${labels.color}Text ml-4 xl:ml-7 mb-8`}
            >
              {labels.title}
            </h1>
            <h2 className="block text-xl xl:text-2xl font-medium text-fv-charcoal ml-4 xl:ml-7">
              BROWSE BY:
            </h2>
            <ul className="inline-block list-none">
              <li id="CategoryLink" className={linkStyle.li}>
                <Link
                  className={linkStyle.link}
                  to={`/${sitename}/categories?docType=${searchType}`}
                >
                  {getIcon('Categories', linkStyle.icon)}
                  <p>Categories</p>
                </Link>
              </li>
              <li id="AlphabetLink" className={linkStyle.li}>
                <Link
                  className={linkStyle.link}
                  to={`/${sitename}/alphabet?docType=${searchType}`}
                >
                  {getIcon('Alphabet', linkStyle.icon)}
                  <p>Alphabet</p>
                </Link>
              </li>
              {searchType !== 'WORD' && (
                <li id="DocLink" className={linkStyle.li}>
                  <Link className={linkStyle.link} to={`/${sitename}/words`}>
                    {getIcon('Word', linkStyle.icon)}
                    <p>Words</p>
                  </Link>
                </li>
              )}
              {searchType !== 'PHRASE' && (
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
                infiniteScroll={infiniteScroll}
                isLoading={isLoadingEntries}
                items={items}
                moreActions={moreActions}
                onSortByClick={onSortByClick}
                sitename={sitename}
                sorting={sorting}
                entryLabel={labels.entryLabel}
                showType={searchType === 'WORD_AND_PHRASE'}
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
                showType={searchType === 'WORD_AND_PHRASE'}
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
const { array, bool, func, object, string } = PropTypes
DictionaryPresentation.propTypes = {
  actions: array,
  currentOption: object,
  searchType: string,
  handleSearchSubmit: func,
  handleTextFieldChange: func,
  infiniteScroll: object,
  loadRef: object,
  isLoadingEntries: bool,
  items: object,
  kids: bool,
  labels: object,
  moreActions: array,
  onOptionClick: func,
  onSortByClick: func,
  options: array,
  resetSearch: func,
  searchValue: string,
  sitename: string,
  sorting: object,
}

export default DictionaryPresentation
