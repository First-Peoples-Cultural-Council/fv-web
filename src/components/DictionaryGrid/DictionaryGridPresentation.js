import React, { useState } from 'react'
import PropTypes from 'prop-types'

// FPCC
import Loading from 'components/Loading'
import getIcon from 'common/utils/getIcon'
import DictionaryGridTile from 'components/DictionaryGridTile'
import LazyLoader from 'components/LazyLoader'

function DictionaryGridPresentation({
  actions,
  moreActions,
  hasSideNav,
  infiniteScroll,
  isLoading,
  items,
  kids,
  noResultsMessage,
}) {
  const { isFetchingNextPage, fetchNextPage, hasNextPage } = infiniteScroll
  const [loadAll, setLoadAll] = useState(false)

  const getLoadLabel = () => {
    if (infiniteScroll?.isFetchingNextPage) {
      return 'Loading more...'
    }
    if (infiniteScroll?.hasNextPage) {
      return 'Load more'
    }
    return 'End of results.'
  }

  const printBtn = () => {
    setLoadAll(true)
    setTimeout(() => {
      window.print()
    }, 1000)
  }

  return (
    <Loading.Container isLoading={isLoading}>
      {items?.pages !== undefined && items?.pages?.[0]?.results?.length > 0 ? (
        <div id="DictionaryGridPresentation" className="mx-auto flex flex-col">
          <div className="p-4 align-middle inline-block min-w-full relative">
            {/* Hiding print button until custom print view has been created */}
            <button
              type="button"
              className="hidden float-right m-1 text-primary font-medium"
              onClick={() => printBtn()}
            >
              {getIcon('Print', 'fill-current w-8 h-auto')}
            </button>
            {items.pages.map((page) => (
              <div
                key={page.nextPage}
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
          <div className="p-3 text-center text-fv-charcoal font-medium print:hidden">
            <button
              type="button"
              className={!hasNextPage ? 'cursor-text' : ''}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
            >
              {getLoadLabel()}
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full flex">
          <div className="mx-2 md:mx-auto md:mt-20">{noResultsMessage}</div>
        </div>
      )}
    </Loading.Container>
  )
}

// PROPTYPES
const { array, bool, node, object } = PropTypes
DictionaryGridPresentation.propTypes = {
  hasSideNav: bool,
  infiniteScroll: object,
  isLoading: bool,
  items: object,
  kids: bool,
  noResultsMessage: node,
  actions: array,
  moreActions: array,
}

DictionaryGridPresentation.defaultProps = {
  noResultsMessage: 'Sorry, no results were found for this search.',
  kids: false,
  actions: [],
  moreActions: [],
}

export default DictionaryGridPresentation
