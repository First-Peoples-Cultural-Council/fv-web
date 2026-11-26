import React from 'react'
import PropTypes from 'prop-types'

// FPCC
import JoinRequestCard from 'components/JoinRequestCard'
import PaginationControls from 'components/PaginationControls'

function JoinRequestsPresentation({ queryResponse, page, setPage }) {
  return (
    <div data-testid="JoinRequestsPresentation">
      <div className="shadow rounded-lg bg-white p-4">
        {queryResponse?.data?.results?.length > 0 ? (
          <div className="flex flex-col w-full bg-white rounded-lg">
            <ul className="divide-y divide-charcoal-100 list-none">
              {queryResponse?.data?.results.map((request) => (
                <JoinRequestCard.Container
                  key={request?.id}
                  joinRequest={request}
                />
              ))}
            </ul>
            <PaginationControls
              hasNextPage={queryResponse?.data?.next ? true : false}
              isPlaceholderData={queryResponse?.isPlaceholderData}
              numberOfPages={queryResponse?.data?.pages}
              page={page}
              setPage={setPage}
            />
          </div>
        ) : (
          <div className="text-center w-full my-16 text-lg text-charcoal-500">
            There are currently no pending join requests for your site.
          </div>
        )}
      </div>
    </div>
  )
}
// PROPTYPES
const { func, number, object } = PropTypes
JoinRequestsPresentation.propTypes = {
  queryResponse: object,
  page: number,
  setPage: func,
}

export default JoinRequestsPresentation
