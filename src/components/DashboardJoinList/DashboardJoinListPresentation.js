import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// FPCC
import Loading from 'components/Loading'
import DashboardJoinCard from 'components/DashboardJoinCard'

function DashboardJoinListPresentation({
  isLoading,
  infiniteScroll,
  joinRequests,
  loadRef,
}) {
  const { isFetchingNextPage, fetchNextPage, hasNextPage } = infiniteScroll

  const getLoadLabel = () => {
    if (infiniteScroll?.isFetchingNextPage) {
      return 'Loading more...'
    }
    if (infiniteScroll?.hasNextPage) {
      return 'Load more'
    }
    return ''
  }
  return (
    <Loading.Container isLoading={isLoading}>
      <div data-testid="DashboardJoinListPresentation">
        <div className="min-h-220 col-span-12">
          {joinRequests?.pages?.[0]?.count > 0 ? (
            <div
              id="EntriesListPresentation"
              className="flex flex-col w-full bg-white rounded-lg"
            >
              <div className="divide-y divide-gray-100">
                {joinRequests?.pages.map((page) => (
                  <Fragment key={page?.pageNumber}>
                    {page.results.map((request) => (
                      <DashboardJoinCard.Container
                        key={request?.id}
                        joinRequest={request}
                      />
                    ))}
                  </Fragment>
                ))}
                <button
                  type="button"
                  className={`${
                    !hasNextPage ? 'cursor-text' : ''
                  } text-primary font-semibold w-full text-center p-2 print:hidden`}
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage || isFetchingNextPage}
                >
                  {getLoadLabel()}
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full flex">
              <div className="mx-6 mt-4 text-center md:mx-auto md:mt-20">
                There are currently no pending join requests for your site.
              </div>
            </div>
          )}
        </div>
        <div ref={loadRef} className="w-full h-10" />
      </div>
    </Loading.Container>
  )
}
// PROPTYPES
const { bool, object } = PropTypes
DashboardJoinListPresentation.propTypes = {
  joinRequests: object,
  isLoading: bool,
  loadRef: object,
  infiniteScroll: object,
}

export default DashboardJoinListPresentation
