import React from 'react'
import PropTypes from 'prop-types'

import DictionaryList from 'components/DictionaryList'
import DictionaryGrid from 'components/DictionaryGrid'
import SearchDictionaryForm from 'components/SearchDictionaryForm'
import DictionaryLinks from 'components/DictionaryLinks'
import { TYPE_DICTIONARY } from 'common/constants'

function DictionaryPresentation({
  searchType,
  infiniteQueryResponse,
  kids,
  labels,
  sitename,
}) {
  const count =
    infiniteQueryResponse?.data?.pages?.[0]?.count < 10000
      ? infiniteQueryResponse?.data?.pages?.[0]?.count
      : '10000+'

  return (
    <>
      <section
        id="DictionaryPresentation"
        className={`bg-linear-to-b from-${labels.color} to-${labels.textColor} p-5 print:hidden`}
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
            infiniteQueryResponse={infiniteQueryResponse}
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
            <DictionaryLinks />
          </div>
          <div className="col-span-12 lg:col-span-10">
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
    </>
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
