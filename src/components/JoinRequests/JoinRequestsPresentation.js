import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// FPCC
import JoinRequestCard from 'components/JoinRequestCard'
import InfiniteLoadBtn from 'components/InfiniteLoadBtn'

function JoinRequestsPresentation({ joinRequestsInfiniteQueryResponse }) {
  return (
    <div data-testid="JoinRequestsPresentation">
      <div className="min-h-220 col-span-12">
        {joinRequestsInfiniteQueryResponse?.data?.pages?.[0]?.count > 0 ? (
          <div className="flex flex-col w-full bg-white rounded-lg">
            <ul className="divide-y divide-charcoal-100 list-none">
              {joinRequestsInfiniteQueryResponse?.data?.pages.map((page) => (
                <Fragment key={page?.pageNumber}>
                  {page.results.map((request) => (
                    <JoinRequestCard.Container
                      key={request?.id}
                      joinRequest={request}
                    />
                  ))}
                </Fragment>
              ))}
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
JoinRequestsPresentation.propTypes = {
  joinRequestsInfiniteQueryResponse: object,
}

export default JoinRequestsPresentation
