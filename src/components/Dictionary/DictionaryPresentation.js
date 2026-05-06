import React from 'react'
import PropTypes from 'prop-types'

import DictionaryList from 'components/DictionaryList'
import DictionaryGrid from 'components/DictionaryGrid'
import SearchDictionaryForm from 'components/SearchDictionaryForm'
import DictionaryLinks from 'components/DictionaryLinks'
import { TYPE_DICTIONARY, TYPE_PHRASE } from 'common/constants'
import SiteDocHead from 'components/SiteDocHead'

function DictionaryPresentation({
  searchType,
  infiniteQueryResponse,
  kids,
  labels,
  sitename,
}) {
  const count =
    infiniteQueryResponse?.data?.pages?.[0]?.count > 9999
      ? '10000+'
      : infiniteQueryResponse?.data?.pages?.[0]?.count

  const bannerColor =
    searchType === TYPE_PHRASE
      ? 'from-phrase-color-600 to-phrase-color-800'
      : 'from-word-color-500 to-word-color-700'

  const titleColor =
    searchType === TYPE_PHRASE ? 'text-phrase-color-800' : 'text-word-color-700'

  return (
    <div data-testid="DictionaryPresentation">
      <SiteDocHead titleArray={[labels.titlecase]} />
      <section className={`bg-linear-to-b ${bannerColor} p-5 print:hidden`}>
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
            infiniteQueryResponse={infiniteQueryResponse}
            sitename={sitename}
            showType={searchType === TYPE_DICTIONARY}
            kids
          />
        </div>
      ) : (
        <div className="grid grid-cols-11 lg:p-2">
          <div className="hidden lg:block col-span-2 lg:mt-2 py-3">
            <div className="mb-12 ml-4 xl:ml-7 space-y-2">
              <h1
                data-testid={`${searchType}-header`}
                className={`text-3xl ${titleColor}`}
              >
                {labels.titlecase}
              </h1>
              <div
                className={`${
                  count ? '' : 'invisible'
                } text-sm xl:text-base font-light`}
              >
                Results: {count}
              </div>
            </div>
            <DictionaryLinks />
          </div>
          <div className="col-span-11 lg:col-span-9">
            <div className="hidden md:block p-2 print:block">
              <DictionaryList.Presentation
                infiniteQueryResponse={infiniteQueryResponse}
                sitename={sitename}
                entryLabel={labels.singular}
                showType={searchType === TYPE_DICTIONARY}
              />
            </div>
            <div className="block md:hidden print:hidden">
              <DictionaryGrid.Presentation
                infiniteQueryResponse={infiniteQueryResponse}
                sitename={sitename}
                showType={searchType === TYPE_DICTIONARY}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
// PROPTYPES
const { bool, object, string } = PropTypes
DictionaryPresentation.propTypes = {
  searchType: string,
  infiniteQueryResponse: object,
  kids: bool,
  labels: object,
  sitename: string,
}

export default DictionaryPresentation
