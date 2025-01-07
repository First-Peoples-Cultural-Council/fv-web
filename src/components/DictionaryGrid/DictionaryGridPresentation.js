import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import LoadOrError from 'components/LoadOrError'
import getIcon from 'common/utils/getIcon'
import DictionaryGridTile from 'components/DictionaryGridTile'
import LazyLoader from 'components/LazyLoader'
import InfiniteLoadBtn from 'components/InfiniteLoadBtn/InfiniteLoadBtn'

function DictionaryGridPresentation({
  infiniteQueryResponse,
  actions = ['copy'],
  moreActions = ['share', 'qrcode'],
  hasSideNav,
  kids = null,
  noResultsMessage = 'Sorry, no results were found for this search.',
}) {
  const [loadAll, setLoadAll] = useState(false)

  const printBtn = () => {
    setLoadAll(true)
    setTimeout(() => {
      window.print()
    }, 1000)
  }

  return (
    <LoadOrError queryResponse={infiniteQueryResponse}>
      {infiniteQueryResponse?.hasResults ? (
        <div id="DictionaryGridPresentation" className="mx-auto flex flex-col">
          <div className="p-4 align-middle inline-block min-w-full relative">
            {/* Hiding print button until custom print view has been created */}
            <button
              data-testid="print-btn"
              type="button"
              className="hidden float-right m-1 text-blumine-800 font-medium"
              onClick={() => printBtn()}
            >
              {getIcon('Print', 'fill-current w-8 h-auto')}
            </button>
            {infiniteQueryResponse?.data?.pages.map((page) => (
              <div
                key={page.pageNumber}
                className={`grid grid-cols-1 mb-6  ${
                  hasSideNav
                    ? 'lg:grid-cols-2'
                    : 'md:grid-cols-2 xl:grid-cols-3'
                } gap-4 md:gap-6`}
              >
                {page.results.map((result) => (
                  <LazyLoader key={result.id} forceLoad={loadAll}>
                    <DictionaryGridTile.Container
                      kids={kids}
                      entry={result}
                      actions={actions}
                      moreActions={moreActions}
                    />
                  </LazyLoader>
                ))}
              </div>
            ))}
          </div>
          <InfiniteLoadBtn infiniteQueryResponse={infiniteQueryResponse} />
        </div>
      ) : (
        <div className="w-full flex">
          <div className="mx-2 md:mx-auto md:mt-20">{noResultsMessage}</div>
        </div>
      )}
    </LoadOrError>
  )
}

// PROPTYPES
const { array, bool, node, object } = PropTypes
DictionaryGridPresentation.propTypes = {
  hasSideNav: bool,
  infiniteQueryResponse: object,
  kids: bool,
  noResultsMessage: node,
  actions: array,
  moreActions: array,
}

export default DictionaryGridPresentation
