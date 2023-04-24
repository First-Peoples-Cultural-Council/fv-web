import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

// FPCC
import DictionaryList from 'components/DictionaryList'
import DictionaryGrid from 'components/DictionaryGrid'
import useCategoryIcon from 'common/useCategoryIcon'
import getIcon from 'common/getIcon'
import SearchTypeSelector from 'components/SearchTypeSelector'

function ByCategoryPresentation({
  actions,
  categories,
  currentCategory,
  currentParentCategory,
  searchType,
  setSearchType,
  entryLabel,
  infiniteScroll,
  loadRef,
  isLoading,
  kids,
  items,
  moreActions,
  onSortByClick,
  sitename,
  sorting,
}) {
  const getParentCategoriesList = () => {
    return categories.map((category) => {
      return (
        <li
          key={category.id}
          id={'SearchFilter' + category.id}
          className="inline-block lg:block transition duration-500 ease-in-out lg:my-2 lg:mx-5 grow "
        >
          <Link
            className="transition duration-500 ease-in-out flex items-center cursor-pointer rounded-lg text-tertiaryB"
            to={`/${sitename}/${kids ? 'kids/' : ''}categories/${category.id}`}
          >
            {useCategoryIcon(category.title, 'inline-flex p-2 rounded-lg fill-current h-14 w-14')}
            <div className="inline-flex text-lg font-medium">{category.title}</div>
          </Link>
        </li>
      )
    })
  }
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
    return <>No {typeLabel} have been added to this category yet!</>
  }

  return (
    <>
      <span className="hidden text-2xl font-bold text-center print:block">{currentCategory?.title}</span>
      <div className="grid grid-cols-11 lg:p-2">
        <div className="col-span-11 lg:col-span-3 xl:col-span-2 mt-2 lg:mt-5">
          <div className="inline-block lg:block lg:px-3 lg:pt-3 print:hidden">
            <ul
              className={`list-none m-2 px-2 lg:space-y-2 ${
                currentCategory?.id === currentParentCategory?.id
                  ? 'border-l-4 md:border-l-0 lg:border-l-4 border-tertiaryB'
                  : ''
              }`}
            >
              <li
                key={currentParentCategory.id}
                id={'SearchFilter' + currentParentCategory.id}
                className="inline-block md:inline-flex lg:block w-full md:w-auto lg:w-full transition duration-500 ease-in-out lg:my-2 grow"
              >
                <Link
                  className="transition duration-500 ease-in-out rounded-lg pr-4 flex items-center cursor-pointer text-tertiaryB bg-gray-300"
                  to={`/${sitename}/${kids ? 'kids/' : ''}categories/${currentParentCategory.id}?docType=${searchType}`}
                >
                  {useCategoryIcon(currentParentCategory.title, 'inline-flex p-2 rounded-lg fill-current h-14 w-14')}
                  <div className="inline-flex text-lg font-medium">{currentParentCategory.title}</div>
                </Link>
              </li>
              {currentParentCategory?.children?.length > 0
                ? currentParentCategory?.children?.map((child) => {
                    return (
                      <li
                        key={child.id}
                        id={'SearchFilter' + child.id}
                        className={`inline-block md:inline-flex lg:block w-full md:w-auto lg:w-full transition duration-500 ease-in-out lg:my-2 grow ${
                          child.id === currentCategory.id
                            ? 'border-l-4 md:border-l-0 lg:border-l-4 border-tertiaryB'
                            : ''
                        }`}
                      >
                        <Link
                          className={`transition duration-500 ease-in-out ml-4 lg:ml-8 pr-4 lg:px-0 rounded-lg flex items-center cursor-pointer text-tertiaryB ${
                            child.id === currentCategory.id ? 'bg-gray-300' : ''
                          }`}
                          to={`/${sitename}/${kids ? 'kids/' : ''}categories/${child.id}?docType=${searchType}`}
                        >
                          {getIcon('Placeholder', 'inline-flex p-2 rounded-lg fill-current h-14 w-0')}
                          <div className="inline-flex text-lg font-medium">{child.title}</div>
                        </Link>
                      </li>
                    )
                  })
                : null}
            </ul>
          </div>
          <div className="hidden lg:block lg:p-3">
            <ul className="list-none m-2 pt-5 lg:space-y-4 border-t-2 border-gray-300">{getParentCategoriesList()}</ul>
          </div>
          {kids ? null : (
            <div className="hidden lg:block mt-1 lg:mt-5">
              <h2 className="text-2xl font-medium ml-7 text-fv-charcoal">BROWSE BY:</h2>
              <ul className="list-none">
                <li
                  id={'CategoryLink'}
                  className="inline-block lg:block transition duration-500 ease-in-out lg:my-3 lg:ml-8"
                >
                  <Link
                    className="transition duration-500 ease-in-out p-3 grow rounded-lg capitalize cursor-pointer text-xl text-fv-charcoal"
                    to={`/${sitename}/alphabet`}
                  >
                    {getIcon('Alphabet', 'inline-flex fill-current w-8 lg:mr-5')}Alphabet
                  </Link>
                </li>
                <li
                  id={'WordsLink'}
                  className="inline-block lg:block transition duration-500 ease-in-out lg:my-3 lg:ml-8"
                >
                  <Link
                    className="transition duration-500 ease-in-out p-3 grow rounded-lg capitalize cursor-pointer text-xl text-fv-charcoal"
                    to={`/${sitename}/words`}
                  >
                    {getIcon('Word', 'inline-flex fill-current w-8 lg:mr-5')}Words
                  </Link>
                </li>
                <li
                  id={'PhrasesLink'}
                  className="inline-block lg:block transition duration-500 ease-in-out lg:my-3 lg:ml-8"
                >
                  <Link
                    className="transition duration-500 ease-in-out p-3 grow rounded-lg capitalize cursor-pointer text-xl text-fv-charcoal"
                    to={`/${sitename}/phrases`}
                  >
                    {getIcon('Phrase', 'inline-flex fill-current w-8 lg:mr-5 mb-2')}Phrases
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
        {kids ? (
          <div className="min-h-220 col-span-11 lg:col-span-8 xl:col-span-9">
            <div className="bg-gray-100 p-4">
              <DictionaryGrid.Presentation
                actions={actions}
                infiniteScroll={infiniteScroll}
                isLoading={isLoading}
                items={items}
                moreActions={moreActions}
                sitename={sitename}
                showType={searchType === 'WORD_AND_PHRASE'}
                hasSideNav
                kids
              />
            </div>
          </div>
        ) : (
          <div className="min-h-220 col-span-11 lg:col-span-8 xl:col-span-9 border-l-2 border-gray-300 lg:pl-7">
            <div className="block lg:py-4">
              <div className="flex items-center md:border-b border-gray-200 px-3 md:pb-2 lg:pb-5 print:hidden">
                <SearchTypeSelector.Container
                  selectedSearchType={searchType}
                  setSearchType={setSearchType}
                  accentColor={'tertiaryB'}
                />
              </div>
              <div className="hidden md:block p-2 print:block">
                <DictionaryList.Presentation
                  actions={actions}
                  infiniteScroll={infiniteScroll}
                  isLoading={isLoading}
                  items={items}
                  moreActions={moreActions}
                  noResultsMessage={getNoResultsMessage()}
                  onSortByClick={onSortByClick}
                  sitename={sitename}
                  sorting={sorting}
                  entryLabel={entryLabel}
                  showType
                />
              </div>
              <div className="block md:hidden print:hidden">
                <DictionaryGrid.Presentation
                  actions={actions}
                  infiniteScroll={infiniteScroll}
                  isLoading={isLoading}
                  items={items}
                  moreActions={moreActions}
                  sitename={sitename}
                  showType={searchType === 'WORD_AND_PHRASE'}
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div ref={loadRef} className="w-full h-5" />
    </>
  )
}
// PROPTYPES
const { array, bool, func, object, string } = PropTypes
ByCategoryPresentation.propTypes = {
  actions: array,
  categories: array,
  currentCategory: object,
  currentParentCategory: object,
  searchType: string,
  entryLabel: string,
  defaultDocType: string,
  setSearchType: func,
  infiniteScroll: object,
  loadRef: object,
  isLoading: bool,
  items: object,
  kids: bool,
  moreActions: array,
  onSortByClick: func,
  selectedTab: object,
  sitename: string,
  sorting: object,
  tabs: array,
}

export default ByCategoryPresentation
