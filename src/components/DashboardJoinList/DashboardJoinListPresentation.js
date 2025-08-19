import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// FPCC
import DashboardJoinCard from 'components/DashboardJoinCard'
import InfiniteLoadBtn from 'components/InfiniteLoadBtn'

function DashboardJoinListPresentation({ joinRequestsInfiniteQueryResponse }) {
  return (
    <div data-testid="DashboardJoinListPresentation">
      <div className="min-h-220 col-span-12">
        {joinRequestsInfiniteQueryResponse?.data?.pages?.[0]?.count > 0 ? (
          <div className="flex flex-col w-full bg-white rounded-lg">
            <ul className="divide-y divide-charcoal-100 list-none">
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
              <div className="w-full h-14" />
            </ul>
            <InfiniteLoadBtn
              infiniteQueryResponse={joinRequestsInfiniteQueryResponse}
            />
          </div>
        ) : (
          <div className="w-full flex">
            <div className="mx-6 mt-4 text-center md:mx-auto md:mt-20">
              There are currently no pending join requests for your site.
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
// PROPTYPES
const { object } = PropTypes
DashboardJoinListPresentation.propTypes = {
  joinRequestsInfiniteQueryResponse: object,
}

export default DashboardJoinListPresentation
