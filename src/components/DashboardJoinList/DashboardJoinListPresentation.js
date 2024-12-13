import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// FPCC
import DashboardJoinCard from 'components/DashboardJoinCard'

function DashboardJoinListPresentation({ joinRequestsInfiniteQueryResponse }) {
  return (
    <div data-testid="DashboardJoinListPresentation">
      <div className="min-h-220 col-span-12">
        {joinRequestsInfiniteQueryResponse?.data?.pages?.[0]?.count > 0 ? (
          <div
            id="EntriesListPresentation"
            className="flex flex-col w-full bg-white rounded-lg"
          >
            <div className="divide-y divide-charcoal-100">
              {joinRequestsInfiniteQueryResponse?.data?.pages.map((page) => (
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
                data-testid="load-btn"
                type="button"
                className={`${
                  !joinRequestsInfiniteQueryResponse?.hasNextPage
                    ? 'cursor-text'
                    : ''
                } text-blumine-800 font-semibold w-full text-center p-2 print:hidden`}
                onClick={() =>
                  joinRequestsInfiniteQueryResponse?.fetchNextPage()
                }
                disabled={
                  !joinRequestsInfiniteQueryResponse?.hasNextPage ||
                  joinRequestsInfiniteQueryResponse?.isFetchingNextPage
                }
              >
                {joinRequestsInfiniteQueryResponse?.loadLabel}
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
      <div
        ref={joinRequestsInfiniteQueryResponse?.loadRef}
        className="w-full h-10"
      />
    </div>
  )
}
// PROPTYPES
const { object } = PropTypes
DashboardJoinListPresentation.propTypes = {
  joinRequestsInfiniteQueryResponse: object,
}

export default DashboardJoinListPresentation
