import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import DictionaryList from 'components/DictionaryList'
import DictionaryGrid from 'components/DictionaryGrid'
import getCategoryIcon from 'common/utils/getCategoryIcon'
import getIcon from 'common/utils/getIcon'
import SearchTypeSelector from 'components/SearchTypeSelector'
import { TYPE_DICTIONARY, TYPE_PHRASE, TYPE_WORD } from 'common/constants'

function ByCategoryPresentation({
  categories,
  currentCategory,
  currentParentCategory,
  searchInfiniteQueryResponse,
  searchType,
  setSearchType,
  entryLabel,
  kids,
  sitename,
}) {
  const getParentCategoriesList = () =>
    categories.map((category) => (
      <li
        key={category.id}
        id={`SearchFilter${category.id}`}
        className="inline-block lg:block transition duration-500 ease-in-out lg:my-2 lg:mx-5 grow "
      >
        <Link
          className="transition duration-500 ease-in-out flex items-center cursor-pointer rounded-lg text-charcoal-700"
          to={`/${sitename}/${kids ? 'kids/' : ''}categories/${category.id}`}
        >
          {getCategoryIcon(
            category.title,
            'inline-flex p-2 rounded-lg fill-current h-10 w-14',
          )}
          <div className="inline-flex text-lg font-medium">
            {category.title}
          </div>
        </Link>
      </li>
    ))

  const getNoResultsMessage = () => {
    let typeLabel = ''
    switch (searchType) {
      case TYPE_WORD:
        typeLabel = 'words'
        break
      case TYPE_PHRASE:
        typeLabel = 'phrases'
        break
      default:
        typeLabel = 'entries'
        break
    }
    return <>No {typeLabel} have been added to this category yet!</>
  }

  return (
    <>
      <span className="hidden text-2xl font-bold text-center print:block">
        {currentCategory?.title}
      </span>
      <div className="grid grid-cols-11 lg:p-2">
        <div className="col-span-11 lg:col-span-3 xl:col-span-2 mt-2 lg:mt-5">
          <div className="inline-block lg:block lg:px-3 lg:pt-3 print:hidden">
            <ul
              className={`list-none m-2 px-2 lg:space-y-2 ${
                currentCategory?.id === currentParentCategory?.id
                  ? 'border-l-4 md:border-l-0 lg:border-l-4 border-charcoal-700'
                  : ''
              }`}
            >
              <li
                key={currentParentCategory.id}
                id={`SearchFilter${currentParentCategory.id}`}
                className="inline-block md:inline-flex lg:block w-full md:w-auto lg:w-full transition duration-500 ease-in-out lg:my-2 grow"
              >
                <Link
                  className="transition duration-500 ease-in-out rounded-lg pr-4 flex items-center cursor-pointer text-charcoal-700 bg-charcoal-200"
                  to={`/${sitename}/${kids ? 'kids/' : ''}categories/${
                    currentParentCategory.id
                  }?docType=${searchType}`}
                >
                  {getCategoryIcon(
                    currentParentCategory.title,
                    'inline-flex p-2 rounded-lg fill-current h-10 w-14',
                  )}
                  <div className="inline-flex text-lg font-medium">
                    {currentParentCategory.title}
                  </div>
                </Link>
              </li>
              {currentParentCategory?.children?.length > 0
                ? currentParentCategory?.children?.map((child) => (
                    <li
                      key={child.id}
                      id={`SearchFilter${child.id}`}
                      className={`inline-block md:inline-flex lg:block w-full md:w-auto lg:w-full transition duration-500 ease-in-out lg:my-2 grow ${
                        child.id === currentCategory.id
                          ? 'border-l-4 md:border-l-0 lg:border-l-4 border-charcoal-700'
                          : ''
                      }`}
                    >
                      <Link
                        className={`transition duration-500 ease-in-out ml-4 lg:ml-8 pr-4 lg:px-0 rounded-lg flex items-center cursor-pointer text-charcoal-700 ${
                          child.id === currentCategory.id
                            ? 'bg-charcoal-200'
                            : ''
                        }`}
                        to={`/${sitename}/${kids ? 'kids/' : ''}categories/${
                          child.id
                        }?docType=${searchType}`}
                      >
                        {getIcon(
                          'Placeholder',
                          'inline-flex p-2 rounded-lg fill-current h-10 w-0',
                        )}
                        <div className="inline-flex text-lg font-medium">
                          {child.title}
                        </div>
                      </Link>
                    </li>
                  ))
                : null}
            </ul>
          </div>
          <div className="hidden lg:block lg:p-3">
            <ul className="list-none m-2 pt-5 lg:space-y-4 border-t-2 border-charcoal-200">
              {getParentCategoriesList()}
            </ul>
          </div>
          {kids ? null : (
            <div className="hidden lg:block mt-1 lg:mt-5">
              <h2 className="text-2xl font-medium ml-7 text-charcoal-900">
                BROWSE BY:
              </h2>
              <ul className="list-none">
                <li
                  id="CategoryLink"
                  className="inline-block lg:block transition duration-500 ease-in-out lg:my-3 lg:ml-8"
                >
                  <Link
                    className="transition duration-500 ease-in-out p-3 grow rounded-lg capitalize cursor-pointer text-xl text-charcoal-900"
                    to={`/${sitename}/alphabet`}
                  >
                    {getIcon(
                      'Alphabet',
                      'inline-flex fill-current w-8 lg:mr-5',
                    )}
                    Alphabet
                  </Link>
                </li>
                <li
                  id="WordsLink"
                  className="inline-block lg:block transition duration-500 ease-in-out lg:my-3 lg:ml-8"
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
                  className="inline-block lg:block transition duration-500 ease-in-out lg:my-3 lg:ml-8"
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
          <div className="col-span-11 lg:col-span-8 xl:col-span-9">
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
        ) : (
          <div className="col-span-11 lg:col-span-8 xl:col-span-9 border-l-2 border-charcoal-200 lg:pl-7">
            <div className="block lg:py-4">
              <div className="flex items-center md:border-b border-charcoal-100 px-3 md:pb-2 lg:pb-5 print:hidden">
                <SearchTypeSelector.Container
                  selectedSearchType={searchType}
                  setSearchType={setSearchType}
                  accentColor="charcoal-700"
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
    </>
  )
}
// PROPTYPES
const { array, bool, func, object, string } = PropTypes
ByCategoryPresentation.propTypes = {
  categories: array,
  currentCategory: object,
  currentParentCategory: object,
  searchType: string,
  entryLabel: string,
  setSearchType: func,
  searchInfiniteQueryResponse: object,
  kids: bool,
  sitename: string,
}

export default ByCategoryPresentation
